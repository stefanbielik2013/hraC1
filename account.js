(() => {
  'use strict';

  const configKey = 'neon-drift-supabase-config';
  const syncUserKey = 'neon-drift-account-sync-user';
  const displayNameKey = 'neon-drift-player-name';
  let dataKeys = [];
  let client = null;
  let user = null;
  let mount = null;
  let config = null;
  let subscription = null;
  let syncReady = false;
  let saving = false;
  let syncTimer = 0;
  let status = 'Vytvor Supabase projekt a zadaj jeho Project URL a verejný anon key.';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }
  function setStatus(message) {
    status = message;
    renderCurrent();
  }
  function renderCurrent() {
    if (mount?.isConnected) renderMount();
  }
  function collectSave() {
    const save = {};
    let size = 0;
    for (const key of dataKeys) {
      const value = localStorage.getItem(key);
      if (value === null) continue;
      size += key.length + value.length;
      if (value.length > 200000 || size > 500000) throw new Error('Lokálne uloženie je príliš veľké na synchronizáciu.');
      save[key] = value;
    }
    return save;
  }
  function scheduleSync() {
    if (!syncReady || !user || !client || saving) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      saveToCloud().catch(error => {
        console.error('Online konto: automatická synchronizácia zlyhala.', error);
        setStatus(`Automatické uloženie zlyhalo: ${error.message || 'skontroluj pripojenie a nastavenie Supabase.'}`);
      });
    }, 1200);
  }
  async function saveToCloud() {
    if (!client || !user) throw new Error('Najprv sa prihlás do konta.');
    const saveData = collectSave();
    const displayName = (localStorage.getItem(displayNameKey) || 'TY').trim().slice(0, 12) || 'TY';
    const { error } = await client.from('game_profiles').upsert({
      id: user.id,
      display_name: displayName,
      save_data: saveData
    }, { onConflict: 'id' });
    if (error) throw error;
    localStorage.setItem(syncUserKey, user.id);
    syncReady = true;
    setStatus(`Uložené do konta ${user.email}. Zmeny sa ukladajú automaticky.`);
  }
  function handleSession(event, session) {
    user = session?.user || null;
    clearTimeout(syncTimer);
    if (!user) {
      syncReady = false;
      if (event === 'SIGNED_OUT') status = 'Odhlásený. Uloženie v tomto prehliadači zostalo zachované.';
    } else if (event === 'INITIAL_SESSION' && localStorage.getItem(syncUserKey) === user.id) {
      syncReady = true;
      status = `Prihlásený ako ${user.email}. Zmeny sa ukladajú automaticky.`;
    } else {
      syncReady = false;
      status = `Prihlásený ako ${user.email}. Vyber, či chceš uložiť tento prehliadač alebo načítať postup z konta.`;
    }
    renderCurrent();
  }
  async function connect(nextConfig) {
    if (!window.supabase?.createClient) throw new Error('Knižnica Supabase sa nenačítala. Obnov stránku a skontroluj internet.');
    let projectUrl;
    try { projectUrl = new URL(nextConfig.url); }
    catch { throw new Error('Project URL nie je platná.'); }
    if (projectUrl.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(projectUrl.hostname)) {
      throw new Error('Supabase Project URL musí používať HTTPS.');
    }
    const anonKey = String(nextConfig.anonKey || '').trim();
    if (anonKey.length < 20) throw new Error('Zadaj platný verejný anon/publishable key.');
    if (subscription) subscription.unsubscribe();
    config = { url: projectUrl.toString().replace(/\/$/, ''), anonKey };
    client = window.supabase.createClient(config.url, anonKey, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
    });
    const { data } = client.auth.onAuthStateChange((event, session) => {
      queueMicrotask(() => handleSession(event, session));
    });
    subscription = data.subscription;
    const { data: sessionData, error } = await client.auth.getSession();
    if (error) throw error;
    handleSession('INITIAL_SESSION', sessionData.session);
    if (!user) status = 'Supabase je pripojený. Vytvor si účet alebo sa prihlás.';
  }
  async function authenticate(action, email, password) {
    if (!client) throw new Error('Najprv ulož a pripoj nastavenie Supabase.');
    if (!email || !email.includes('@')) throw new Error('Zadaj platnú e-mailovú adresu.');
    if (password.length < 10) throw new Error('Použi heslo s aspoň 10 znakmi; krátke číselné heslo nie je bezpečné.');
    const result = action === 'signup'
      ? await client.auth.signUp({
        email,
        password,
        options: { data: { display_name: (localStorage.getItem(displayNameKey) || 'TY').slice(0, 12) } }
      })
      : await client.auth.signInWithPassword({ email, password });
    if (result.error) throw result.error;
    status = action === 'signup' && !result.data.session
      ? 'Účet je vytvorený. Potvrď e-mail cez odkaz od Supabase a potom sa prihlás.'
      : 'Prihlásenie úspešné. Teraz vyber, ktoré uloženie chceš použiť.';
    renderCurrent();
  }
  async function loadFromCloud() {
    if (!client || !user) throw new Error('Najprv sa prihlás do konta.');
    const { data, error } = await client.from('game_profiles')
      .select('save_data').eq('id', user.id).maybeSingle();
    if (error) throw error;
    if (!data) throw new Error('V online konte ešte nie je uložený postup. Najprv odošli uloženie z tohto prehliadača.');
    if (!data.save_data || typeof data.save_data !== 'object' || Array.isArray(data.save_data)) {
      throw new Error('Uloženie v konte má neplatný formát.');
    }
    const save = {};
    let size = 0;
    for (const key of dataKeys) {
      const value = data.save_data[key];
      if (typeof value !== 'string') continue;
      size += key.length + value.length;
      if (value.length > 200000 || size > 500000) throw new Error('Uloženie v konte je príliš veľké.');
      save[key] = value;
    }
    if (!window.confirm('Načítať uloženie z online konta? Tým prepíšeš postup v tomto prehliadači.')) return;
    const previous = {};
    dataKeys.forEach(key => { previous[key] = localStorage.getItem(key); });
    saving = true;
    try {
      dataKeys.forEach(key => localStorage.removeItem(key));
      Object.entries(save).forEach(([key, value]) => localStorage.setItem(key, value));
      localStorage.setItem(syncUserKey, user.id);
    } catch (error) {
      try {
        dataKeys.forEach(key => {
          if (previous[key] === null) localStorage.removeItem(key);
          else localStorage.setItem(key, previous[key]);
        });
      } catch (restoreError) {
        console.error('Online konto: nepodarilo sa obnoviť pôvodné lokálne uloženie.', restoreError);
      }
      throw new Error(`Načítanie zlyhalo: ${error.message || 'prehliadač nedovolil uložiť údaje.'}`);
    } finally { saving = false; }
    location.reload();
  }
  function render(container) {
    if (!container) return;
    let target = container.querySelector('[data-account-mount]');
    if (!target) {
      target = document.createElement('div');
      target.dataset.accountMount = '';
      container.append(target);
    }
    mount = target;
    renderMount();
  }
  function renderMount() {
    if (!mount) return;
    const savedUrl = escapeHtml(config?.url || '');
    const savedKey = escapeHtml(config?.anonKey || '');
    const sessionPanel = user
      ? `<div class="account-session"><strong>PRIHLÁSENÝ</strong><span>${escapeHtml(user.email || '')}</span><button class="hub-action" data-account-signout type="button">ODHLÁSIŤ</button></div><p class="account-sync-ready">${syncReady ? 'AUTOMATICKÉ UKLADANIE JE ZAPNUTÉ' : 'VYBER, KTORÉ ULOŽENIE CHCEŠ POUŽIŤ'}</p><div class="account-sync-actions"><button class="hub-action" data-account-upload type="button">ULOŽIŤ TENTO PREHLIADAČ DO KONTA</button><button class="hub-action" data-account-download type="button">NAČÍTAŤ ULOŽENIE Z KONTA</button></div>`
      : client ? `<form class="account-auth-form" data-account-auth><label>E-MAIL<input name="email" type="email" required maxlength="254" autocomplete="email" placeholder="tvoj@email.sk"></label><label>HESLO<input name="password" type="password" required minlength="10" autocomplete="current-password" placeholder="aspoň 10 znakov"></label><div class="account-auth-actions"><button class="hub-action" type="submit" data-auth-action="signin">PRIHLÁSIŤ</button><button class="hub-action" type="submit" data-auth-action="signup">VYTVORIŤ KONTO</button></div><button class="account-reset" type="button" data-account-reset>POSLAŤ ODKAZ NA ZMENU HESLA</button></form>`
        : '<p class="account-unconfigured">Najprv pripoj svoj Supabase projekt v nastavení nižšie.</p>';
    mount.innerHTML = `<section class="account-panel"><header class="account-heading"><span class="eyebrow">MOJE KONTO / ONLINE</span><strong>${user ? '🌐' : '◇'}</strong></header><p class="account-status" role="status" aria-live="polite">${escapeHtml(status)}</p>${sessionPanel}<details class="account-config" ${client ? '' : 'open'}><summary>NASTAVENIE ONLINE KONTA</summary><p>Vytvor bezplatný Supabase projekt, spusti jeho SQL tabuľku a vlož Project URL a verejný anon key. Heslo spravuje Supabase a neukladá sa v hre.</p><ol><li>V Supabase vytvor projekt a v SQL Editor spusti priložený súbor.</li><li>V Authentication → URL Configuration pridaj adresu tejto hry: <code>https://stefanbielik2013.github.io/hraC1/</code>.</li><li>V Project Settings → API skopíruj Project URL a verejný anon/publishable key.</li></ol><a href="supabase/schema.sql" target="_blank" rel="noopener">OTVORIŤ SQL NASTAVENIE</a><form data-account-config><label>SUPABASE PROJECT URL<input name="url" type="url" required autocomplete="url" placeholder="https://xxxx.supabase.co" value="${savedUrl}"></label><label>VEREJNÝ ANON / PUBLISHABLE KEY<input name="anonKey" type="text" required autocomplete="off" spellcheck="false" placeholder="eyJ..." value="${savedKey}"></label><button class="hub-action" type="submit">ULOŽIŤ A PRIPOJIŤ</button></form></details><p class="account-privacy">Heslo overuje Supabase. Verejný kľúč nie je heslo; uloženie chráni databázové RLS. Nikdy sem nevkladaj service-role key.</p></section>`;
    mount.querySelector('[data-account-config]').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const nextConfig = { url: String(formData.get('url') || '').trim(), anonKey: String(formData.get('anonKey') || '').trim() };
      try { localStorage.setItem(configKey, JSON.stringify(nextConfig)); }
      catch (error) {
        console.error('Online konto: nastavenia sa nepodarilo uložiť.', error);
        setStatus(`Nastavenia sa nepodarilo uložiť: ${error.message || 'prehliadač zablokoval úložisko.'}`);
        return;
      }
      setStatus('Pripájam Supabase…');
      connect(nextConfig).then(() => renderCurrent()).catch(error => {
        console.error('Online konto: pripojenie zlyhalo.', error);
        setStatus(`Pripojenie zlyhalo: ${error.message || 'skontroluj nastavenie projektu.'}`);
      });
    });
    mount.querySelector('[data-account-auth]')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const action = event.submitter?.dataset.authAction;
      setStatus('Pracujem s kontom…');
      authenticate(action, String(formData.get('email') || '').trim(), String(formData.get('password') || ''))
        .catch(error => {
          console.error('Online konto: registrácia alebo prihlásenie zlyhalo.', error);
          setStatus(error.message || 'Prihlásenie zlyhalo. Skontroluj údaje a Supabase.');
        });
    });
    mount.querySelector('[data-account-signout]')?.addEventListener('click', () => {
      client.auth.signOut().then(({ error }) => {
        if (error) throw error;
      }).catch(error => {
        console.error('Online konto: odhlásenie zlyhalo.', error);
        setStatus(`Odhlásenie zlyhalo: ${error.message || 'skús to znova.'}`);
      });
    });
    mount.querySelector('[data-account-upload]')?.addEventListener('click', () => {
      if (!window.confirm('Odoslať postup z tohto prehliadača do online konta? Existujúce online uloženie sa prepíše.')) return;
      setStatus('Ukladám postup do online konta…');
      saveToCloud().catch(error => {
        console.error('Online konto: uloženie zlyhalo.', error);
        setStatus(`Uloženie zlyhalo: ${error.message || 'skontroluj pripojenie a nastavenie Supabase.'}`);
      });
    });
    mount.querySelector('[data-account-download]')?.addEventListener('click', () => {
      setStatus('Načítavam uloženie z online konta…');
      loadFromCloud().catch(error => {
        console.error('Online konto: načítanie zlyhalo.', error);
        setStatus(error.message || 'Načítanie zlyhalo. Skontroluj pripojenie a nastavenie Supabase.');
      });
    });
    mount.querySelector('[data-account-reset]')?.addEventListener('click', async () => {
      const email = mount.querySelector('[name="email"]').value.trim();
      if (!email || !email.includes('@')) {
        setStatus('Najprv zadaj e-mail, na ktorý máme poslať odkaz.');
        return;
      }
      try {
        const { error } = await client.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setStatus('Ak účet s týmto e-mailom existuje, poslali sme odkaz na zmenu hesla.');
      } catch (error) {
        console.error('Online konto: odkaz na zmenu hesla sa nepodarilo odoslať.', error);
        setStatus(`Odoslanie odkazu zlyhalo: ${error.message || 'skús to znova.'}`);
      }
    });
  }
  async function initialize(keys) {
    dataKeys = keys.slice();
    if (!window.supabase?.createClient) {
      status = 'Knižnica online konta sa nenačítala. Skontroluj internet a obnov stránku.';
      return;
    }
    const savedConfig = localStorage.getItem(configKey);
    if (!savedConfig) return;
    try {
      config = JSON.parse(savedConfig);
      await connect(config);
    } catch (error) {
      console.error('Online konto: uložené nastavenie sa nepodarilo pripojiť.', error);
      status = `Pripojenie zlyhalo: ${error.message || 'skontroluj nastavenie projektu.'}`;
    }
  }
  window.NeonDriftAccount = { initialize, render, scheduleSync };
})();
