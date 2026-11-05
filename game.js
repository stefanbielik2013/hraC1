(() => {
  'use strict';

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const arena = canvas.parentElement;
  const scoreEl = document.getElementById('score');
  const comboEl = document.getElementById('combo');
  const bestEl = document.getElementById('best');
  const energyFill = document.getElementById('energyFill');
  const energyValue = document.getElementById('energyValue');
  const waveLabel = document.getElementById('waveLabel');
  const timeLabel = document.getElementById('timeLabel');
  const startScreen = document.getElementById('screenMessage');
  const gameOverScreen = document.getElementById('gameOver');
  const finalStats = document.getElementById('finalStats');
  const startButton = document.getElementById('startButton');
  const restartButton = document.getElementById('restartButton');
  const chooseGameButton = document.getElementById('chooseGameButton');
  const gemsEl = document.getElementById('gems');
  const coinsEl = document.getElementById('coins');
  const resultKicker = document.getElementById('resultKicker');
  const resultTitle = document.getElementById('resultTitle');
  const stardrop = document.getElementById('stardrop');
  const stardropRarity = document.getElementById('stardropRarity');
  const stardropReward = document.getElementById('stardropReward');
  const shopGemsEl = document.getElementById('shopGems');
  const characterPreview = document.getElementById('characterPreview');
  const rewardCode = document.getElementById('rewardCode');
  const redeemCodeButton = document.getElementById('redeemCode');
  const codeMessage = document.getElementById('codeMessage');
  const characterShop = document.getElementById('characterShop');
  const shopMessage = document.getElementById('shopMessage');
  const shopToggle = document.getElementById('shopToggle');
  const shopPanel = document.getElementById('shopPanel');
  const modePicker = document.getElementById('modePicker');
  const duelPicker = document.getElementById('duelPicker');
  const duelSlots = [document.getElementById('duelSlot1'), document.getElementById('duelSlot2'), document.getElementById('duelSlot3')];
  const mapPicker = document.getElementById('mapPicker');
  const matchHint = document.getElementById('matchHint');
  const matchStatus = document.getElementById('matchStatus');
  const footballHint = document.getElementById('footballHint');
  const playerNameInput = document.getElementById('playerNameInput');
  const settingsToggle = document.getElementById('settingsToggle');
  const settingsPanel = document.getElementById('settingsPanel');
  const qualitySetting = document.getElementById('qualitySetting');
  const resolutionSetting = document.getElementById('resolutionSetting');
  const uiScaleSetting = document.getElementById('uiScaleSetting');
  const mouseSetting = document.getElementById('mouseSetting');
  const volumeSetting = document.getElementById('volumeSetting');
  const settingsMessage = document.getElementById('settingsMessage');
  const achievementList = document.getElementById('achievementList');
  const sidePanel = document.getElementById('sidePanel');
  const panelToggle = document.getElementById('panelToggle');
  const ammoValue = document.getElementById('ammoValue');
  const ammoFill = document.getElementById('ammoFill');
  const superValue = document.getElementById('superValue');
  const superFill = document.getElementById('superFill');
  const gadgetButton = document.getElementById('gadgetButton');
  const hyperButton = document.getElementById('hyperButton');
  const mobileJoystick = document.getElementById('mobileJoystick');
  const joystickKnob = mobileJoystick.querySelector('span');
  const brawlerProfile = document.getElementById('brawlerProfile');
  const hubContent = document.getElementById('hubContent');
  const totalTrophiesEl = document.getElementById('totalTrophies');
  const hudTrophiesEl = document.getElementById('hudTrophies');
  const systemContent = document.getElementById('systemContent');
  const bestKey = 'neon-drift-best';
  const gemsKey = 'neon-drift-gems';
  const coinsKey = 'neon-drift-coins';
  const selectedCharacterKey = 'neon-drift-character';
  const ownedCharactersKey = 'neon-drift-owned-characters';
  const characterUpgradesKey = 'neon-drift-character-upgrades';
  const equippedSkinsKey = 'neon-drift-equipped-skins';
  const redeemedCodesKey = 'neon-drift-redeemed-codes';
  const selectedModeKey = 'neon-drift-mode';
  const selectedMapKey = 'neon-drift-map';
  const customMapDataKey = 'neon-drift-custom-map';
  const customMapLibraryKey = 'neon-drift-custom-maps';
  const activeCustomMapKey = 'neon-drift-active-custom-map';
  const mapCellTypes = ['wall', 'indestructible', 'bush', 'water', 'fence', 'crate', 'spikes', 'jump', 'teleport', 'speed', 'slow', 'spawn_blue', 'spawn_red', 'box', 'gem_mine', 'goal_blue', 'goal_red', 'ball', 'safe'];
  const mapEditorColumns = 20;
  const mapEditorRows = 16;
  const playerNameKey = 'neon-drift-player-name';
  const settingsKey = 'neon-drift-settings';
  const achievementsKey = 'neon-drift-achievements';
  const trophiesKey = 'neon-drift-trophies';
  const masteryKey = 'neon-drift-mastery';
  const claimedQuestsKey = 'neon-drift-quests';
  const rankedKey = 'neon-drift-ranked';
  const friendsKey = 'neon-drift-friends';
  const clubsKey = 'neon-drift-clubs';
  const joinedClubKey = 'neon-drift-joined-club';

  let width = 0, height = 0, worldWidth = 0, worldHeight = 0, dpr = 1, animationId = 0, lastTime = 0, viewRotation = 0;
  let state = 'ready', score = 0, energy = 100, combo = 1, comboTimer = 0, elapsed = 0, spawnTimer = 0, shardTimer = 0;
  let ammo = 3, reloadTimer = 0, superCharge = 0, gadgetCooldown = 0, hyperActive = 0;
  let joystick = { x: 0, y: 0, active: false };
  let gems = 0, coins = 0, selectedCharacterId = 'rookie';
  let selectedMode = 'duo', selectedMap = 'neon';
  let showdownActive = false, showdownRadius = 0, powerCubes = [];
  let playerName = 'TY';
  let settings = { quality: 'auto', resolution: 'auto', uiScale: 1, mouseSensitivity: 1, volume: .45, bindings: { up: 'w', down: 's', left: 'a', right: 'd', fire: ' ' } };
  let achievements = {};
  let audioContext = null;
  let duelRoster = ['rookie', 'runner', 'guardian'], duelIndex = 0;
  let footballBall = null;
  let footballScore = { blue: 0, red: 0 }, footballTime = 60, footballOvertime = false;
  let knockoutActive = false, knockoutWins = { blue: 0, red: 0 };
  let screenFlash = 0, goalPulse = 0, damageFlash = 0;
  let ownedCharacters = ['rookie'];
  let characterUpgrades = {};
  let equippedSkins = {};
  let redeemedCodes = [];
  let brawlerTrophies = {};
  let brawlerMastery = {};
  let claimedQuests = [];
  let friends = [];
  let clubs = [];
  let joinedClubId = '';
  let currentHubTab = 'brawlers';
  let currentSystemTab = 'modes';
  let mapMakerTool = 'wall';
  let mapMakerMode = 'gem';
  let mapMakerName = 'Moja mapa';
  let customMapName = 'Moja mapa';
  let customMapMode = 'gem';
  let customMaps = [];
  let activeCustomMapId = '';
  let mapMakerDirty = false;
  let mapMakerCells = [];
  let mapMakerUndo = [];
  let mapMakerRedo = [];
  let mapMakerPainting = false;
  let mapMakerStrokeRecorded = false;
  let customMapCells = [];
  let hasCustomMap = false;
  let rankedState = { points: 0, mmr: 1000, banned: [], pick: 'rookie' };
  let rankedActive = false;
  let rankedOpponentMmr = 1000;
  let player, allies = [], enemies = [], bullets = [], shards = [], particles = [], coverBlocks = [], keys = new Set(), pointer = null, firing = false;
  let rebinding = null;
  const storage = { get(key, fallback = 0) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* Hra funguje aj bez trvalého uloženia. */ } }, remove(key) { try { localStorage.removeItem(key); } catch { /* Hra funguje aj bez trvalého uloženia. */ } } };
  const formatScore = value => Math.floor(value).toString().padStart(6, '0');
  let best = Number(storage.get(bestKey));
  gems = Number(storage.get(gemsKey));
  coins = Number(storage.get(coinsKey));
  selectedCharacterId = storage.get(selectedCharacterKey, 'rookie');
  selectedMode = storage.get(selectedModeKey, 'duo');
  selectedMap = storage.get(selectedMapKey, 'neon');
  function normalizeCustomMap(record, fallbackId = '') {
    if (!record || !Array.isArray(record.cells) || record.cells.length > mapEditorColumns * mapEditorRows) return null;
    const cells = new Map();
    for (const cell of record.cells) {
      if (!cell || !Number.isInteger(cell.x) || !Number.isInteger(cell.y) || cell.x < 0 || cell.x >= mapEditorColumns || cell.y < 0 || cell.y >= mapEditorRows || !mapCellTypes.includes(cell.type)) continue;
      cells.set(`${cell.x},${cell.y}`, { x: cell.x, y: cell.y, type: cell.type });
    }
    return {
      id: typeof record.id === 'string' && record.id ? record.id.slice(0, 80) : fallbackId,
      name: typeof record.name === 'string' && record.name.trim() ? record.name.trim().slice(0, 28) : 'Moja mapa',
      mode: ['gem', 'football', 'showdown'].includes(record.mode) ? record.mode : 'gem',
      cells: [...cells.values()]
    };
  }
  try {
    const savedMaps = JSON.parse(storage.get(customMapLibraryKey, '[]'));
    if (Array.isArray(savedMaps)) {
      const usedIds = new Set();
      customMaps = savedMaps.map((map, index) => {
        const normalized = normalizeCustomMap(map, `map_${index + 1}`);
        if (!normalized) return null;
        if (usedIds.has(normalized.id)) {
          const baseId = normalized.id.slice(0, 70);
          let suffix = 1;
          while (usedIds.has(`${baseId}_${suffix}`)) suffix++;
          normalized.id = `${baseId}_${suffix}`;
        }
        usedIds.add(normalized.id);
        return normalized;
      }).filter(Boolean);
    }
  } catch { customMaps = []; }
  try {
    const savedMap = JSON.parse(storage.get(customMapDataKey, '{}'));
    if (savedMap && Array.isArray(savedMap.cells)) {
      const legacyMap = normalizeCustomMap(savedMap, 'legacy');
      if (!customMaps.length && legacyMap) customMaps = [legacyMap];
    }
  } catch { /* Použije sa prázdna mapa. */ }
  activeCustomMapId = storage.get(activeCustomMapKey, customMaps[customMaps.length - 1]?.id || '');
  if (!customMaps.some(map => map.id === activeCustomMapId)) activeCustomMapId = customMaps[customMaps.length - 1]?.id || '';
  const activeCustomMap = customMaps.find(map => map.id === activeCustomMapId);
  if (activeCustomMap) {
    hasCustomMap = true;
    customMapMode = activeCustomMap.mode;
    mapMakerMode = customMapMode;
    customMapName = activeCustomMap.name;
    mapMakerName = customMapName;
    customMapCells = activeCustomMap.cells.map(cell => ({ ...cell }));
    mapMakerCells = customMapCells.map(cell => ({ ...cell }));
    showdownActive = customMapMode === 'showdown' && selectedMap === 'custom';
  }
  playerName = storage.get(playerNameKey, 'TY').toString().trim().slice(0, 12) || 'TY';
  playerNameInput.value = playerName;
  try { settings = { ...settings, ...JSON.parse(storage.get(settingsKey, '{}')), bindings: { ...settings.bindings, ...(JSON.parse(storage.get(settingsKey, '{}')).bindings || {}) } }; } catch { /* Použijú sa predvolené nastavenia. */ }
  try { ownedCharacters = JSON.parse(storage.get(ownedCharactersKey, '["rookie"]')); } catch { ownedCharacters = ['rookie']; }
  try { characterUpgrades = JSON.parse(storage.get(characterUpgradesKey, '{}')); } catch { characterUpgrades = {}; }
  try { equippedSkins = JSON.parse(storage.get(equippedSkinsKey, '{}')); } catch { equippedSkins = {}; }
  try { redeemedCodes = JSON.parse(storage.get(redeemedCodesKey, '[]')); } catch { redeemedCodes = []; }
  try { achievements = JSON.parse(storage.get(achievementsKey, '{}')); } catch { achievements = {}; }
  try { brawlerTrophies = JSON.parse(storage.get(trophiesKey, '{}')); } catch { brawlerTrophies = {}; }
  try { brawlerMastery = JSON.parse(storage.get(masteryKey, '{}')); } catch { brawlerMastery = {}; }
  try { claimedQuests = JSON.parse(storage.get(claimedQuestsKey, '[]')); } catch { claimedQuests = []; }
  try { rankedState = { ...rankedState, ...JSON.parse(storage.get(rankedKey, '{}')) }; } catch { rankedState = { points: 0, mmr: 1000, banned: [], pick: 'rookie' }; }
  if (!ownedCharacters.includes('rookie')) ownedCharacters.unshift('rookie');
  bestEl.textContent = formatScore(best);
  gemsEl.textContent = gems;
  coinsEl.textContent = coins;
  qualitySetting.value = settings.quality; resolutionSetting.value = settings.resolution; uiScaleSetting.value = settings.uiScale; mouseSetting.value = settings.mouseSensitivity; volumeSetting.value = settings.volume;

  function saveSettings() { storage.set(settingsKey, JSON.stringify(settings)); }
  function applySettings() { document.documentElement.style.setProperty('--ui-scale', settings.uiScale); resize(); }
  function updateSetting(name, value) { settings[name] = value; saveSettings(); applySettings(); }
  function currentSave() { return { gems, coins, best, selectedCharacterId, ownedCharacters, characterUpgrades, equippedSkins, selectedMode, selectedMap, playerName, duelRoster }; }
  function saveSlot(slot) { storage.set(`neon-drift-save-${slot}`, JSON.stringify(currentSave())); settingsMessage.textContent = `ULOŽENÉ DO SLOTU ${slot}.`; }
  function loadSlot(slot) { try { const save = JSON.parse(storage.get(`neon-drift-save-${slot}`, '')); if (!save) throw new Error(); gems = save.gems; coins = save.coins; best = save.best; selectedCharacterId = save.selectedCharacterId; ownedCharacters = save.ownedCharacters; characterUpgrades = save.characterUpgrades; equippedSkins = save.equippedSkins || {}; selectedMode = save.selectedMode; selectedMap = save.selectedMap; playerName = save.playerName; duelRoster = save.duelRoster; gemsEl.textContent = gems; coinsEl.textContent = coins; bestEl.textContent = formatScore(best); playerNameInput.value = playerName; renderShop(); renderMatchOptions(); resize(); settingsMessage.textContent = `NAČÍTANÉ ZO SLOTU ${slot}.`; } catch { settingsMessage.textContent = `SLOT ${slot} JE PRÁZDNY.`; } }

  const colors = { cyan: '#6fffe9', orange: '#ff8552', yellow: '#f9d76e', pink: '#ff6eaa', white: '#eef2e8' };
  const achievementDefinitions = [{ id: 'first_blood', name: 'PRVÝ ZÁSAH', detail: 'Vyrad prvého súpera.' }, { id: 'collector', name: 'ZBERATEĽ', detail: 'Zober odmenu z mapy.' }, { id: 'combo', name: 'COMBO MASTER', detail: 'Dosiahni combo x3.' }, { id: 'champion', name: 'ŠAMPIÓN', detail: 'Vyhraj zápas.' }];
  function renderAchievements() { achievementList.innerHTML = achievementDefinitions.map(item => `<div class="achievement-item ${achievements[item.id] ? 'unlocked' : ''}"><b>${achievements[item.id] ? '✓' : '○'}</b><span><strong>${item.name}</strong><small>${item.detail}</small></span></div>`).join(''); }
  function unlockAchievement(id) { if (achievements[id]) return; achievements[id] = true; storage.set(achievementsKey, JSON.stringify(achievements)); renderAchievements(); }
  const describedBrawlerRarities = { shelly: 'STARTER', colt: 'RARE', el_primo: 'RARE', rico: 'SUPER RARE', barley: 'SUPER RARE', tick: 'SUPER RARE', leon: 'LEGENDÁRNY', spike: 'LEGENDÁRNY', crow: 'LEGENDÁRNY', mortis: 'MÝTICKÝ', tara: 'MÝTICKÝ', piper: 'EPICKÝ', brock: 'EPICKÝ', edgar: 'EPICKÝ', fang: 'MÝTICKÝ', dynamike: 'SUPER RARE', emz: 'EPICKÝ', sandy: 'LEGENDÁRNY', moe: 'MÝTICKÝ', clancy: 'MÝTICKÝ', buzz: 'MÝTICKÝ', kit: 'LEGENDÁRNY', sprout: 'MÝTICKÝ', amber: 'LEGENDÁRNY', kenji: 'LEGENDÁRNY', melodie: 'LEGENDÁRNY', stu: 'EPICKÝ', bibi: 'EPICKÝ', chester: 'LEGENDÁRNY', grom: 'EPICKÝ' };
  const rarityFor = character => describedBrawlerRarities[character.id] || (character.gemCost >= 30 ? 'LEGENDÁRNY' : character.gemCost >= 24 ? 'MÝTICKÝ' : character.gemCost >= 18 ? 'EPICKÝ' : character.gemCost >= 9 ? 'SUPER RARE' : character.gemCost >= 4 ? 'RARE' : 'ŠTARTER');
  const classFor = character => character.maxEnergy >= 140 ? 'TANK' : character.damage >= 55 ? 'DAMAGE DEALER' : character.maxEnergy <= 88 ? 'SNIPER' : character.speed >= 290 ? 'ASSASSIN' : character.id === 'medic' ? 'SUPPORT' : 'FIGHTER';
  const rangeFor = character => character.damage >= 55 || character.id === 'sniper' ? '430 px' : character.speed >= 290 ? '250 px' : character.maxEnergy >= 140 ? '190 px' : '320 px';
  const ammoFor = character => character.shots >= 3 ? 3 : character.shots === 2 ? 4 : 3;
  const reloadFor = character => `${Math.max(.25, character.fireRate * .8).toFixed(2)} s`;
  const abilityFor = (character, type) => { const index = Math.max(0, characters.indexOf(character)); const abilities = { super: ['Pulzná salva', 'Bleskový šprint', 'Titanický úder', 'Záchranný lúč', 'Plazmová pasca', 'Fázový skok', 'Kinetická stena', 'Voltový dážď'], gadget: ['Impulzný dash', 'Dvojitý únik', 'Štítový náraz', 'Liečivý signál', 'Zameriavací dron', 'Tieňový krok', 'Oprava panciera', 'Preťaženie zbrane'], star: ['Presný zásah', 'Rýchle nohy', 'Ťažké brnenie', 'Tímová obnova', 'Kritická vzdialenosť', 'Tichý lovec', 'Nezastaviteľný', 'Reťazový výboj'], gear: ['Rýchlosť', 'Nabíjanie', 'Odolnosť', 'Liečenie', 'Dohľad', 'Skrytie', 'Sila', 'Energia'] }; return abilities[type][index % abilities[type].length]; };
  const brawlerAbilityDetails = {
    rookie: { basic: 'Neónový impulz / presná strela', super: 'Pulzná salva / prerazí krytie', gadget1: 'Impulzný dash vpred', gadget2: 'Krátky energetický štít', star1: 'Presný zásah +15% damage', star2: 'Obnova po vyradení súpera', gear1: 'Rýchlejší pohyb', gear2: 'Silnejšie projektily', hypercharge: 'Tri pulzy namiesto jedného', trait: 'Vyvážený prieskumník' },
    runner: { basic: 'Dvojitý výboj / dve strely', super: 'Bleskový šprint cez nepriateľa', gadget1: 'Rýchly úskok do strany', gadget2: 'Nabitý ďalší výstrel', star1: 'Rýchlosť po zásahu', star2: 'Strely sa rozdelia', gear1: 'Rýchlosť', gear2: 'Nabíjanie', hypercharge: 'Šprint zanechá elektrickú stopu', trait: 'Najrýchlejší brawler' },
    guardian: { basic: 'Ťažký kanón / pomalá strela', super: 'Titanický úder a odhodenie', gadget1: 'Predný štít', gadget2: 'Náraz do zeme', star1: 'Viac HP pod paľbou', star2: 'Štít po použití Super', gear1: 'Odolnosť', gear2: 'Sila', hypercharge: 'Štít chráni celý tím', trait: 'Tank s vysokou výdržou' },
    medic: { basic: 'Liečivý lúč / podpora tímu', super: 'Záchranný signál obnoví spojencov', gadget1: 'Okamžité liečenie', gadget2: 'Liečivá zóna', star1: 'Lúč lieči viac', star2: 'Rýchlejšie nabíjanie Super', gear1: 'Liečenie', gear2: 'Nabíjanie', hypercharge: 'Liečenie zároveň poškodí súperov', trait: 'Podporný strelec' },
    sniper: { basic: 'Plazmový lúč / veľký dosah', super: 'Plazmová pasca na diaľku', gadget1: 'Zameriavací dron', gadget2: 'Únikový skok', star1: 'Kritická vzdialenosť', star2: 'Prvý zásah je silnejší', gear1: 'Dohľad', gear2: 'Sila', hypercharge: 'Super zasiahne druhý cieľ', trait: 'Bonus za dlhý dosah' },
    phantom: { basic: 'Dvojitý impulz / tichá salva', super: 'Fázový skok za cieľ', gadget1: 'Tieňový krok', gadget2: 'Krátke zneviditeľnenie', star1: 'Bonus zozadu', star2: 'Obnova po úniku', gear1: 'Skrytie', gear2: 'Rýchlosť', hypercharge: 'Po skoku vyšle druhú salvu', trait: 'Tichý útočník' },
    titan: { basic: 'Kinetické delo / masívny zásah', super: 'Kinetická stena', gadget1: 'Oprava panciera', gadget2: 'Ťažký krok', star1: 'Nezastaviteľný', star2: 'Znížené poškodenie', gear1: 'Odolnosť', gear2: 'Sila', hypercharge: 'Stena odrazí projektily', trait: 'Najväčší brawler' },
    volt: { basic: 'Trojitý výboj / reťazí ciele', super: 'Voltový dážď z neba', gadget1: 'Preťaženie zbrane', gadget2: 'Elektrický skok', star1: 'Reťazový výboj', star2: 'Viac zásahov dobíja Super', gear1: 'Energia', gear2: 'Nabíjanie', hypercharge: 'Blesky preskočia na štyri ciele', trait: 'Elektrické projektily' },
    wraith: { basic: 'Tieňová strela / vysoký damage', super: 'Tieňový výpad cez cieľ', gadget1: 'Dymová clona', gadget2: 'Krok do tieňa', star1: 'Bonus z úkrytu', star2: 'Obnova po vyradení', gear1: 'Skrytie', gear2: 'Sila', hypercharge: 'Super zanechá tieňového klona', trait: 'Lovec z úkrytu' },
    frost_ninja: { basic: 'Ľadové dvojstrely', super: 'Mrazivá pasca spomalí zónu', gadget1: 'Ľadový úskok', gadget2: 'Mrazivý plášť', star1: 'Spomalené strely', star2: 'Bonus proti zraneným', gear1: 'Rýchlosť', gear2: 'Odolnosť', hypercharge: 'Pasca zmrazí súperov', trait: 'Tichý bojovník' },
    ember: { basic: 'Horúca strela / výbuch', super: 'Výbušná iskra zapáli oblasť', gadget1: 'Zapaľovací náboj', gadget2: 'Únik v plameňoch', star1: 'Oheň trvá dlhšie', star2: 'Výbuch zasiahne za krytom', gear1: 'Sila', gear2: 'Energia', hypercharge: 'Super vytvorí tri výbuchy', trait: 'Výbušný útočník' },
    scout: { basic: 'Rýchle impulzy / krátky dosah', super: 'Prieskumný radar odhalí mapu', gadget1: 'Skenovací dron', gadget2: 'Rýchly útek', star1: 'Odhalené ciele dostanú viac damage', star2: 'Rýchlejší po zásahu', gear1: 'Dohľad', gear2: 'Rýchlosť', hypercharge: 'Radar označí všetkých súperov', trait: 'Najrýchlejší člen tímu' },
    engineer: { basic: 'Rozptylová salva', super: 'Opravárenská veža pre tím', gadget1: 'Mini veža', gadget2: 'Núdzová oprava', star1: 'Veža strieľa rýchlejšie', star2: 'Viac HP pre spojencov', gear1: 'Odolnosť', gear2: 'Nabíjanie', hypercharge: 'Veža sa pohybuje za tímom', trait: 'Stavia podporu' },
    shadow: { basic: 'Tieňový projektil / prieraz', super: 'Nočná búrka v širokej zóne', gadget1: 'Tieňový teleport', gadget2: 'Krátky plášť', star1: 'Prieraz cez viac cieľov', star2: 'Damage z diaľky', gear1: 'Skrytie', gear2: 'Sila', hypercharge: 'Búrka sa vráti druhýkrát', trait: 'Silný strelec z úkrytu' }
  };
  const detailsFor = character => brawlerAbilityDetails[character.id] || brawlerAbilityDetails.rookie;
  const trophyFor = character => Number(brawlerTrophies[character.id] || (character.id === selectedCharacterId ? 120 : 0));
  const totalTrophyCount = () => characters.reduce((sum, character) => sum + trophyFor(character), 0);
  const masteryFor = character => Number(brawlerMastery[character.id] || Math.floor(trophyFor(character) * .6));
  const rankedTier = points => points >= 900 ? 'MASTERS' : points >= 750 ? 'LEGENDARY' : points >= 600 ? 'MYTHIC' : points >= 450 ? 'DIAMOND' : points >= 300 ? 'GOLD' : points >= 150 ? 'SILVER' : 'BRONZE';
  const socialBots = [
    { id: 'bot-nova', name: 'Nova', trophies: 286 },
    { id: 'bot-vex', name: 'Vex', trophies: 514 },
    { id: 'bot-kira', name: 'Kira', trophies: 842 },
    { id: 'bot-echo', name: 'Echo', trophies: 173 },
    { id: 'bot-blitz', name: 'Blitz', trophies: 1090 },
    { id: 'bot-luna', name: 'Luna', trophies: 638 },
    { id: 'bot-fox', name: 'Fox', trophies: 392 },
    { id: 'bot-zen', name: 'Zen', trophies: 1256 },
    { id: 'bot-pixel', name: 'Pixel', trophies: 457 },
    { id: 'bot-storm', name: 'Storm', trophies: 721 }
  ];
  const clubNameParts = [['Neon', 'Cosmic', 'Shadow', 'Pixel', 'Storm', 'Crystal', 'Turbo', 'Lunar'], ['Wolves', 'Riders', 'Legends', 'Rockets', 'Rangers', 'Stars', 'Crew', 'Hunters']];
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }
  function persistSocial() {
    storage.set(friendsKey, JSON.stringify(friends));
    storage.set(clubsKey, JSON.stringify(clubs));
    storage.set(joinedClubKey, joinedClubId);
  }
  function createRandomClubs() {
    const shuffledBots = [...socialBots].sort(() => Math.random() - .5);
    return Array.from({ length: 5 }, (_, index) => {
      const name = `${clubNameParts[0][Math.floor(Math.random() * clubNameParts[0].length)]} ${clubNameParts[1][Math.floor(Math.random() * clubNameParts[1].length)]}`;
      const id = `club-${Date.now().toString(36)}-${index}-${Math.random().toString(36).slice(2, 6)}`;
      return { id, name, tag: `#${name.replace(/[^A-Z]/gi, '').toUpperCase().slice(0, 3)}${Math.floor(10 + Math.random() * 90)}`, trophies: 500 + Math.floor(Math.random() * 9500), memberIds: shuffledBots.slice(index, index + 3 + Math.floor(Math.random() * 3)).map(bot => bot.id) };
    });
  }
  function ensureSocialData() {
    try { friends = JSON.parse(storage.get(friendsKey, '[]')); } catch { friends = []; }
    try { clubs = JSON.parse(storage.get(clubsKey, '[]')); } catch { clubs = []; }
    joinedClubId = storage.get(joinedClubKey, '');
    friends = Array.isArray(friends) ? friends.filter(id => socialBots.some(bot => bot.id === id)) : [];
    clubs = Array.isArray(clubs) ? clubs.filter(club => club && typeof club.id === 'string' && typeof club.name === 'string' && Array.isArray(club.memberIds)) : [];
    if (!clubs.length) clubs = createRandomClubs();
    if (!clubs.some(club => club.id === joinedClubId)) joinedClubId = '';
    persistSocial();
  }
  function trophyRoadReward() {
    if (totalTrophyCount() < 130 || claimedQuests.includes('trophy-road-130')) return '';
    const rewardCharacter = characters.find(character => character.id !== 'rookie' && !ownedCharacters.includes(character.id));
    if (rewardCharacter) {
      ownedCharacters.push(rewardCharacter.id);
      claimedQuests.push('trophy-road-130');
      persistGarage();
      storage.set(claimedQuestsKey, JSON.stringify(claimedQuests));
      return `TROPHY ROAD: odomkol si postavu ${rewardCharacter.name} pri 130 trofejach!`;
    }
    coins += 100;
    claimedQuests.push('trophy-road-130');
    storage.set(coinsKey, coins);
    storage.set(claimedQuestsKey, JSON.stringify(claimedQuests));
    coinsEl.textContent = coins;
    return 'TROPHY ROAD: za 130 trofejí získavaš +100 coinov.';
  }
  function renderFriendsHub() {
    const availableBots = socialBots.filter(bot => !friends.includes(bot.id));
    systemContent.innerHTML = `<div class="profile-banner"><strong>PRIATELIA / BRAWL BOTI</strong><small>${friends.length} pridaných / boti sú pripravení na tím</small></div><div class="social-list">${friends.length ? friends.map(id => { const bot = socialBots.find(item => item.id === id); return `<div class="social-row"><span><strong>${bot.name}</strong><small>BOT / ${bot.trophies} trofejí / ONLINE</small></span><button class="hub-action" data-remove-friend="${bot.id}" type="button">ODSTRÁNIŤ</button></div>`; }).join('') : '<div class="system-card">Zatiaľ nemáš priateľov. Pridaj si niektorého z botov.</div>'}${availableBots.map(bot => `<div class="social-row"><span><strong>${bot.name}</strong><small>BOT / ${bot.trophies} trofejí / ONLINE</small></span><button class="hub-action" data-add-friend="${bot.id}" type="button">PRIDAŤ</button></div>`).join('')}</div>`;
    systemContent.querySelectorAll('[data-add-friend]').forEach(button => button.addEventListener('click', () => {
      if (!friends.includes(button.dataset.addFriend)) friends.push(button.dataset.addFriend);
      persistSocial();
      renderFriendsHub();
    }));
    systemContent.querySelectorAll('[data-remove-friend]').forEach(button => button.addEventListener('click', () => {
      friends = friends.filter(id => id !== button.dataset.removeFriend);
      persistSocial();
      renderFriendsHub();
    }));
  }
  function renderClubHub() {
    const joinedClub = clubs.find(club => club.id === joinedClubId);
    if (!joinedClub) {
      systemContent.innerHTML = `<div class="profile-banner"><strong>NÁJDI SI KLUB</strong><small>Náhodné kluby plné botov / vyber si svoj tím</small></div><button class="hub-action" data-refresh-clubs type="button">VYGENEROVAŤ NOVÉ KLUBY</button><div class="social-list">${clubs.map(club => `<div class="social-row"><span><strong>${club.name}</strong><small>${club.tag} / ${club.trophies} trofejí / ${club.memberIds.length} členov</small></span><button class="hub-action" data-join-club="${club.id}" type="button">PRIDAŤ SA</button></div>`).join('')}</div>`;
      systemContent.querySelector('[data-refresh-clubs]').addEventListener('click', () => {
        clubs = createRandomClubs();
        persistSocial();
        renderClubHub();
      });
      systemContent.querySelectorAll('[data-join-club]').forEach(button => button.addEventListener('click', () => {
        joinedClubId = button.dataset.joinClub;
        persistSocial();
        renderClubHub();
      }));
      return;
    }
    const memberIds = [...new Set(joinedClub.memberIds)].filter(id => socialBots.some(bot => bot.id === id));
    joinedClub.memberIds = memberIds;
    const memberRows = [`<div class="social-row"><span><strong>${escapeHtml(playerName)}</strong><small>TY / VEDÚCI KLUBU</small></span><b>★</b></div>`, ...memberIds.map(id => {
      const bot = socialBots.find(item => item.id === id);
      return `<div class="social-row"><span><strong>${bot.name}</strong><small>BOT / ${bot.trophies} trofejí / ONLINE</small></span><b>●</b></div>`;
    })].join('');
    systemContent.innerHTML = `<div class="profile-banner"><strong>${joinedClub.name}</strong><small>${joinedClub.tag} / ${joinedClub.trophies} KLUBOVÝCH TROFEJÍ / ${memberIds.length + 1} ČLENOV</small></div><div class="social-list">${memberRows}</div><div class="social-actions"><button class="hub-action" data-invite-friends type="button">POZVAŤ PRIATEĽOV</button><button class="hub-action" data-add-club-bots type="button">PRIDAŤ BOTOV</button><button class="hub-action" data-leave-club type="button">ODÍSŤ Z KLUBU</button></div>`;
    systemContent.querySelector('[data-invite-friends]').addEventListener('click', () => {
      joinedClub.memberIds = [...new Set([...joinedClub.memberIds, ...friends])].slice(0, 9);
      persistSocial();
      renderClubHub();
    });
    systemContent.querySelector('[data-add-club-bots]').addEventListener('click', () => {
      const currentMembers = new Set(joinedClub.memberIds);
      const newBots = socialBots.filter(bot => !currentMembers.has(bot.id)).sort(() => Math.random() - .5).slice(0, 3);
      joinedClub.memberIds = [...joinedClub.memberIds, ...newBots.map(bot => bot.id)].slice(0, 9);
      persistSocial();
      renderClubHub();
    });
    systemContent.querySelector('[data-leave-club]').addEventListener('click', () => {
      joinedClubId = '';
      persistSocial();
      renderClubHub();
    });
  }
  function renderRankedHub() {
    currentSystemTab = 'ranked';
    const tier = rankedTier(rankedState.points);
    systemContent.innerHTML = `<div class="profile-banner"><strong>RANKED / ${tier}</strong><small>SEZÓNA 01 / RANKED POINTS ${rankedState.points} / MMR ${rankedState.mmr}</small></div><div class="system-grid" style="margin-top:5px"><div class="system-card"><strong>MATCHMAKING</strong>Lokálny zápas proti AI; bez online servera.<br><b>ROVNOVÁHA TÍMOV: 3v3</b></div><div class="system-card"><strong>MAPA / MÓD</strong>PRESTRELKA / KNOCKOUT<br><b>3v3 / BEST OF 3</b></div></div><div class="ability-roster" style="margin-top:5px"><div class="ability-chip"><strong>BAN PHASE</strong>${characters.slice(0, 4).map(character => `<button class="hub-action ranked-ban ${rankedState.banned.includes(character.id) ? 'active' : ''}" data-ranked-ban="${character.id}" type="button">${character.name}</button>`).join(' ')}</div><div class="ability-chip"><strong>PICK PHASE</strong>${characters.filter(character => ownedCharacters.includes(character.id)).slice(0, 4).map(character => `<button class="hub-action ${rankedState.pick === character.id ? 'active' : ''}" data-ranked-pick="${character.id}" type="button">${character.name}</button>`).join(' ')}</div></div><button class="primary-button ranked-queue-button" data-ranked-action="queue" type="button">HĽADAŤ RANKED ZÁPAS</button><div class="system-list" style="margin-top:7px"><div class="system-card"><span><strong>MINIMUM HODNOTENIA</strong><small>Body za prehru neklesnú pod nulu.</small></span><b>0 RP</b></div><div class="system-card"><span><strong>ODMENA SEZÓNY</strong><small>${tier} / Ranked skin, coins, bling</small></span><b>${Math.floor(rankedState.points / 100)}/9</b></div><div class="system-card"><span><strong>LOKÁLNY POSTUP</strong><small>${playerName} / skóre ${rankedState.points} RP</small></span><b>AI</b></div></div>`;
    systemContent.querySelectorAll('[data-ranked-ban]').forEach(button => button.addEventListener('click', () => { const id = button.dataset.rankedBan; rankedState.banned = rankedState.banned.includes(id) ? rankedState.banned.filter(item => item !== id) : [...rankedState.banned, id]; storage.set(rankedKey, JSON.stringify(rankedState)); renderRankedHub(); }));
    systemContent.querySelectorAll('[data-ranked-pick]').forEach(button => button.addEventListener('click', () => { rankedState.pick = button.dataset.rankedPick; selectedCharacterId = rankedState.pick; persistGarage(); storage.set(rankedKey, JSON.stringify(rankedState)); renderRankedHub(); }));
    systemContent.querySelector('[data-ranked-action="queue"]').addEventListener('click', () => {
      if (rankedState.banned.includes(rankedState.pick)) { matchStatus.textContent = 'PICK JE ZAKÁZANÝ'; return; }
      rankedActive = true;
      rankedOpponentMmr = Math.max(100, rankedState.mmr + Math.round((Math.random() - .5) * 120));
      knockoutActive = true;
      showdownActive = false;
      selectedMode = 'trio';
      selectedMap = 'crossfire';
      matchStatus.textContent = 'RANKED / LOKÁLNI SÚPERI AI';
      setPanelVisible(false);
      window.setTimeout(start, 350);
    });
  }
  function renderBuffiesHub() {
    currentSystemTab = 'buffies';
    const trophies = totalTrophyCount();
    const buffieTypes = [
      { icon: '✦', name: 'GADGET BUFFIE', description: 'Pridá bonusový efekt alebo posilní Gadget tvojho Brawlera.', color: 'cyan' },
      { icon: '✧', name: 'STAR BUFFIE', description: 'Vylepší pasívnu schopnosť – Star Power.', color: 'orange' },
      { icon: '⚡', name: 'HYPERBUFFIE', description: 'Vylepší útok počas Hypercharge a predĺži jeho trvanie o 2 sekundy.', color: 'pink' },
      { icon: '◇', name: 'BLING BUFFIE', description: 'Kozmetický efekt; odomkne sa po získaní celej sady pre trio.', color: 'yellow' }
    ];
    systemContent.innerHTML = `<section class="buffies-overview"><div class="buffies-heading"><span class="buffies-icon" aria-hidden="true">✦</span><div><span class="eyebrow">VYLEPŠI SVOJICH BRAWLEROV</span><h2>BAFÍCI <small>/ BUFFIES</small></h2></div></div><p>Špeciálne vylepšenia schopností pre vybrané tria Brawlerov. Nahrádzajú staršie Epické a Mýtické Geary pri podporovaných postavách.</p><div class="buffies-unlock"><span><strong>${trophies.toLocaleString('sk-SK')} / 1 000</strong><small>trofejí na odomknutie</small></span><i role="progressbar" aria-label="Postup k odomknutiu Bafíkov" aria-valuemin="0" aria-valuemax="1000" aria-valuenow="${Math.min(trophies, 1000)}"><b style="width:${Math.min(100, trophies / 10)}%"></b></i><strong class="${trophies >= 1000 ? 'is-unlocked' : ''}">${trophies >= 1000 ? 'ODOMKNUTÉ' : 'ZBIERAJ TROFEJE'}</strong></div><div class="buffies-grid">${buffieTypes.map(type => `<article class="buffie-card buffie-${type.color}"><span class="buffie-orb" aria-hidden="true"><i>${type.icon}</i><b></b></span><div><h3>${type.name}</h3><p>${type.description}</p></div></article>`).join('')}</div><section class="claw-machine"><div><span class="eyebrow">AUTOMAT S MECHANICKOU RUKOU</span><h3>Claw Machine</h3><p>Každé trio má vlastný automat. Bafíkov môžeš získať náhodne za 1 000 Coinov a 2 000 Power Points, pomocou Buffie kľúčov, z Ultra Chaos Dropov alebo priamo za Gemy. Bling Buffie stojí navyše 10 000 Blingov.</p></div><span class="claw-machine-art" aria-hidden="true"><i><b></b></i><strong>✦</strong></span></section><button class="hub-action buffies-roster-button" data-buffies-brawlers type="button">POZRIEŤ BRAWLEROV</button></section>`;
    systemContent.querySelector('[data-buffies-brawlers]').addEventListener('click', () => openMenuSection('brawlers'));
  }
  function renderSystemHub(tab = currentSystemTab) {
    currentSystemTab = tab;
    document.body.classList.toggle('map-maker-open', tab === 'mapmaker' && !sidePanel.hidden);
    if (tab === 'ranked') { renderRankedHub(); return; }
    if (tab === 'mapmaker') { renderMapMaker(); return; }
    if (tab === 'buffies') { renderBuffiesHub(); return; }
    if (tab === 'friends') { renderFriendsHub(); return; }
    if (tab === 'club') { renderClubHub(); return; }
    if (tab === 'modes') systemContent.innerHTML = `<div class="system-grid"><div class="system-card"><strong>GEM GRAB</strong>3v3 / zbieraj kryštály.<button class="hub-action" data-quick-map="neon" type="button">HRAŤ</button></div><div class="system-card"><strong>BRAWL BALL</strong>3v3 / skóruj góly.<button class="hub-action" data-quick-map="football" type="button">HRAŤ</button></div><div class="system-card"><strong>SHOWDOWN</strong>Solo / Power Cubes / safe zone.<button class="hub-action" data-showdown="solo" type="button">SOLO</button></div><div class="system-card"><strong>DUO SHOWDOWN</strong>Team po dvoch / oživenie.<button class="hub-action" data-showdown="duo" type="button">DUO</button></div><div class="system-card"><strong>KNOCKOUT</strong>Bez respawnu / séria na 2 víťazné kolá.</div><div class="system-card"><strong>HEIST / BOUNTY</strong>Eventové pravidlá / odmeny.</div><div class="system-card"><strong>HOT ZONE</strong>Kontroluj zónu.</div><div class="system-card"><strong>LIMITED EVENT</strong>Neónová búrka / 2× trofeje.</div></div><div class="knockout-launch"><div><span class="eyebrow">KNOCKOUT / BEST OF 3</span><strong>Bez možnosti oživenia. Vyraď celý tím súpera a vyhraj dve kolá.</strong></div><button class="hub-action" data-knockout="solo" type="button">SOLO</button><button class="hub-action" data-knockout="duo" type="button">DUO</button></div>`;
    if (tab === 'maps') systemContent.innerHTML = `<div class="system-grid"><div class="system-card"><strong>NEÓNOVÝ DVOR</strong><b>Oficiálna mapa</b><br>kov, kryštály, krytie.<button class="hub-action" data-quick-map="neon" type="button">VYBRAŤ</button></div><div class="system-card"><strong>PRESTRELKA</strong><b>Oficiálna mapa</b><br>dlhé steny, stĺpy.<button class="hub-action" data-quick-map="crossfire" type="button">VYBRAŤ</button></div><div class="system-card"><strong>RUINY</strong><b>Vlastné prostredie</b><br>stĺpy, kryštály, úzke chodby.<button class="hub-action" data-quick-map="ruins" type="button">VYBRAŤ</button></div><div class="system-card"><strong>LUNÁRNE MESTO</strong><b>Nová mapa</b><br>mesačné kryštály a veže.<button class="hub-action" data-quick-map="moon" type="button">VYBRAŤ</button></div><div class="system-card"><strong>VULKANICKÁ ZÓNA</strong><b>Nová mapa</b><br>červené lávové svetlo.<button class="hub-action" data-quick-map="volcano" type="button">VYBRAŤ</button></div><div class="system-card"><strong>NEÓNOVÝ OKRUH</strong><b>Nová mapa</b><br>technické bloky a lúče.<button class="hub-action" data-quick-map="circuit" type="button">VYBRAŤ</button></div><div class="system-card"><strong>MAP MAKER</strong><b>VÝTVORCA</b><br>Navrhni, ulož a otestuj vlastnú mapu.<button class="hub-action" data-open-mapmaker type="button">TVORIŤ MAPU</button></div>${hasCustomMap ? '<div class="system-card"><strong>MOJA MAPA</strong><b>ULOŽENÁ</b><br>Vlastný návrh pripravený na hranie.<button class="hub-action" data-quick-map="custom" type="button">VYBRAŤ</button></div>' : ''}</div>`;
    if (tab === 'profile') systemContent.innerHTML = `<div class="profile-banner"><strong>${escapeHtml(playerName)}</strong><small>PLAYER TAG #NEON07 / PROFIL 01 / SEKTOR 07</small></div><div class="system-grid" style="margin-top:5px"><div class="system-card"><strong>${characters.length}</strong>Brawleri v kolekcii</div><div class="system-card"><strong>${characters.filter(character => ownedCharacters.includes(character.id)).length}</strong>Odomknutí</div><div class="system-card"><strong>${totalTrophiesEl.textContent}</strong>Celkové trofeje</div><div class="system-card"><strong>${Object.keys(achievements).length}</strong>Achievementy</div></div><div class="system-card" style="margin-top:5px">PRIATELIA: ${friends.length} / KLUB: ${clubs.find(club => club.id === joinedClubId)?.name || 'ZATIAĽ ŽIADNY'}<br><b>BOTOV MÔŽEŠ PRIDAŤ V SEKCIÁCH PRIATELIA A KLUB.</b></div>`;
    if (tab === 'rewards') systemContent.innerHTML = `<div class="system-list"><div class="system-card"><span><strong>BRAWL PASS</strong><small>Sezóna Neon Rising / level 12</small></span><button class="hub-action" data-reward="pass" type="button">+25 COINOV</button></div><div class="system-card"><span><strong>DENNÁ ODMENA</strong><small>Streak 3 / ďalší deň</small></span><button class="hub-action" data-reward="daily" type="button">ZÍSKAŤ</button></div><div class="system-card"><span><strong>KOZMETIKA</strong><small>Pins / sprays / player icons / titles</small></span><b>6 ODOMKNUTÝCH</b></div></div>`;
    if (tab === 'settings') systemContent.innerHTML = `<div class="system-grid"><div class="system-card"><strong>GRAFIKA / FPS</strong>Quality, resolution, UI scale.<button class="hub-action" data-system-action="settings" type="button">OTVORIŤ</button></div><div class="system-card"><strong>ZVUK / HUDBA</strong>Volume and effects.</div><div class="system-card"><strong>OVLÁDANIE</strong>WASD / myš / gamepad.</div><div class="system-card"><strong>ÚČET / PRIVACY</strong>Player tag / report / block.</div><div class="system-card"><strong>SEZÓNY / PATCH NOTES</strong>Balance changes / nové mapy.</div><div class="system-card"><strong>RANKED / LEADERBOARDS</strong>Rank 1 / 0 umiestnení.</div></div>`;
    systemContent.querySelectorAll('[data-quick-map]').forEach(button => button.addEventListener('click', () => { chooseMap(button.dataset.quickMap); matchHint.textContent = `VYBRANÉ: ${getMapName()}.`; setPanelVisible(false); }));
    systemContent.querySelector('[data-open-mapmaker]')?.addEventListener('click', () => openMenuSection('mapmaker'));
    systemContent.querySelectorAll('[data-knockout]').forEach(button => button.addEventListener('click', () => startKnockout(button.dataset.knockout)));
    systemContent.querySelectorAll('[data-showdown]').forEach(button => button.addEventListener('click', () => { showdownActive = true; selectedMode = button.dataset.showdown; selectedMap = 'ruins'; storage.set(selectedModeKey, selectedMode); storage.set(selectedMapKey, selectedMap); renderMatchOptions(); setPanelVisible(false); start(); }));
    systemContent.querySelectorAll('[data-system-action="settings"]').forEach(button => button.addEventListener('click', () => { settingsPanel.hidden = false; settingsToggle.setAttribute('aria-expanded', 'true'); }));
    systemContent.querySelectorAll('[data-reward]').forEach(button => button.addEventListener('click', () => { coins += button.dataset.reward === 'pass' ? 25 : 10; storage.set(coinsKey, coins); coinsEl.textContent = coins; button.textContent = 'HOTOVO'; button.disabled = true; }));
  }
  function renderBrawlerHub(tab = currentHubTab) {
    currentHubTab = tab;
    trophyRoadReward();
    const selected = getUpgradedCharacter(getCharacter());
    const totalTrophies = totalTrophyCount();
    totalTrophiesEl.textContent = `${totalTrophies} TROFEJÍ`;
    hudTrophiesEl.textContent = totalTrophies.toLocaleString('sk-SK');
    const details = detailsFor(selected);
    const skins = selected.skins || [];
    const activeSkinId = selected.equippedSkin?.id || 'base';
    const skinCollection = `<section class="skin-collection"><header><span class="eyebrow">KOLEKCIA SKINOV</span><small>${skins.length} SKINY</small></header><p class="brawler-appearance">${escapeHtml(selected.appearance || selected.detail)}</p><div class="skin-options"><button class="skin-option ${activeSkinId === 'base' ? 'active' : ''}" data-skin="base" aria-pressed="${activeSkinId === 'base'}" type="button"><strong>ZÁKLADNÝ VZHĽAD</strong><small>Pôvodná podoba</small></button>${skins.map(skin => `<button class="skin-option ${activeSkinId === skin.id ? 'active' : ''}" data-skin="${skin.id}" aria-pressed="${activeSkinId === skin.id}" type="button"><strong>${escapeHtml(skin.name)}</strong><small>${escapeHtml(skin.description)}</small></button>`).join('') || '<p class="skin-empty">Pre túto postavu zatiaľ nie sú pridané skiny.</p>'}</div></section>`;
    brawlerProfile.innerHTML = `<div class="brawler-profile-head"><div class="brawler-profile-visual"><span class="character-visual ${selected.style || ''}" style="--suit:${selected.suit}"><i></i><b></b></span></div><div class="brawler-profile-name"><strong>${escapeHtml(selected.name)}</strong><small>${attackStyleFor(selected)} / ${classFor(selected)} / ${rarityFor(selected)} / ${trophyFor(selected)} TROFEJÍ / MASTERY ${masteryFor(selected)}</small></div><button class="hub-action" data-hub-action="upgrade" type="button">VYLEPŠIŤ</button></div><div class="brawler-statline"><span>HP<b>${selected.maxEnergy}</b></span><span>DAMAGE<b>${selected.damage}</b></span><span>RÝCHLOSŤ<b>${selected.speed}</b></span><span>DOSAH<b>${rangeFor(selected)}</b></span><span>RELOAD<b>${reloadFor(selected)}</b></span><span>AMMO<b>${ammoFor(selected)}</b></span></div><div class="ability-roster"><div class="ability-chip"><strong>BASIC ATTACK</strong>${details.basic}</div><div class="ability-chip"><strong>SUPER</strong>${details.super}</div><div class="ability-chip"><strong>GADGET 1</strong>${details.gadget1}</div><div class="ability-chip"><strong>GADGET 2</strong>${details.gadget2}</div><div class="ability-chip"><strong>STAR POWER 1</strong>${details.star1}</div><div class="ability-chip"><strong>STAR POWER 2</strong>${details.star2}</div><div class="ability-chip"><strong>GEAR 1</strong>${details.gear1}</div><div class="ability-chip"><strong>GEAR 2</strong>${details.gear2}</div><div class="ability-chip"><strong>HYPERCHARGE</strong>${details.hypercharge}</div><div class="ability-chip"><strong>TRAIT</strong>${details.trait}</div></div>${skinCollection}`;
    if (tab === 'brawlers') hubContent.innerHTML = `<section class="brawler-guide"><header><span class="eyebrow">BRAWLERI / KOLEKCIA</span><p>${characters.length} postáv v ponuke. Odomkni Brawlera a vyber si jeho vzhľad v profile.</p></header></section><div class="brawler-list">${characters.map(character => { const skinNames = character.skins?.map(skin => skin.name).join(' · ') || 'bez skinov'; const suit = character.id === selectedCharacterId ? selected.suit : character.suit; return `<div class="brawler-row ${character.id === selectedCharacterId ? 'active' : ''}" data-hub-brawler="${character.id}"><span class="character-visual ${character.style || ''}" style="--suit:${suit}"><i></i><b></b></span><span><strong>${escapeHtml(character.name)}</strong><small>${escapeHtml(character.appearance || character.detail)} / SKINY: ${escapeHtml(skinNames)} / ${trophyFor(character)} trofejí</small></span><span class="rarity-badge">${rarityFor(character)}</span></div>`; }).join('')}</div>`;
    if (tab === 'road') {
      const milestones = [
        { trophies: 0, area: 'TOWN SQUARE', theme: 'square' },
        { trophies: 100, area: 'RETROPOLIS', theme: 'retro' },
        { trophies: 500, area: 'FRONTIER WORLD', theme: 'frontier' },
        { trophies: 1000, area: 'HAUNTED HAVEN', theme: 'haunted' },
        { trophies: 2500, area: 'BRAWLYWOOD', theme: 'brawlywood' },
        { trophies: 5000, area: 'MADEVIL MANOR', theme: 'manor' },
        { trophies: 10000, area: 'STAR PARK', theme: 'starpark' },
        { trophies: 25000, area: 'COSMIC FRONTIER', theme: 'cosmic' },
        { trophies: 50000, area: 'NEON DISTRICT', theme: 'neon' },
        { trophies: 75000, area: 'LEGENDS TERRITORY', theme: 'legends' },
        { trophies: 100000, area: 'CHAMPION SUMMIT', theme: 'summit' }
      ];
      const unlocked = milestones.filter(milestone => totalTrophies >= milestone.trophies).length;
      const nextMilestone = milestones.find(milestone => milestone.trophies > totalTrophies);
      const rewardClaimed = claimedQuests.includes('trophy-road-130');
      const progress = nextMilestone ? (totalTrophies - (milestones[milestones.indexOf(nextMilestone) - 1]?.trophies || 0)) / (nextMilestone.trophies - (milestones[milestones.indexOf(nextMilestone) - 1]?.trophies || 0)) * 100 : 100;
      hubContent.innerHTML = `<section class="trophy-road"><header class="trophy-road-header"><div><span class="eyebrow">STARR PARK / CESTA PROGRESU</span><h2>TROPHY ROAD</h2><p>Prejdi tematickými štvrťami a zbieraj odmeny až po vrchol pri 100 000 trofejach.</p></div><div class="trophy-road-total"><strong>${totalTrophies.toLocaleString('sk-SK')}</strong><small>TROFEJÍ</small></div></header><div class="trophy-road-progress"><span><b>${unlocked}/${milestones.length}</b> oblastí prejdených</span><strong>${nextMilestone ? `${nextMilestone.trophies.toLocaleString('sk-SK')} ĎALŠÍ MÍĽNIK` : 'MAXIMÁLNY MÍĽNIK'}</strong><i><b style="width:${Math.max(0, Math.min(100, progress))}%"></b></i></div><div class="trophy-journey" aria-label="Oblasti Cesty trofejí">${milestones.map((milestone, index) => { const reached = totalTrophies >= milestone.trophies; const upcoming = !reached && (!nextMilestone || nextMilestone.trophies === milestone.trophies); return `<article class="trophy-stop ${reached ? 'reached' : ''} ${upcoming ? 'upcoming' : ''} trophy-${milestone.theme}"><span class="trophy-stop-line" aria-hidden="true"></span><span class="trophy-stop-icon" aria-hidden="true">${reached ? '✓' : index === milestones.length - 1 ? '★' : '◇'}</span><div class="trophy-stop-copy"><small>${String(index + 1).padStart(2, '0')} / OBLASŤ</small><strong>${milestone.area}</strong><span>${milestone.trophies.toLocaleString('sk-SK')} TROFEJÍ</span></div><span class="trophy-stop-state">${reached ? 'PREJDENÉ' : upcoming ? `CHÝBA ${Math.max(0, milestone.trophies - totalTrophies).toLocaleString('sk-SK')}` : 'ZAMKNUTÉ'}</span></article>`; }).join('')}</div><div class="road-reward-panel"><strong>ODMENY NA CESTE</strong><span>Noví Brawleri · mince · Power Points · kredity · Starr Drops · Hypercharge · Bling</span><small>${rewardClaimed ? 'Míľnik 130: odmena už získaná.' : totalTrophies >= 130 ? 'Míľnik 130: odmenu za Brawlera získaš po otvorení Cesty trofejí.' : 'Na míľniku 130 ťa čaká odmena v podobe nového Brawlera.'}</small></div></section>`;
    }
    if (tab === 'events') hubContent.innerHTML = `<div class="event-list"><div class="event-row"><span><strong>NEÓNOVÁ BÚRKA</strong><small>DUO / NEÓNOVÝ DVOR / 2× TROFEJE</small></span><button class="hub-action" data-quick-map="neon" type="button">HRAŤ</button></div><div class="event-row"><span><strong>HORÚCA ZÓNA</strong><small>RUINY / VYDRŽ 90 SEKÚND</small></span><button class="hub-action" data-quick-map="ruins" type="button">HRAŤ</button></div><div class="event-row"><span><strong>BRAWL BALL</strong><small>FUTBAL / GÓLY / TEAMPLAY</small></span><button class="hub-action" data-quick-map="football" type="button">HRAŤ</button></div><div class="event-row"><span><strong>RANKED KNOCKOUT</strong><small>PRESTRELKA / 3 KOLOV / ODMENY</small></span><button class="hub-action" data-quick-map="crossfire" type="button">HRAŤ</button></div><div class="event-row"><span><strong>VÍKENDOVÝ QUEST</strong><small>VYHRAJ 1 ZÁPAS / +50 COINOV</small></span><button class="hub-action" data-hub-action="quest" type="button">${claimedQuests.includes('weekend') ? 'HOTOVO' : 'ZÍSKAŤ'}</button></div></div>`;
    hubContent.querySelectorAll('[data-hub-brawler]').forEach(row => row.addEventListener('click', () => chooseCharacter(row.dataset.hubBrawler)));
    brawlerProfile.querySelectorAll('[data-skin]').forEach(button => button.addEventListener('click', () => {
      if (button.dataset.skin === 'base') delete equippedSkins[selected.id];
      else equippedSkins[selected.id] = button.dataset.skin;
      persistGarage();
      renderShop();
    }));
    hubContent.querySelectorAll('[data-quick-map]').forEach(button => button.addEventListener('click', () => { chooseMap(button.dataset.quickMap); matchHint.textContent = `EVENT VYBRANÝ: ${getMapName()}.`; setPanelVisible(false); }));
    hubContent.querySelectorAll('[data-hub-action="quest"]').forEach(button => button.addEventListener('click', () => { if (claimedQuests.includes('weekend')) return; claimedQuests.push('weekend'); coins += 50; storage.set(coinsKey, coins); storage.set(claimedQuestsKey, JSON.stringify(claimedQuests)); coinsEl.textContent = coins; button.textContent = 'HOTOVO'; }));
    brawlerProfile.querySelector('[data-hub-action="upgrade"]').addEventListener('click', () => upgradeCharacter(selected.id));
  }
  function playTone(frequency, duration = .06) { if (!settings.volume) return; try { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.frequency.value = frequency; oscillator.type = 'square'; gain.gain.setValueAtTime(settings.volume * .025, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration); oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + duration); } catch { /* Zvuk je voliteľný. */ } }
  const mapLayouts = {
    neon: [{ x: .28, y: .25, width: .16, height: .08, style: 'metal' }, { x: .56, y: .25, width: .16, height: .08, style: 'crystal' }, { x: .42, y: .46, width: .16, height: .08, style: 'metal' }, { x: .18, y: .7, width: .16, height: .08, style: 'pillar' }, { x: .66, y: .7, width: .16, height: .08, style: 'crystal' }],
    crossfire: [{ x: .12, y: .2, width: .28, height: .07, style: 'metal' }, { x: .6, y: .2, width: .28, height: .07, style: 'metal' }, { x: .12, y: .73, width: .28, height: .07, style: 'crystal' }, { x: .6, y: .73, width: .28, height: .07, style: 'crystal' }, { x: .47, y: .34, width: .06, height: .32, style: 'pillar' }],
    ruins: [{ x: .18, y: .2, width: .12, height: .17, style: 'pillar' }, { x: .7, y: .2, width: .12, height: .17, style: 'pillar' }, { x: .18, y: .63, width: .12, height: .17, style: 'crystal' }, { x: .7, y: .63, width: .12, height: .17, style: 'crystal' }, { x: .4, y: .4, width: .2, height: .2, style: 'metal' }],
    moon: [{ x: .12, y: .18, width: .18, height: .1, style: 'crystal' }, { x: .7, y: .18, width: .18, height: .1, style: 'crystal' }, { x: .28, y: .68, width: .14, height: .1, style: 'pillar' }, { x: .58, y: .68, width: .14, height: .1, style: 'pillar' }, { x: .44, y: .34, width: .12, height: .24, style: 'metal' }],
    volcano: [{ x: .08, y: .25, width: .2, height: .1, style: 'pillar' }, { x: .72, y: .25, width: .2, height: .1, style: 'pillar' }, { x: .08, y: .65, width: .2, height: .1, style: 'crystal' }, { x: .72, y: .65, width: .2, height: .1, style: 'crystal' }, { x: .4, y: .42, width: .2, height: .1, style: 'metal' }],
    circuit: [{ x: .2, y: .18, width: .12, height: .24, style: 'metal' }, { x: .68, y: .18, width: .12, height: .24, style: 'metal' }, { x: .2, y: .58, width: .12, height: .24, style: 'crystal' }, { x: .68, y: .58, width: .12, height: .24, style: 'crystal' }, { x: .42, y: .4, width: .16, height: .2, style: 'pillar' }],
    football: [{ x: .08, y: .22, width: .12, height: .1, style: 'metal' }, { x: .8, y: .22, width: .12, height: .1, style: 'metal' }, { x: .08, y: .68, width: .12, height: .1, style: 'metal' }, { x: .8, y: .68, width: .12, height: .1, style: 'metal' }, { x: .46, y: .43, width: .08, height: .14, style: 'pillar' }]
  };
  const playableMaps = ['neon', 'crossfire', 'ruins', 'moon', 'volcano', 'circuit', 'football'];
  const mapThemes = { neon: ['#123451', '#071523', '#6fffe9'], crossfire: ['#182b47', '#090f25', '#ff8552'], ruins: ['#29314c', '#110f25', '#b9a7ff'], moon: ['#263b59', '#080d1f', '#7dd3fc'], volcano: ['#542b2b', '#170b16', '#ff5d4d'], circuit: ['#203957', '#071523', '#f9d76e'], football: ['#12473e', '#061b20', '#6fffe9'] };
  const mapEditorTools = [
    { id: 'wall', name: 'ROZBITNÁ STENA', icon: '▰', solid: true, description: 'Blokuje pohyb aj priame strely. Výbuchy ju dokážu rozbiť.' },
    { id: 'indestructible', name: 'PEVNÁ STENA', icon: '■', solid: true, description: 'Blokuje pohyb a strely. Nedá sa zničiť.' },
    { id: 'bush', name: 'KRÍKY', icon: '♣', solid: false, description: 'Zelený terén; aktuálne je iba dekoratívny a neskryje postavu.' },
    { id: 'water', name: 'VODA', icon: '≈', solid: true, description: 'Nedá sa cez ňu prejsť. Strely cez vodu preletia.' },
    { id: 'fence', name: 'PLOT', icon: '╫', solid: true, description: 'Zastaví postavy, ale strely cez plot preletia.' },
    { id: 'crate', name: 'OBYČAJNÁ DEBNIČKA', icon: '▦', solid: true, description: 'Zničiteľná prekážka. Na rozdiel od power-up boxu nedáva bonus.' },
    { id: 'spikes', name: 'ZRAŇUJÚCE HROTY', icon: '▲', solid: false, description: 'Pri státí na hrotoch postava postupne stráca zdravie.' },
    { id: 'jump', name: 'ODRAZOVÁ PLOŠINA', icon: '↗', solid: false, description: 'Vystrelí postavu v smere, ktorým je otočená.' },
    { id: 'teleport', name: 'TELEPORT', icon: '◎', solid: false, description: 'Spoj aspoň dva teleporty. Postava sa medzi nimi presunie.' },
    { id: 'speed', name: 'ZRÝCHĽOVACIA DLAŽDICA', icon: '»', solid: false, description: 'Pri pohybe po dlaždici sa postava zrýchli.' },
    { id: 'slow', name: 'SPOMAĽOVACIA DLAŽDICA', icon: '«', solid: false, description: 'Pri pohybe po dlaždici sa postava spomalí.' },
    { id: 'spawn_blue', name: 'SPAWN MODRÉHO TÍMU', icon: 'B', solid: false, description: 'Miesto, kde sa objaví hráč a jeho spojenci.' },
    { id: 'spawn_red', name: 'SPAWN ČERVENÉHO TÍMU', icon: 'R', solid: false, description: 'Miesto, kde sa objavia súperi.' },
    { id: 'box', name: 'POWER-UP BOX', icon: '▣', solid: true, description: 'Rozbi ho strelou. Vypadne z neho posilnenie: viac zdravia a poškodenia.' },
    { id: 'gem_mine', name: 'BAŇA NA GEMY', icon: '♦', solid: false, description: 'Označí miesto, kde sa v režime Gem Grab objavia drahokamy.' },
    { id: 'goal_blue', name: 'MODRÁ BRÁNA', icon: 'G', solid: false, description: 'Modrý cieľ v Brawl Balle; umiestni ho na svoju stranu.' },
    { id: 'goal_red', name: 'ČERVENÁ BRÁNA', icon: 'G', solid: false, description: 'Červený cieľ v Brawl Balle; umiestni ho na súperovu stranu.' },
    { id: 'ball', name: 'ŠTART LOPTY', icon: '●', solid: false, description: 'Miesto, kde sa na začiatku Brawl Ball zápasu objaví lopta.' },
    { id: 'safe', name: 'TREZOR (ZNAČKA)', icon: '▤', solid: false, description: 'Vizuálna značka trezoru; zatiaľ nemení pravidlá zápasu.' },
    { id: 'erase', name: 'GUMA / VYMAZAŤ', icon: '×', solid: false, description: 'Vymaže objekt z políčka.' }
  ];
  function recordMapEdit() {
    mapMakerUndo.push(mapMakerCells.map(cell => ({ ...cell })));
    if (mapMakerUndo.length > 60) mapMakerUndo.shift();
    mapMakerRedo = [];
  }
  function updateMapHistoryButtons() {
    const undo = systemContent.querySelector('[data-map-undo]');
    const redo = systemContent.querySelector('[data-map-redo]');
    if (undo) undo.disabled = mapMakerUndo.length === 0;
    if (redo) redo.disabled = mapMakerRedo.length === 0;
  }
  function setMapCell(x, y, type) {
    const existing = mapMakerCells.find(cell => cell.x === x && cell.y === y);
    if (existing?.type === type || type === 'erase' && !existing) return false;
    if (mapMakerPainting) {
      if (!mapMakerStrokeRecorded) {
        recordMapEdit();
        mapMakerStrokeRecorded = true;
      }
    } else recordMapEdit();
    mapMakerCells = mapMakerCells.filter(cell => cell.x !== x || cell.y !== y);
    if (type !== 'erase') mapMakerCells.push({ x, y, type });
    mapMakerDirty = true;
    const button = systemContent.querySelector(`[data-map-cell="${x},${y}"]`);
    if (button) {
      const tool = mapEditorTools.find(item => item.id === type);
      button.className = `map-cell ${tool ? `tile-${type}` : ''}`;
      button.textContent = tool?.icon || '';
      button.setAttribute('aria-label', `Políčko ${x + 1}, ${y + 1}${tool ? `: ${tool.name}` : ': prázdne'}`);
    }
    const message = systemContent.querySelector('.map-editor-message');
    if (message) message.textContent = 'Neuložené zmeny. Ulož mapu, keď bude hotová.';
    updateMapHistoryButtons();
    return true;
  }
  function undoMapEdit() {
    if (!mapMakerUndo.length) return;
    mapMakerRedo.push(mapMakerCells.map(cell => ({ ...cell })));
    mapMakerCells = mapMakerUndo.pop();
    renderMapMaker('Vrátená posledná zmena.');
  }
  function redoMapEdit() {
    if (!mapMakerRedo.length) return;
    mapMakerUndo.push(mapMakerCells.map(cell => ({ ...cell })));
    mapMakerCells = mapMakerRedo.pop();
    renderMapMaker('Zmena obnovená.');
  }
  function renderMapMaker(message = '') {
    const cells = new Map(mapMakerCells.map(cell => [`${cell.x},${cell.y}`, cell]));
    document.body.classList.toggle('map-maker-open', !sidePanel.hidden);
    systemContent.innerHTML = `<section class="map-editor"><header><span class="eyebrow">MAP MAKER / VLASTNÁ MAPA</span><p>Vyber nástroj a ťahaj po mriežke. Ulož viac máp, načítaj ich alebo ich prenes ako súbor.</p></header><div class="map-library"><label>ULOŽENÉ MAPY<select data-map-library>${customMaps.map(map => `<option value="${escapeHtml(map.id)}" ${map.id === activeCustomMapId ? 'selected' : ''}>${escapeHtml(map.name)} · ${map.cells.length}</option>`).join('')}</select></label><div class="map-library-actions"><button class="hub-action" data-map-load type="button" ${customMaps.length ? '' : 'disabled'}>NAČÍTAŤ</button><button class="hub-action" data-map-new type="button">NOVÁ MAPA</button><button class="hub-action" data-map-delete type="button" ${customMaps.length ? '' : 'disabled'}>VYMAZAŤ</button></div></div><label class="map-name-picker">NÁZOV MAPY<input data-map-name type="text" maxlength="28" value="${escapeHtml(mapMakerName)}" placeholder="Názov mapy"></label><label class="map-mode-picker">HERNÝ REŽIM<select data-map-mode><option value="gem">GEM GRAB</option><option value="showdown">SHOWDOWN</option><option value="football">BRAWL BALL</option></select></label><div class="map-tool-palette">${mapEditorTools.map(tool => `<button class="map-tool ${mapMakerTool === tool.id ? 'active' : ''}" data-map-tool="${tool.id}" type="button" aria-pressed="${mapMakerTool === tool.id}"><span>${tool.icon}</span>${tool.name}</button>`).join('')}</div><div class="map-editor-grid" role="grid" aria-label="Mriežka mapy">${Array.from({ length: mapEditorRows }, (_, y) => Array.from({ length: mapEditorColumns }, (_, x) => { const cell = cells.get(`${x},${y}`); const tool = mapEditorTools.find(item => item.id === cell?.type); return `<button class="map-cell ${cell ? `tile-${cell.type}` : ''}" data-map-cell="${x},${y}" type="button" role="gridcell" aria-label="Políčko ${x + 1}, ${y + 1}${tool ? `: ${tool.name}` : ': prázdne'}">${tool?.icon || ''}</button>`; }).join('')).join('')}</div><div class="map-history-actions"><button class="hub-action" data-map-undo type="button" ${mapMakerUndo.length ? '' : 'disabled'}>↶ SPÄŤ</button><button class="hub-action" data-map-redo type="button" ${mapMakerRedo.length ? '' : 'disabled'}>↷ ZNOVA</button></div><p class="map-editor-message" role="status">${escapeHtml(message || (mapMakerDirty ? 'Neuložené zmeny. Ulož mapu, keď bude hotová.' : hasCustomMap ? `${customMapName} · ${customMapCells.length} políčok.` : 'Klikni na políčka alebo mapu rovno ulož.'))}</p><div class="map-editor-actions"><button class="hub-action" data-map-template type="button">VLOŽIŤ ZÁKLAD</button><button class="hub-action" data-map-clear type="button">VYMAZAŤ</button><button class="hub-action" data-map-save type="button">ULOŽIŤ MAPU</button><button class="hub-action" data-map-test type="button">TESTOVAŤ</button><button class="hub-action" data-map-export type="button" ${customMaps.some(map => map.id === activeCustomMapId) ? '' : 'disabled'}>EXPORTOVAŤ</button><button class="hub-action" data-map-import-trigger type="button">IMPORTOVAŤ</button><input data-map-import type="file" accept="application/json,.json" hidden></div><p class="map-editor-help">Nie sú povinné spawny, objekty, priechodnosť ani minimálny počet políčok. Mapa sa uloží presne tak, ako ju vytvoríš.</p></section>`;
    const header = systemContent.querySelector('.map-editor > header');
    const closeButton = document.createElement('button');
    closeButton.className = 'map-editor-close';
    closeButton.type = 'button';
    closeButton.textContent = 'ZAVRIEŤ EDITOR';
    closeButton.setAttribute('aria-label', 'Zavrieť editor máp');
    closeButton.addEventListener('click', () => setPanelVisible(false));
    header.append(closeButton);
    const selectedTool = mapEditorTools.find(tool => tool.id === mapMakerTool) || mapEditorTools[0];
    const toolHelp = document.createElement('p');
    toolHelp.className = 'map-tool-help';
    toolHelp.setAttribute('aria-live', 'polite');
    toolHelp.innerHTML = `<strong>${escapeHtml(selectedTool.name)}</strong><span>${escapeHtml(selectedTool.description)}</span>`;
    systemContent.querySelector('.map-tool-palette').after(toolHelp);
    systemContent.querySelectorAll('[data-map-tool]').forEach(button => {
      const tool = mapEditorTools.find(item => item.id === button.dataset.mapTool);
      if (tool) button.title = tool.description;
    });
    const modeSelect = systemContent.querySelector('[data-map-mode]');
    modeSelect.value = mapMakerMode;
    modeSelect.addEventListener('change', () => { mapMakerMode = modeSelect.value; mapMakerDirty = true; renderMapMaker(); });
    systemContent.querySelector('[data-map-name]').addEventListener('input', event => { mapMakerName = event.currentTarget.value.slice(0, 28); mapMakerDirty = true; });
    systemContent.querySelector('[data-map-load]').addEventListener('click', () => {
      const map = customMaps.find(item => item.id === systemContent.querySelector('[data-map-library]').value);
      if (map) loadCustomMap(map);
    });
    systemContent.querySelector('[data-map-new]').addEventListener('click', startNewCustomMap);
    systemContent.querySelector('[data-map-delete]').addEventListener('click', deleteSelectedCustomMap);
    systemContent.querySelector('[data-map-export]').addEventListener('click', exportCustomMap);
    const importInput = systemContent.querySelector('[data-map-import]');
    systemContent.querySelector('[data-map-import-trigger]').addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', async () => {
      const file = importInput.files?.[0];
      if (!file) return;
      try {
        if (file.size > 256 * 1024) throw new Error('Súbor je príliš veľký (limit 256 KB).');
        if (mapMakerDirty && !window.confirm('Import zahodí neuložené zmeny. Pokračovať?')) {
          renderMapMaker('Import zrušený; neuložené zmeny zostali zachované.');
          return;
        }
        const data = JSON.parse(await file.text());
        const record = data?.format === 'neon-drift-map' && data.version === 1 ? data.map : data;
        const importedMap = normalizeCustomMap(record);
        if (!importedMap) throw new Error('Súbor neobsahuje platnú mapu.');
        if (record.cells.some(cell => !cell || !Number.isInteger(cell.x) || !Number.isInteger(cell.y) || cell.x < 0 || cell.x >= mapEditorColumns || cell.y < 0 || cell.y >= mapEditorRows || !mapCellTypes.includes(cell.type))) throw new Error('Mapa obsahuje neplatné políčka.');
        importedMap.id = createCustomMapId();
        customMaps.push(importedMap);
        persistCustomMaps();
        loadCustomMap(importedMap, true, 'Mapa bola importovaná.');
      } catch (error) {
        renderMapMaker(`Import zlyhal: ${error.message || 'neplatný súbor.'}`);
      }
    });
    systemContent.querySelectorAll('[data-map-tool]').forEach(button => button.addEventListener('click', () => { mapMakerTool = button.dataset.mapTool; renderMapMaker(); }));
    const grid = systemContent.querySelector('.map-editor-grid');
    grid.addEventListener('pointerdown', event => {
      const cell = event.target.closest('[data-map-cell]');
      if (!cell) return;
      event.preventDefault();
      mapMakerPainting = true;
      mapMakerStrokeRecorded = false;
      const [x, y] = cell.dataset.mapCell.split(',').map(Number);
      setMapCell(x, y, mapMakerTool);
    });
    grid.addEventListener('pointermove', event => {
      if (!mapMakerPainting) return;
      const cell = event.target.closest('[data-map-cell]');
      if (!cell) return;
      const [x, y] = cell.dataset.mapCell.split(',').map(Number);
      if (mapMakerCells.some(item => item.x === x && item.y === y && item.type === mapMakerTool)) return;
      setMapCell(x, y, mapMakerTool);
    });
    grid.addEventListener('click', event => {
      if (event.detail !== 0) return;
      const cell = event.target.closest('[data-map-cell]');
      if (!cell) return;
      const [x, y] = cell.dataset.mapCell.split(',').map(Number);
      setMapCell(x, y, mapMakerTool);
    });
    systemContent.querySelector('[data-map-template]').addEventListener('click', () => {
      recordMapEdit();
      mapMakerDirty = true;
      mapMakerCells = [{ x: 2, y: 8, type: 'spawn_blue' }, { x: 17, y: 8, type: 'spawn_red' }, { x: 9, y: 7, type: mapMakerMode === 'gem' ? 'gem_mine' : mapMakerMode === 'showdown' ? 'box' : 'ball' }, { x: 4, y: 4, type: 'box' }, { x: 15, y: 4, type: 'box' }, { x: 4, y: 11, type: 'box' }, { x: 15, y: 11, type: 'box' }];
      for (let y = 4; y <= 7; y++) mapMakerCells.push({ x: 7, y, type: 'wall' }, { x: 12, y, type: 'wall' });
      for (let y = 9; y <= 12; y++) mapMakerCells.push({ x: 7, y, type: 'wall' }, { x: 12, y, type: 'wall' });
      if (mapMakerMode === 'football') mapMakerCells.push({ x: 1, y: 8, type: 'goal_blue' }, { x: 18, y: 8, type: 'goal_red' });
      renderMapMaker('Základ mapy pripravený. Pridaj terén a ulož mapu.');
    });
    systemContent.querySelector('[data-map-clear]').addEventListener('click', () => { recordMapEdit(); mapMakerCells = []; mapMakerDirty = true; renderMapMaker('Mapa vymazaná.'); });
    systemContent.querySelector('[data-map-undo]').addEventListener('click', undoMapEdit);
    systemContent.querySelector('[data-map-redo]').addEventListener('click', redoMapEdit);
    systemContent.querySelector('[data-map-save]').addEventListener('click', () => saveCustomMap(false));
    systemContent.querySelector('[data-map-test]').addEventListener('click', () => saveCustomMap(true));
  }
  function saveCustomMap(test = false) {
    customMapCells = mapMakerCells.map(cell => ({ ...cell }));
    hasCustomMap = true;
    customMapName = mapMakerName.trim().slice(0, 28) || 'Moja mapa';
    mapMakerName = customMapName;
    customMapMode = mapMakerMode;
    if (!activeCustomMapId || !customMaps.some(map => map.id === activeCustomMapId)) activeCustomMapId = createCustomMapId();
    const savedMap = { id: activeCustomMapId, name: customMapName, mode: customMapMode, cells: customMapCells.map(cell => ({ ...cell })) };
    const existingIndex = customMaps.findIndex(map => map.id === activeCustomMapId);
    if (existingIndex < 0) customMaps.push(savedMap);
    else customMaps[existingIndex] = savedMap;
    mapMakerDirty = false;
    mapLayouts.custom = customMapLayout(customMapCells);
    persistCustomMaps();
    selectedMap = 'custom';
    selectedMode = mapMakerMode === 'showdown' ? 'solo' : mapMakerMode === 'football' ? 'trio' : 'trio';
    showdownActive = mapMakerMode === 'showdown';
    storage.set(selectedMapKey, selectedMap);
    storage.set(selectedModeKey, selectedMode);
    renderMatchOptions();
    matchHint.textContent = `${customMapName.toUpperCase()} / ${mapMakerMode.toUpperCase()}`;
    if (test) { setPanelVisible(false); start(); }
    else renderMapMaker('Mapa uložená a vybraná. Môžeš ju testovať v zápase.');
  }
  function createCustomMapId() {
    let id;
    do { id = `map_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`; } while (customMaps.some(map => map.id === id));
    return id;
  }
  function persistCustomMaps() {
    storage.set(customMapLibraryKey, JSON.stringify(customMaps));
    storage.set(activeCustomMapKey, activeCustomMapId);
    if (customMaps.length) storage.set(customMapDataKey, JSON.stringify({ name: customMapName, mode: customMapMode, cells: customMapCells }));
    else storage.remove(customMapDataKey);
  }
  function loadCustomMap(map, discardChanges = false, message = '') {
    if (mapMakerDirty && !discardChanges && !window.confirm('Neuložené zmeny sa stratia. Pokračovať?')) {
      renderMapMaker('Načítanie zrušené; neuložené zmeny zostali zachované.');
      return;
    }
    activeCustomMapId = map.id;
    mapMakerName = customMapName = map.name;
    mapMakerMode = customMapMode = map.mode;
    mapMakerCells = map.cells.map(cell => ({ ...cell }));
    customMapCells = map.cells.map(cell => ({ ...cell }));
    hasCustomMap = true;
    mapMakerDirty = false;
    mapMakerUndo = [];
    mapMakerRedo = [];
    mapLayouts.custom = customMapLayout(customMapCells);
    selectedMap = 'custom';
    selectedMode = customMapMode === 'showdown' ? 'solo' : 'trio';
    showdownActive = customMapMode === 'showdown';
    storage.set(selectedMapKey, selectedMap);
    storage.set(selectedModeKey, selectedMode);
    persistCustomMaps();
    renderMatchOptions();
    renderMapMaker(message || `${map.name} načítaná. Môžeš ju upraviť alebo testovať.`);
  }
  function startNewCustomMap() {
    if (mapMakerDirty && !window.confirm('Neuložené zmeny sa stratia. Vytvoriť novú mapu?')) return;
    activeCustomMapId = '';
    mapMakerName = 'Moja mapa';
    mapMakerMode = 'gem';
    mapMakerCells = [];
    mapMakerDirty = false;
    mapMakerUndo = [];
    mapMakerRedo = [];
    renderMapMaker('Nová prázdna mapa. Ulož ju pod vlastným názvom.');
  }
  function deleteSelectedCustomMap() {
    const id = systemContent.querySelector('[data-map-library]').value;
    const map = customMaps.find(item => item.id === id);
    if (!map || !window.confirm(`Naozaj vymazať mapu „${map.name}“?`)) return;
    customMaps = customMaps.filter(item => item.id !== id);
    if (activeCustomMapId === id) {
      activeCustomMapId = '';
      mapMakerDirty = false;
      if (customMaps.length) {
        const replacement = customMaps[customMaps.length - 1];
        mapMakerCells = replacement.cells.map(cell => ({ ...cell }));
        customMapCells = replacement.cells.map(cell => ({ ...cell }));
        mapMakerName = customMapName = replacement.name;
        mapMakerMode = customMapMode = replacement.mode;
        activeCustomMapId = replacement.id;
        hasCustomMap = true;
        selectedMap = 'custom';
        selectedMode = customMapMode === 'showdown' ? 'solo' : 'trio';
        showdownActive = customMapMode === 'showdown';
      } else {
        mapMakerCells = [];
        customMapCells = [];
        hasCustomMap = false;
        selectedMap = 'neon';
        showdownActive = false;
        customMapName = mapMakerName = 'Moja mapa';
        customMapMode = mapMakerMode = 'gem';
      }
      mapMakerUndo = [];
      mapMakerRedo = [];
    }
    mapLayouts.custom = customMapLayout(customMapCells);
    persistCustomMaps();
    storage.set(selectedMapKey, selectedMap);
    storage.set(selectedModeKey, selectedMode);
    renderMatchOptions();
    renderMapMaker('Mapa vymazaná.');
  }
  function exportCustomMap() {
    const map = customMaps.find(item => item.id === activeCustomMapId);
    if (!map) {
      renderMapMaker('Ulož mapu pred exportovaním.');
      return;
    }
    const blob = new Blob([JSON.stringify({ format: 'neon-drift-map', version: 1, map: { name: map.name, mode: map.mode, cells: map.cells } }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${map.name.replace(/[^\w-]+/g, '-') || 'neon-drift-map'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    renderMapMaker('Mapa exportovaná do JSON súboru.');
  }
  function customMapLayout(cells = customMapCells) {
    return cells.map(cell => ({
      x: cell.x / mapEditorColumns,
      y: cell.y / mapEditorRows,
      width: 1 / mapEditorColumns,
      height: 1 / mapEditorRows,
      style: cell.type === 'crate' || cell.type === 'box' || cell.type === 'safe' ? 'pillar' : cell.type === 'bush' ? 'bush' : cell.type === 'water' ? 'water' : cell.type === 'indestructible' || cell.type === 'fence' ? 'indestructible' : cell.type === 'spikes' ? 'spikes' : 'metal',
      type: cell.type,
      solid: ['wall', 'indestructible', 'water', 'fence', 'crate', 'box'].includes(cell.type),
      cellX: cell.x,
      cellY: cell.y
    }));
  }
  if (hasCustomMap) mapLayouts.custom = customMapLayout(customMapCells);
  if (selectedMap === 'custom' && !hasCustomMap) selectedMap = 'neon';
  const makeSkins = entries => entries.map(([id, name, description, suit]) => ({ id, name, description, suit }));
  const characters = [
    { id: 'rookie', name: 'Nováčik', gemCost: 0, speed: 235, maxEnergy: 100, damage: 28, shots: 1, fireRate: .22, suit: colors.cyan, detail: 'Vyvážený prieskumník', weapon: 'Presná strela' },
    { id: 'runner', name: 'Šprintér', gemCost: 4, speed: 295, maxEnergy: 90, damage: 20, shots: 2, fireRate: .3, suit: colors.orange, detail: 'Rýchly, ale krehký', weapon: 'Dvojitá strela' },
    { id: 'guardian', name: 'Strážca', gemCost: 7, speed: 190, maxEnergy: 135, damage: 42, shots: 1, fireRate: .42, suit: colors.pink, detail: 'Pomalý tank s výdržou', weapon: 'Ťažký kanón' },
    { id: 'medic', name: 'Lekár', gemCost: 9, speed: 220, maxEnergy: 115, damage: 22, shots: 1, fireRate: .26, suit: '#a8e6cf', detail: 'Podporný strelec', weapon: 'Rýchla strela' },
    { id: 'sniper', name: 'Ostreľovač', gemCost: 12, speed: 175, maxEnergy: 85, damage: 70, shots: 1, fireRate: .85, suit: '#b9a7ff', detail: 'Pomalý, ale presný', weapon: 'Plazmový lúč' },
    { id: 'phantom', name: 'Prízrak', gemCost: 15, speed: 270, maxEnergy: 95, damage: 32, shots: 2, fireRate: .38, suit: '#7dd3fc', detail: 'Tichý útočník', weapon: 'Dvojitý impulz' },
    { id: 'titan', name: 'Titan', gemCost: 20, speed: 150, maxEnergy: 170, damage: 58, shots: 1, fireRate: 1, suit: '#fbbf24', detail: 'Obrnený ničiteľ', weapon: 'Kinetické delo' },
    { id: 'volt', name: 'Volt', gemCost: 24, speed: 310, maxEnergy: 80, damage: 16, shots: 3, fireRate: .36, suit: '#c4b5fd', detail: 'Blesk s tromi strelami', weapon: 'Trojitý výboj' },
    { id: 'wraith', name: 'Tieň', gemCost: 30, speed: 250, maxEnergy: 110, damage: 46, shots: 1, fireRate: .2, suit: '#94a3b8', detail: 'Lovec z úkrytu', weapon: 'Tieňová strela' },
    { id: 'frost_ninja', name: 'Mrazivý ninja', gemCost: 18, speed: 265, maxEnergy: 105, damage: 36, shots: 2, fireRate: .34, suit: '#4b3f9f', detail: 'Tichý bojovník so šálom', weapon: 'Ľadové dvojstrely', style: 'hood' },
    { id: 'ember', name: 'Iskra', gemCost: 22, speed: 240, maxEnergy: 100, damage: 52, shots: 1, fireRate: .58, suit: '#ff5d4d', detail: 'Výbušný útočník', weapon: 'Horúca strela' },
    { id: 'scout', name: 'Prieskumník', gemCost: 16, speed: 330, maxEnergy: 78, damage: 18, shots: 2, fireRate: .24, suit: '#38bdf8', detail: 'Najrýchlejší člen tímu', weapon: 'Rýchle impulzy' },
    { id: 'engineer', name: 'Technik', gemCost: 26, speed: 205, maxEnergy: 125, damage: 30, shots: 3, fireRate: .5, suit: '#facc15', detail: 'Odolný strelec', weapon: 'Rozptylová salva' },
    { id: 'shadow', name: 'Nočný lovec', gemCost: 34, speed: 285, maxEnergy: 92, damage: 64, shots: 1, fireRate: .72, suit: '#64748b', detail: 'Silný strelec z úkrytu', weapon: 'Tieňový projektil', style: 'hood' },
    { id: 'shelly', name: 'Shelly', gemCost: 38, speed: 250, maxEnergy: 120, damage: 38, shots: 3, fireRate: .4, suit: '#a06ce0', detail: 'Brokovnica na krátku vzdialenosť', weapon: 'Brokovnica', appearance: 'Energetická pištoľníčka s fialovým copom, žltou šatkou a brokovnicou.', skins: makeSkins([['witch', 'Witch Shelly', 'Čarodejnícky klobúk a magická zbraň.', '#7045bd'], ['princess', 'Princess Shelly', 'Ružové šaty, korunka a zlaté zdobenie.', '#f08ac0']]) },
    { id: 'colt', name: 'Colt', gemCost: 40, speed: 260, maxEnergy: 95, damage: 21, shots: 2, fireRate: .25, suit: '#278cdd', detail: 'Rýchla salva z dvoch pištolí', weapon: 'Dva revolvery', appearance: 'Sebavedomý pištoľník s červeno-ružovými vlasmi, modrou vestou a dvoma revolvermi.', skins: makeSkins([['mecha', 'Mecha Colt', 'Futuristický robot s laserovými zbraňami.', '#7692ad'], ['shark', 'Shark Colt', 'Vtipný nafukovací žraločí oblek a vodné pištole.', '#36b7df']]) },
    { id: 'el_primo', name: 'El Primo', gemCost: 42, speed: 230, maxEnergy: 160, damage: 40, shots: 1, fireRate: .28, suit: '#287bd6', detail: 'Odolný zápasník na blízko', weapon: 'Údery', appearance: 'Mohutný luchador v modro-žltej maske a zápasníckom opasku.', skins: makeSkins([['rudo', 'El Rudo Primo', 'Temná maska s rohmi a fialový plášť.', '#51226d'], ['brown', 'El Brown', 'Medvedí kostým s hnedými uškami.', '#a86e40']]) },
    { id: 'rico', name: 'Rico', gemCost: 42, speed: 245, maxEnergy: 105, damage: 28, shots: 3, fireRate: .34, suit: '#59c8ed', detail: 'Odrážajúce strely', weapon: 'Gumové guľôčky', appearance: 'Jednooký robot s priehľadným trupom plným farebných guličiek.', skins: makeSkins([['loaded', 'Loaded Rico', 'Kráľovský plášť, koruna a drahokamy.', '#9d6fe8'], ['chicken', 'Chicken Rico', 'Kostým obrieho kuraťa a vajíčkové strely.', '#f5c64c']]) },
    { id: 'barley', name: 'Barley', gemCost: 40, speed: 220, maxEnergy: 100, damage: 25, shots: 1, fireRate: .55, suit: '#656d78', detail: 'Robotický barman a vrhač', weapon: 'Fľaše', appearance: 'Elegantný robotický barman s namaľovanými fúzmi, vestou a motýlikom.', skins: makeSkins([['wizard', 'Wizard Barley', 'Modrý čarodejnícky plášť a ohnivé gule.', '#4779d4'], ['bakesale', 'Bakesale Barley', 'Zástera a horúce koláče namiesto fliaš.', '#c98952']]) },
    { id: 'tick', name: 'Tick', gemCost: 38, speed: 220, maxEnergy: 90, damage: 35, shots: 2, fireRate: .62, suit: '#a6aeb8', detail: 'Robot, ktorý rozhadzuje míny', weapon: 'Míny', appearance: 'Guľatý malý robot s námorníckou mínou namiesto hlavy a červenou šatkou.', skins: makeSkins([['king_crab', 'King Crab Tick', 'Červený morský krab, ktorý hádže malé kraby.', '#e0473d'], ['shiba', 'Shiba Tick', 'Kovová hlava s tvárou psa plemena Shiba Inu.', '#d79c5d']]) },
    { id: 'leon', name: 'Leon', gemCost: 48, speed: 300, maxEnergy: 90, damage: 27, shots: 2, fireRate: .3, suit: '#58a95b', detail: 'Rýchly útočník, ktorý sa skrýva', weapon: 'Čepele', appearance: 'Tajomný chlapec v zelenej chameleónovej mikine s kapucňou a lízatkom.', skins: makeSkins([['shark', 'Shark Leon', 'Modrá žraločia mikina s plutvou.', '#37a8d7'], ['werewolf', 'Werewolf Leon', 'Vlkodlačí vzhľad so svietiacimi očami.', '#7962a8']]) },
    { id: 'spike', name: 'Spike', gemCost: 48, speed: 220, maxEnergy: 100, damage: 36, shots: 3, fireRate: .55, suit: '#56a857', detail: 'Kaktus strieľajúci ostne', weapon: 'Kaktusové ostne', appearance: 'Malý zelený kaktus s tromi čiernymi otvormi na tvári a fialovou vestou.', skins: makeSkins([['sakura', 'Sakura Spike', 'Ružový kaktus s kvetmi čerešne.', '#e68ab8'], ['dark_lord', 'Dark Lord Spike', 'Fialovo-čierne vesmírne brnenie.', '#5b3e87']]) },
    { id: 'crow', name: 'Crow', gemCost: 52, speed: 295, maxEnergy: 95, damage: 24, shots: 3, fireRate: .5, suit: '#23364d', detail: 'Rýchly havran s jedovatými čepeľami', weapon: 'Jedovaté dýky', appearance: 'Drsný čierny havran v tmavomodrej motorkárskej bunde.', skins: makeSkins([['phoenix', 'Phoenix Crow', 'Zlatý ohnivý féniks.', '#e8a43c'], ['mecha', 'Mecha Crow', 'Futuristický mechanický vták.', '#468dcc']]) },
    { id: 'mortis', name: 'Mortis', gemCost: 50, speed: 275, maxEnergy: 115, damage: 32, shots: 1, fireRate: .2, suit: '#624c72', detail: 'Hrobár s rýchlym výpadom', weapon: 'Lopata', appearance: 'Upírsky hrobár v čiernom obleku, fialovom plášti a vysokom cylindri.', skins: makeSkins([['rogue', 'Rogue Mortis', 'Púštny bojovník s maskou a svietiacim mečom.', '#c29d50'], ['mecha', 'Mecha Mortis', 'Robotický upír s červenými svetlami.', '#bd394e']]) },
    { id: 'tara', name: 'Tara', gemCost: 46, speed: 240, maxEnergy: 110, damage: 33, shots: 3, fireRate: .44, suit: '#874d9f', detail: 'Veštica vrhajúca tarotové karty', weapon: 'Tarotové karty', appearance: 'Tajomná veštica zahalená vo fialových obväzoch s jedným žiariacim okom.', skins: makeSkins([['street_ninja', 'Street Ninja Tara', 'Neónová kyberpunková bunda a svietiace karty.', '#2bbbd1'], ['stara', 'Stara', 'Hviezdna podoba s nočnou oblohou.', '#5268d6']]) },
    { id: 'piper', name: 'Piper', gemCost: 48, speed: 190, maxEnergy: 90, damage: 75, shots: 1, fireRate: .8, suit: '#83aade', detail: 'Ostreľovačka na veľkú vzdialenosť', weapon: 'Slnečníková puška', appearance: 'Elegantná blond princezná v belasých šatách so slnečníkom-maskovanou puškou.', skins: makeSkins([['mariposa', 'Mariposa Piper', 'Fialovo-zelené motýlie šaty a krídla.', '#a574d7'], ['lunar', 'Lunar Piper', 'Vesmírny vzhľad so zajačími ušami.', '#9c78e8']]) },
    { id: 'brock', name: 'Brock', gemCost: 44, speed: 235, maxEnergy: 105, damage: 45, shots: 1, fireRate: .6, suit: '#d94b4b', detail: 'Raketometník s výbušným zásahom', weapon: 'Raketomet', appearance: 'Pouličný strelec v červenej bunde so slnečnými okuliarmi a raketometom.', skins: makeSkins([['zeus', 'Zeus Brock', 'Boh hromu s bleskami a zlatým mrakom.', '#f0d26c'], ['super_ranger', 'Super Ranger Brock', 'Farebný superhrdinský oblek a prilba.', '#2978cf']]) },
    { id: 'edgar', name: 'Edgar', gemCost: 44, speed: 300, maxEnergy: 100, damage: 22, shots: 2, fireRate: .3, suit: '#393044', detail: 'Rýchly útočník bojujúci šálom', weapon: 'Oživený šál', appearance: 'Emo tínedžer v tmavom oblečení s dlhým fialovo-čiernym šálom.', skins: makeSkins([['mecha', 'Mecha Edgar', 'Kybernetický ninja s mechanickými ramenami.', '#4d5364'], ['doctor', 'Doctor Edgar', 'Šialený vedec so zelenou maskou.', '#66a265']]) },
    { id: 'fang', name: 'Fang', gemCost: 46, speed: 260, maxEnergy: 110, damage: 35, shots: 1, fireRate: .35, suit: '#7856b3', detail: 'Bojovník s prudkým kopom', weapon: 'Kung-fu kop', appearance: 'Mladý bojovník v šiltovke, fialovej veste a žltých teniskách.', skins: makeSkins([['kabocha', 'Kabocha Fang', 'Tekvicová maska a oranžové efekty.', '#e57d39'], ['ferocious', 'Ferocious Fang', 'Bojová maska a neónové pazúry.', '#d9d7ed']]) },
    { id: 'dynamike', name: 'Dynamike', gemCost: 40, speed: 225, maxEnergy: 100, damage: 40, shots: 2, fireRate: .55, suit: '#d0a536', detail: 'Baník hádžuci výbušniny ponad krytie', weapon: 'Dynamit', appearance: 'Starý baník s bielou bradou, prilbou a ruksakom plným výbušnín.', skins: makeSkins([['robo', 'Robo Mike', 'Pilot veľkého robota s výbušnými súčiastkami.', '#708292'], ['tengu', 'Tengu Mike', 'Maska japonského démona a vtáčie krídla.', '#bc5146']]) },
    { id: 'emz', name: 'Emz', gemCost: 42, speed: 220, maxEnergy: 115, damage: 30, shots: 1, fireRate: .5, suit: '#9567bd', detail: 'Kontroluje priestor toxickým sprejom', weapon: 'Lak na vlasy', appearance: 'Fialová zombie múmia s telefónom a farebným copom.', skins: makeSkins([['harajuku', 'Harajuku Emz', 'Pestrofarebná móda a ružové okuliare.', '#eb7eb5'], ['medusa', 'Medusa Emz', 'Hadie vlasy a mytologický vzhľad.', '#5aaf7d']]) },
    { id: 'sandy', name: 'Sandy', gemCost: 44, speed: 240, maxEnergy: 120, damage: 29, shots: 1, fireRate: .45, suit: '#6f83d5', detail: 'Ovláda piesok a skrýva spojencov', weapon: 'Magický piesok', appearance: 'Unavený chlapec vo fialovom plášti a svetlomodrej nočnej čiapke.', skins: makeSkins([['lantern', 'Lantern Sandy', 'Princ s lampášom plným hviezd.', '#dcae4e'], ['nightmare', 'Nightmare Sandy', 'Temný duch s modrým plameňom v očiach.', '#423f82']]) },
    { id: 'moe', name: 'Moe', gemCost: 50, speed: 275, maxEnergy: 100, damage: 34, shots: 2, fireRate: .32, suit: '#776c53', detail: 'Prefíkaný strelec s obrovským vrtákom', weapon: 'Kamienky a vrták', appearance: 'Malá myš v robotníckej čiapke a ochranných okuliaroch.', skins: makeSkins([['underworld', 'Underworld Moe', 'Ohnivý démon s vŕtačkou pripomínajúcou pec.', '#df553b']]) },
    { id: 'clancy', name: 'Clancy', gemCost: 48, speed: 230, maxEnergy: 130, damage: 40, shots: 2, fireRate: .45, suit: '#db473c', detail: 'Krab, ktorého útoky sa stupňujú', weapon: 'Klepetá a strely', appearance: 'Červený krab v námorníckom brnení a kapitánskom klobúku.', skins: makeSkins([['high_seas', 'High Seas Clancy', 'Korzár s páskou cez oko a zlatou šabľou.', '#b68b47']]) },
    { id: 'buzz', name: 'Buzz', gemCost: 46, speed: 250, maxEnergy: 130, damage: 30, shots: 1, fireRate: .4, suit: '#68a840', detail: 'Plavčík, ktorý sa vrhá do súboja', weapon: 'Záchranárske vybavenie', appearance: 'Malý zelený dinosaurus v plavkách s píšťalkou a záchranárskym kruhom.', skins: makeSkins([['godzilla', 'Godzilla Buzz', 'Gigantické monštrum s mestskými troskami.', '#6d9155'], ['director', 'Director Buzz', 'Filmový režisér s baretkou a klapkou.', '#395876']]) },
    { id: 'kit', name: 'Kit', gemCost: 50, speed: 285, maxEnergy: 100, damage: 24, shots: 2, fireRate: .3, suit: '#e8e3d8', detail: 'Mačací skokan a blízky bojovník', weapon: 'Pazúry', appearance: 'Biela kreslená mačka s veľkými očami v štýle starých animákov.', skins: makeSkins([['billy', 'Billy the Kit', 'Kovbojská mačka s klobúkom a šatkou.', '#ad7748']]) },
    { id: 'sprout', name: 'Sprout', gemCost: 44, speed: 220, maxEnergy: 110, damage: 29, shots: 1, fireRate: .5, suit: '#5eaf74', detail: 'Robotický kvetináč ovládajúci terén', weapon: 'Semienka', appearance: 'Malý robotický kvetináč so sklenenou guľou a rastlinkou.', skins: makeSkins([['lunar', 'Lunar Sprout', 'Mesačné vozítko s astronautskou prilbou.', '#8b90c7'], ['corrupted', 'Corrupted Sprout', 'Infikovaný robot s fialovými kryštálmi.', '#8350a8']]) },
    { id: 'amber', name: 'Amber', gemCost: 46, speed: 260, maxEnergy: 100, damage: 25, shots: 1, fireRate: .14, suit: '#f08438', detail: 'Ohnivá umelkyňa s nepretržitým útokom', weapon: 'Ohnivá fakľa', appearance: 'Temperamentná mexická hltačka ohňa s oranžovými vlasmi a fakľou.', skins: makeSkins([['frost_queen', 'Frost Queen Amber', 'Ľadová kráľovná so snehovými útokmi.', '#84d8ef'], ['de_la_vega', 'De la Vega Amber', 'Šermiarsky vzhľad s čiernou maskou a klobúkom.', '#37313e']]) },
    { id: 'kenji', name: 'Kenji', gemCost: 54, speed: 280, maxEnergy: 115, damage: 36, shots: 2, fireRate: .32, suit: '#a85f54', detail: 'Samuraj s rýchlym výpadom a sekom', weapon: 'Kuchársky nôž', appearance: 'Charizmatický samuraj so sivým copom a tradičným kimonóm.', skins: makeSkins([['oni', 'Oni Kenji', 'Démonická maska a modrý plameň.', '#c33955']]) },
    { id: 'melodie', name: 'Melodie', gemCost: 54, speed: 270, maxEnergy: 105, damage: 25, shots: 1, fireRate: .3, suit: '#ad71d2', detail: 'Speváčka obklopená útočnými notami', weapon: 'Magické noty', appearance: 'K-popová speváčka s modrofialovými vlasmi a žiariacimi slúchadlami.', skins: makeSkins([['harajuku', 'Harajuku Melodie', 'Pastelový outfit s notami v tvare mačiek.', '#ed91c9']]) },
    { id: 'stu', name: 'Stu', gemCost: 46, speed: 310, maxEnergy: 95, damage: 25, shots: 1, fireRate: .3, suit: '#9268b4', detail: 'Jednooký kaskadér na jednej pneumatike', weapon: 'Iskry a nárazy', appearance: 'Robotický kaskadér v prilbe a fialovej kombinéze.', skins: makeSkins([['headless_rider', 'Headless Rider Stu', 'Bezhlavý jazdec s modrým plameňom.', '#4b82d4'], ['jerschke', 'Jerschke Stu', 'Profesionálny pretekársky vzhľad.', '#d34a43']]) },
    { id: 'bibi', name: 'Bibi', gemCost: 42, speed: 250, maxEnergy: 130, damage: 42, shots: 1, fireRate: .45, suit: '#4d4651', detail: 'Rockabilly bojovníčka s bejzbalovou pálkou', weapon: 'Bejzbalová pálka', appearance: 'Drsné rockabilly dievča v koženej bunde s pálkou Mr. Bat.', skins: makeSkins([['heroine', 'Heroine Bibi', 'Kyberpunkové neóny a svetelná pálka.', '#9b5bcc'], ['thor', 'Thor Bibi', 'Severská bohyňa hromu s kladivom.', '#6b9fce']]) },
    { id: 'chester', name: 'Chester', gemCost: 48, speed: 245, maxEnergy: 105, damage: 30, shots: 2, fireRate: .4, suit: '#d75d91', detail: 'Nepredvídateľný dvorný šašo', weapon: 'Výbušné prekvapenia', appearance: 'Rozstrapatený šašo s ružovými vlasmi, rolničkami a pestrým kostýmom.', skins: makeSkins([['loki', 'Loki Chester', 'Zeleno-zlatý asgardský kostým s rohmi.', '#649257']]) },
    { id: 'grom', name: 'Grom', gemCost: 42, speed: 210, maxEnergy: 130, damage: 42, shots: 1, fireRate: .68, suit: '#b14958', detail: 'Hradný strážca vrhajúci výbušniny', weapon: 'Výbušná bomba', appearance: 'Mohutný strážca v červenej mikine s kapucňou v tvare veže.', skins: makeSkins([['frankengrom', 'Frankengrom', 'Zošité monštrum s elektródami na krku.', '#748a65']]) }
  ];
  const stardropRarities = [
    { name: 'OBYČAJNÝ', chance: 48, characterChance: 0, minCoins: 55, maxCoins: 85, color: '#a5b5b7' },
    { name: 'VZÁCNY', chance: 27, characterChance: .35, minCoins: 80, maxCoins: 120, color: colors.cyan },
    { name: 'SUPER VZÁCNY', chance: 14, characterChance: .55, minCoins: 120, maxCoins: 170, color: colors.yellow },
    { name: 'EPICKÝ', chance: 7, characterChance: .7, minCoins: 170, maxCoins: 240, color: '#b9a7ff' },
    { name: 'MÝTICKÝ', chance: 3, characterChance: .85, minCoins: 240, maxCoins: 350, color: colors.pink },
    { name: 'LEGENDÁRNY', chance: 1, characterChance: 1, minCoins: 350, maxCoins: 500, color: '#ffb347' }
  ];
  function getCharacter() {
    const character = characters.find(item => item.id === selectedCharacterId) || characters[0];
    const equippedSkin = character.skins?.find(skin => skin.id === equippedSkins[character.id]);
    return equippedSkin ? { ...character, suit: equippedSkin.suit, equippedSkin } : character;
  }
  function getUpgradeLevel(id) { return Math.max(0, Number(characterUpgrades[id] || 0)); }
  function getUpgradeCost(id) { return 3 + getUpgradeLevel(id) * 4; }
  function getUpgradedCharacter(character) { const level = getUpgradeLevel(character.id); return { ...character, level, speed: character.speed + level * 8, maxEnergy: character.maxEnergy + level * 5, damage: character.damage + level * 3, fireRate: Math.max(.12, character.fireRate - level * .025) }; }
  function persistGarage() { storage.set(selectedCharacterKey, selectedCharacterId); storage.set(ownedCharactersKey, JSON.stringify(ownedCharacters)); storage.set(characterUpgradesKey, JSON.stringify(characterUpgrades)); storage.set(equippedSkinsKey, JSON.stringify(equippedSkins)); }
  function redeemRewardCode() {
    const code = rewardCode.value.trim().toUpperCase();
    const rewards = { DRIFT2026: { coins: 100, gems: 2, text: '+100 coinov a +2 drahokamy' }, NINJA: { coins: 40, gems: 1, text: '+40 coinov a +1 drahokam' }, GOAL: { coins: 180, gems: 0, text: '+180 coinov' } };
    if (!code) { codeMessage.textContent = 'Najprv zadaj kód.'; return; }
    if (!rewards[code]) { codeMessage.textContent = 'Tento kód nepoznám.'; return; }
    if (redeemedCodes.includes(code)) { codeMessage.textContent = 'Tento kód už bol použitý.'; return; }
    const reward = rewards[code]; coins += reward.coins; gems += reward.gems; redeemedCodes.push(code); storage.set(coinsKey, coins); storage.set(gemsKey, gems); storage.set(redeemedCodesKey, JSON.stringify(redeemedCodes)); coinsEl.textContent = coins; gemsEl.textContent = gems; shopGemsEl.textContent = gems; rewardCode.value = ''; codeMessage.textContent = `ODMENA ZÍSKANÁ: ${reward.text}`;
  }
  function renderShop() {
    shopGemsEl.textContent = gems;
    const selected = getUpgradedCharacter(getCharacter());
    const upgradeCost = getUpgradeCost(selected.id);
    characterPreview.innerHTML = `<div class="preview-visual"><span class="character-visual ${selected.style || ''}" style="--suit:${selected.suit}"><i></i><b></b></span></div><div class="preview-info"><span class="eyebrow">AKTÍVNA POSTAVA</span><strong>${escapeHtml(selected.name)} <small>LVL ${selected.level}</small></strong><p>${escapeHtml(selected.equippedSkin?.name || selected.detail)}</p><div class="preview-stats"><span>ŽIVOTY <i style="--value:${Math.min(100, selected.maxEnergy / 2)}%"><b>${selected.maxEnergy}</b></i></span><span>DMG <i style="--value:${Math.min(100, selected.damage)}%"><b>${selected.damage}</b></i></span><span>RÝCHLOSŤ <i style="--value:${Math.min(100, selected.speed / 3.5)}%"><b>${selected.speed}</b></i></span></div><button class="preview-upgrade" data-preview-upgrade="${selected.id}" type="button">VYLEPŠIŤ ZA ${upgradeCost} ◆</button></div>`;
    characterShop.innerHTML = characters.map(character => {
      const owned = ownedCharacters.includes(character.id);
      const active = character.id === selectedCharacterId;
      const action = active ? 'VYBRANÁ' : owned ? 'VYBRAŤ' : `${character.gemCost} DRAHOKAMOV`;
      const level = getUpgradeLevel(character.id); const upgrade = owned ? `<button class="upgrade-action" data-upgrade="${character.id}" type="button">+ LVL ${level + 1} / ${getUpgradeCost(character.id)} ◆</button>` : '';
      const cardSuit = active ? selected.suit : character.suit;
      const equippedSkinName = active ? selected.equippedSkin?.name : '';
      return `<div class="character-card${active ? ' active' : ''}" data-card-character="${character.id}"><span class="character-visual ${character.style || ''}" style="--suit:${cardSuit}"><i></i><b></b></span><div class="character-info"><strong>${escapeHtml(character.name)} <small class="character-level">LVL ${level}</small></strong><small>${escapeHtml(equippedSkinName || character.detail)}</small><small>${attackStyleFor(character)} / ${escapeHtml(character.weapon)} / ${character.maxEnergy + level * 5} ŽIV / ${character.damage + level * 3} DMG</small></div><div class="character-actions"><button class="character-action" data-character="${character.id}" type="button">${action}</button>${upgrade}</div></div>`;
    }).join('');
    characterShop.querySelectorAll('.character-action').forEach(button => button.addEventListener('click', () => chooseCharacter(button.dataset.character)));
    characterShop.querySelectorAll('.upgrade-action').forEach(button => button.addEventListener('click', () => upgradeCharacter(button.dataset.upgrade)));
    characterShop.querySelectorAll('.character-card').forEach(card => card.addEventListener('click', event => { if (!event.target.closest('button')) chooseCharacter(card.dataset.cardCharacter); }));
    characterPreview.querySelector('.preview-upgrade').addEventListener('click', () => upgradeCharacter(selected.id));
    renderAchievements();
    renderBrawlerHub();
    renderSystemHub();
  }
  function chooseCharacter(id) {
    const character = characters.find(item => item.id === id);
    if (!character) return;
    if (!ownedCharacters.includes(id)) {
      if (gems < character.gemCost) { shopMessage.textContent = `Potrebuješ ešte ${character.gemCost - gems} drahokamov.`; return; }
      gems -= character.gemCost; ownedCharacters.push(id); storage.set(gemsKey, gems); gemsEl.textContent = gems; shopGemsEl.textContent = gems;
      shopMessage.textContent = `${character.name} odomknutý.`;
    }
    selectedCharacterId = id; persistGarage(); renderShop();
  }
  function upgradeCharacter(id) {
    if (!ownedCharacters.includes(id)) return;
    const cost = getUpgradeCost(id);
    if (gems < cost) { shopMessage.textContent = `Na vylepšenie potrebuješ ešte ${cost - gems} drahokamov.`; return; }
    gems -= cost; characterUpgrades[id] = getUpgradeLevel(id) + 1; storage.set(gemsKey, gems); gemsEl.textContent = gems; shopMessage.textContent = `${characters.find(character => character.id === id).name} vylepšený na LVL ${characterUpgrades[id]}.`; persistGarage(); renderShop();
  }
  function renderMatchOptions() {
    modePicker.querySelectorAll('.option-button').forEach(button => button.classList.toggle('active', button.dataset.mode === selectedMode));
    const customMapButton = mapPicker.querySelector('[data-map="custom"]');
    customMapButton.disabled = !hasCustomMap;
    mapPicker.querySelectorAll('.option-button').forEach(button => button.classList.toggle('active', button.dataset.map === 'duel' ? selectedMode === 'duel' : selectedMode !== 'duel' && button.dataset.map === selectedMap));
    duelPicker.hidden = selectedMode !== 'duel';
    startScreen.classList.toggle('duel-mode', selectedMode === 'duel');
    const available = ownedCharacters.length ? ownedCharacters : ['rookie'];
    duelSlots.forEach((slot, index) => { slot.innerHTML = available.map(id => { const character = characters.find(item => item.id === id); return `<option value="${id}">${character ? character.name : id}</option>`; }).join(''); slot.value = available.includes(duelRoster[index]) ? duelRoster[index] : available[0]; duelRoster[index] = slot.value; });
    matchHint.textContent = `${selectedMode === 'solo' ? '1v1' : selectedMode === 'trio' ? '3v3' : selectedMode === 'duel' ? '3 kolá s vlastnými postavami' : '2v2'} na mape ${getMapName().toLowerCase()}.`;
  }
  function getMapName() { return { neon: 'NEÓNOVÝ DVOR', crossfire: 'PRESTRELKA', ruins: 'RUINY', moon: 'LUNÁRNE MESTO', volcano: 'VULKANICKÁ ZÓNA', circuit: 'NEÓNOVÝ OKRUH', football: 'FUTBAL', custom: customMapName, random: 'NÁHODNÁ MAPA' }[selectedMap] || 'NEÓNOVÝ DVOR'; }
  function isFootballMap() { return selectedMap === 'football' || selectedMap === 'custom' && customMapMode === 'football'; }
  function chooseMode(mode) { knockoutActive = false; selectedMode = mode; storage.set(selectedModeKey, mode); renderMatchOptions(); }
  function chooseMap(map) { knockoutActive = false; if (map === 'custom' && !hasCustomMap) return; if (map === 'duel') { selectedMode = 'duel'; storage.set(selectedModeKey, selectedMode); } else { if (selectedMode === 'duel') { selectedMode = 'duo'; storage.set(selectedModeKey, selectedMode); } selectedMap = map; showdownActive = map === 'custom' && customMapMode === 'showdown'; if (map === 'custom') selectedMode = customMapMode === 'showdown' ? 'solo' : 'trio'; storage.set(selectedModeKey, selectedMode); storage.set(selectedMapKey, map); } renderMatchOptions(); }
  function chooseRandomMap() { knockoutActive = false; selectedMap = playableMaps[Math.floor(Math.random() * playableMaps.length)]; storage.set(selectedMapKey, selectedMap); renderMatchOptions(); matchHint.textContent = `NÁHODNE VYBRANÁ MAPA: ${getMapName()}.`; }
  function openStardrop() {
    let roll = Math.random() * 100; const rarity = stardropRarities.find(item => { roll -= item.chance; return roll <= 0; }) || stardropRarities[0];
    stardropRarity.textContent = rarity.name; stardropRarity.style.color = rarity.color;
    const locked = characters.filter(character => !ownedCharacters.includes(character.id));
    if (locked.length && Math.random() < rarity.characterChance) { const reward = locked[Math.floor(Math.random() * locked.length)]; ownedCharacters.push(reward.id); selectedCharacterId = reward.id; persistGarage(); stardropReward.textContent = `NOVÁ POSTAVA: ${reward.name}`; return `Stardrop ${rarity.name.toLowerCase()}: získal si ${reward.name}.`; }
    const rewardCoins = rarity.minCoins + Math.floor(Math.random() * (rarity.maxCoins - rarity.minCoins + 1)); coins += rewardCoins; storage.set(coinsKey, coins); coinsEl.textContent = coins; stardropReward.textContent = `+${rewardCoins} COINOV`; return `Stardrop ${rarity.name.toLowerCase()}: získal si ${rewardCoins} coinov.`;
  }
  const random = (min, max) => Math.random() * (max - min) + min;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  function readGamepad() { const pad = navigator.getGamepads ? [...navigator.getGamepads()].find(item => item) : null; if (!pad) return { x: 0, y: 0, aimX: 0, aimY: 0, fire: false }; return { x: Math.abs(pad.axes[0] || 0) > .18 ? pad.axes[0] : 0, y: Math.abs(pad.axes[1] || 0) > .18 ? pad.axes[1] : 0, aimX: Math.abs(pad.axes[2] || 0) > .2 ? pad.axes[2] : 0, aimY: Math.abs(pad.axes[3] || 0) > .2 ? pad.axes[3] : 0, fire: Boolean(pad.buttons[0] && pad.buttons[0].pressed) }; }

  function resize() {
    const rect = arena.getBoundingClientRect();
    const cores = navigator.hardwareConcurrency || 4; const memory = navigator.deviceMemory || 4; const autoQuality = cores <= 4 || memory <= 4 ? .75 : cores <= 8 ? 1 : 1.25; const qualityScale = settings.quality === 'low' ? .75 : settings.quality === 'medium' ? 1 : settings.quality === 'high' ? 1.25 : autoQuality; const resolutionScale = settings.resolution === 'auto' ? 1 : Number(settings.resolution);
    dpr = Math.min((window.devicePixelRatio || 1) * qualityScale * resolutionScale, 2);
    width = rect.width; height = rect.height;
    updateWorldSize();
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    coverBlocks = mapLayouts[selectedMap].map(block => ({ ...block, x: worldWidth * block.x, y: worldHeight * block.y, width: worldWidth * block.width, height: worldHeight * block.height }));
    [player, ...allies, ...enemies].filter(Boolean).forEach(fighter => {
      fighter.x = clamp(fighter.x, 25, worldWidth - 25);
      fighter.y = clamp(fighter.y, 25, worldHeight - 25);
    });
  }
  function updateWorldSize() {
    worldWidth = selectedMap === 'custom' ? width : width * 3;
    worldHeight = selectedMap === 'custom' ? height : height * 2.4;
  }

  function customSpawn(type, index, fallbackX, fallbackY) {
    const spawns = customMapCells.filter(cell => cell.type === type);
    if (selectedMap !== 'custom' || !spawns.length) return { x: worldWidth * fallbackX, y: worldHeight * fallbackY };
    const spawn = spawns[index % spawns.length];
    const angle = index * Math.PI * 2 / 3;
    return { x: worldWidth * (spawn.x + .5) / mapEditorColumns + (spawns.length === 1 ? Math.cos(angle) * 28 : 0), y: worldHeight * (spawn.y + .5) / mapEditorRows + (spawns.length === 1 ? Math.sin(angle) * 28 : 0) };
  }
  function reset() {
    let character = getUpgradedCharacter(getCharacter());
    duelIndex = 0;
    const teamSize = selectedMode === 'solo' || selectedMode === 'duel' ? 1 : selectedMode === 'trio' ? 3 : 2;
    const teamY = teamSize === 1 ? [.5] : teamSize === 2 ? [.38, .62] : [.3, .5, .7];
    if (selectedMode === 'duel') character = getUpgradedCharacter(characters.find(item => item.id === duelRoster[0]) || character);
    const playerSpawn = customSpawn('spawn_blue', 0, .2, teamY[Math.floor(teamSize / 2)]);
    player = makeFighter(playerSpawn.x, playerSpawn.y, 'blue', character.suit, 'TY', character.speed, character.maxEnergy, true, character);
    const roundRespawns = knockoutActive ? 0 : 3;
    player.respawnsLeft = isFootballMap() ? 99 : selectedMode === 'duel' || knockoutActive ? 0 : roundRespawns; player.respawnTimer = 0; player.duelIndex = 0;
    const botProfiles = characters.filter(bot => bot.id !== 'rookie');
    allies = teamY.filter((y, index) => index !== Math.floor(teamSize / 2)).map((y, index) => { const bot = botProfiles[index % botProfiles.length]; const spawn = customSpawn('spawn_blue', index + 1, .14 + index * .12, y); const fighter = makeFighter(spawn.x, spawn.y, 'blue', bot.suit, 'SPOJENEC', bot.speed, bot.maxEnergy, false, bot); fighter.respawnsLeft = isFootballMap() ? 99 : roundRespawns; return fighter; });
    const enemyCount = showdownActive ? 8 : teamSize;
    enemies = Array.from({ length: enemyCount }, (_, index) => { const bot = botProfiles[(index + 2) % botProfiles.length]; const edgeY = enemyCount === 1 ? .5 : .12 + index / (enemyCount - 1) * .76; const team = showdownActive ? `enemy-${selectedMode === 'duo' ? Math.floor(index / 2) : index}` : 'red'; const spawn = customSpawn('spawn_red', index, .76 + index % 3 * .035, edgeY); const fighter = makeFighter(spawn.x, spawn.y, team, bot.suit, 'SÚPER', bot.speed, bot.maxEnergy, false, bot); fighter.respawnsLeft = isFootballMap() ? 99 : roundRespawns; return fighter; });
    bullets = []; shards = []; particles = []; coverBlocks = mapLayouts[selectedMap].map(block => ({ ...block, x: worldWidth * block.x, y: worldHeight * block.y, width: worldWidth * block.width, height: worldHeight * block.height }));
    const ballSpawn = footballStartPosition();
    footballBall = isFootballMap() ? { ...ballSpawn, radius: 8, carrier: null } : null;
    if (selectedMap !== 'custom' && !isFootballMap()) spawnMapPowerBoxes();
    footballScore = { blue: 0, red: 0 }; footballTime = 60; footballOvertime = false; knockoutWins = { blue: 0, red: 0 }; screenFlash = 0; goalPulse = 0; damageFlash = 0;
    powerCubes = []; showdownRadius = Math.hypot(worldWidth, worldHeight) * .5;
    if (showdownActive) {
      const boxCells = selectedMap === 'custom' ? customMapCells.filter(cell => cell.type === 'box') : [];
      if (!boxCells.length) for (let cube = 0; cube < 7; cube++) spawnPowerCube();
    }
    score = 0; energy = character.maxEnergy; combo = 1; comboTimer = 0; elapsed = 0; spawnTimer = 0; shardTimer = 0;
    ammo = 3; reloadTimer = 0; superCharge = 0; gadgetCooldown = 0; hyperActive = 0; joystick = { x: 0, y: 0, active: false }; joystickKnob.style.transform = '';
    updateHud();
  }

  function attackTypeFor(profile) { return profile.attackType || (['barley', 'tick', 'dynamike', 'grom', 'chester', 'moe'].includes(profile.id) ? 'throw' : 'shot'); }
  function attackStyleFor(profile) { return attackTypeFor(profile) === 'throw' ? 'HÁDŽE PLOŠNÝ ÚTOK' : 'PRIAMY ÚTOK'; }
  function makeFighter(x, y, team, suit, label, speed, maxEnergy, controlled = false, profile = {}) { return { x, y, team, suit, label, displayName: profile.name || label, speed, maxEnergy, hp: maxEnergy, radius: 13, angle: 0, cooldown: random(.1, .8), recoil: 0, controlled, characterId: profile.id || 'rookie', attackType: attackTypeFor(profile), style: profile.style || '', walkPhase: random(0, Math.PI * 2), stuckTime: 0, respawnsLeft: 0, respawnTimer: 0, damage: profile.damage || 18, shots: profile.shots || 1, fireRate: profile.fireRate || .7, footballRole: 'útočník', footballKickCooldown: 0, aiPhase: random(0, Math.PI * 2), slowTime: 0, stunTime: 0, poisonTime: 0, shield: 0, teleportCooldown: 0, jumpCooldown: 0 }; }
  function applyStatus(target, status, duration = 1) { if (!target || target.hp <= 0) return; if (status === 'slow') target.slowTime = Math.max(target.slowTime, duration); if (status === 'stun') target.stunTime = Math.max(target.stunTime, duration); if (status === 'poison') target.poisonTime = Math.max(target.poisonTime, duration); if (status === 'shield') target.shield = Math.min(60, target.shield + 30); }

  function setShopVisible(visible) { shopPanel.hidden = !visible; shopToggle.hidden = false; shopToggle.textContent = visible ? 'SKRYŤ OBCHOD' : 'ZOBRAZIŤ OBCHOD'; shopToggle.setAttribute('aria-expanded', String(visible)); }
  function setPanelVisible(visible) { sidePanel.hidden = !visible; panelToggle.setAttribute('aria-expanded', String(visible)); document.body.classList.toggle('panel-open', visible); if (!visible) document.body.classList.remove('map-maker-open'); }
  function setPanelItem(item, visible) { item.classList.toggle('panel-item-hidden', !visible); }
  function setPanelView(section) {
    const showHub = ['brawlers', 'events', 'profile', 'modes', 'maps', 'rewards', 'settings'].includes(section);
    const showHubTabs = ['brawlers', 'events'].includes(section);
    const showSystemTabs = ['profile', 'friends', 'club', 'modes', 'maps', 'mapmaker', 'rewards', 'ranked', 'buffies', 'settings'].includes(section);
    const showShop = section === 'shop';
    const showSettings = section === 'settings';
    setPanelItem(brawlerProfile, section === 'brawlers');
    setPanelItem(hubContent, showHub && showHubTabs);
    setPanelItem(document.querySelector('.hub-heading'), showHubTabs);
    setPanelItem(document.querySelector('.hub-tabs'), showHubTabs);
    setPanelItem(document.querySelector('.system-tabs'), showSystemTabs);
    setPanelItem(systemContent, showSystemTabs);
    setPanelItem(playerNameInput.closest('.player-name-field'), section === 'profile' || section === 'settings');
    setPanelItem(settingsToggle, showSettings);
    setPanelItem(settingsPanel, showSettings);
    setPanelItem(document.querySelector('.control-list'), showSettings);
    setPanelItem(document.querySelector('.tip'), showSettings);
    setPanelItem(shopToggle, showShop);
    setPanelItem(shopPanel, showShop);
    setPanelItem(document.querySelector('.intro-copy'), false);
    setPanelItem(sidePanel.querySelector(':scope > .eyebrow'), false);
    setPanelItem(sidePanel.querySelector(':scope > h1'), false);
  }
  function openMenuSection(section) {
    if (section === 'play') { setPanelVisible(false); if (state !== 'playing') start(); return; }
    const view = section === 'quests' || section === 'news' ? 'events' : section;
    setPanelView(view); setPanelVisible(true); sidePanel.scrollTop = 0;
    if (section === 'brawlers') renderBrawlerHub('brawlers');
    if (section === 'shop') { setShopVisible(true); sidePanel.querySelector('#shopPanel').scrollIntoView({ block: 'start' }); }
    if (section === 'pass') renderSystemHub('rewards');
    if (section === 'quests' || section === 'news') renderBrawlerHub('events');
    if (section === 'ranked') { systemContent.classList.remove('panel-item-hidden'); document.querySelector('.system-tabs').classList.remove('panel-item-hidden'); renderRankedHub(); }
    if (section === 'friends' || section === 'club' || section === 'profile' || section === 'buffies') {
      document.querySelectorAll('[data-system-tab]').forEach(tabButton => tabButton.classList.toggle('active', tabButton.dataset.systemTab === section));
      renderSystemHub(section);
    }
    if (section === 'settings') { settingsPanel.hidden = false; settingsToggle.setAttribute('aria-expanded', 'true'); renderSystemHub('settings'); }
    if (section === 'mapmaker') renderSystemHub('mapmaker');
  }
  function openTrophyRoad() {
    openMenuSection('brawlers');
    document.querySelectorAll('[data-hub-tab]').forEach(button => button.classList.toggle('active', button.dataset.hubTab === 'road'));
    renderBrawlerHub('road');
  }
  function startKnockout(mode) {
    knockoutActive = true;
    showdownActive = false;
    selectedMode = mode === 'solo' ? 'solo' : 'duo';
    selectedMap = 'crossfire';
    storage.set(selectedModeKey, selectedMode);
    storage.set(selectedMapKey, selectedMap);
    setPanelVisible(false);
    start();
  }
  function start() { if (selectedMap === 'random') chooseRandomMap(); document.body.classList.toggle('custom-match-fullscreen', selectedMap === 'custom'); resize(); updateWorldSize(); reset(); state = 'playing'; matchStatus.textContent = knockoutActive ? 'KNOCKOUT / 1. KOLO' : 'ZÁPAS PREBIEHA'; matchStatus.className = 'match-status playing'; setShopVisible(false); startScreen.hidden = true; gameOverScreen.hidden = true; lastTime = performance.now(); cancelAnimationFrame(animationId); animationId = requestAnimationFrame(loop); }
  function showGamePicker() { knockoutActive = false; document.body.classList.remove('custom-match-fullscreen'); state = 'ready'; cancelAnimationFrame(animationId); gameOverScreen.hidden = true; startScreen.hidden = false; matchStatus.textContent = 'ČAKÁ NA ZÁPAS'; matchStatus.className = 'match-status'; setShopVisible(true); renderMatchOptions(); }
  function endGame(won = false) {
    state = won ? 'won' : 'ended';
    const finalScore = Math.floor(score);
    let rankedResult = '';
    if (rankedActive) {
      const expectedScore = 1 / (1 + 10 ** ((rankedOpponentMmr - rankedState.mmr) / 400));
      const actualScore = won ? 1 : 0;
      const ratingChange = Math.round(24 * (actualScore - expectedScore));
      rankedState.points = Math.max(0, rankedState.points + ratingChange);
      rankedState.mmr = Math.max(100, rankedState.mmr + ratingChange);
      rankedResult = ` / RANKED ${ratingChange >= 0 ? '+' : ''}${ratingChange} RP`;
      storage.set(rankedKey, JSON.stringify(rankedState));
      rankedActive = false;
    }
    if (won) { unlockAchievement('champion'); playTone(880, .18); }
    let trophyReward = '';
    if (won) {
      gems += 1; coins += 40; brawlerTrophies[selectedCharacterId] = trophyFor(getCharacter()) + 8; brawlerMastery[selectedCharacterId] = masteryFor(getCharacter()) + 12;
      storage.set(gemsKey, gems); storage.set(coinsKey, coins); storage.set(trophiesKey, JSON.stringify(brawlerTrophies)); storage.set(masteryKey, JSON.stringify(brawlerMastery));
      trophyReward = trophyRoadReward();
    }
    if (finalScore > best) { best = finalScore; storage.set(bestKey, best); }
    bestEl.textContent = formatScore(best);
    gemsEl.textContent = gems; coinsEl.textContent = coins; renderShop();
    resultKicker.textContent = won ? 'ZÁPAS VYHRATÝ / ODMENA' : 'SIGNÁL STRATENÝ';
    resultTitle.innerHTML = won ? 'ZÁPAS<br><span>VYHRATÝ</span>' : 'ZÁPAS<br><span>SKONČIL</span>';
    matchStatus.textContent = won ? 'VYHRAL SI' : 'PREHRAL SI'; matchStatus.className = `match-status ${won ? 'won' : 'lost'}`;
    stardrop.hidden = !won; const rewardText = won ? openStardrop() : ''; renderShop();
    finalStats.textContent = `${won ? `${rewardText}${trophyReward ? `  /  ${trophyReward}` : ''}  /  skóre ${formatScore(finalScore)}` : `Skóre ${formatScore(finalScore)}  /  čas ${formatTime(elapsed)}`}${rankedResult}`;
    gameOverScreen.hidden = false;
    setShopVisible(true);
    burst(player.x, player.y, colors.orange, 30, 170);
  }
  function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`; }

  function updateHud() {
    scoreEl.textContent = formatScore(score);
    comboEl.textContent = `${allies.filter(fighter => fighter.hp > 0).length + (player && player.hp > 0 ? 1 : 0)}v${enemies.filter(fighter => fighter.hp > 0).length}`;
    comboEl.style.color = combo > 2 ? colors.orange : colors.yellow;
    hudTrophiesEl.textContent = totalTrophyCount().toLocaleString('sk-SK');
    const playerHp = player ? Math.max(0, player.hp) : 100;
    const playerHealthPercent = player ? clamp(playerHp / player.maxEnergy * 100, 0, 100) : 100;
    energyFill.style.width = `${playerHealthPercent}%`;
    energyFill.style.background = playerHealthPercent < 28 ? colors.orange : colors.cyan;
    energyValue.textContent = `${Math.ceil(playerHp)} ŽIV`;
    energyValue.style.color = playerHealthPercent < 28 ? colors.orange : colors.cyan;
    footballHint.hidden = !isFootballMap() || state !== 'playing';
    waveLabel.textContent = knockoutActive ? `KNOCKOUT / ${knockoutWins.blue} : ${knockoutWins.red} / 2` : isFootballMap() ? `GÓLY ${footballScore.blue} : ${footballScore.red} / CIEĽ 2` : selectedMode === 'duel' ? `DUEL / POSTAVA ${Math.min(duelIndex + 1, 3)} z 3` : `${getMapName()} / ${selectedMode === 'solo' ? 'SÓLO' : selectedMode === 'trio' ? 'TRIO' : 'DUO'}`;
    timeLabel.textContent = formatTime(isFootballMap() ? footballTime : elapsed);
    ammoValue.textContent = `${ammo} / 3`; ammoFill.style.width = `${ammo / 3 * 100}%`;
    superValue.textContent = `${Math.floor(superCharge)}%`; superFill.style.width = `${superCharge}%`;
    gadgetButton.disabled = gadgetCooldown > 0; gadgetButton.innerHTML = gadgetCooldown > 0 ? `GADGET ${Math.ceil(gadgetCooldown)}s` : 'GADGET <b>Q</b>';
    hyperButton.disabled = superCharge < 100 && hyperActive <= 0; hyperButton.innerHTML = hyperActive > 0 ? `HYPER ${Math.ceil(hyperActive)}s` : 'HYPER <b>F</b>';
  }

  function spawnEnemy() {
    const edge = Math.floor(random(0, 4));
    const margin = 25;
    const x = edge === 0 ? -margin : edge === 1 ? worldWidth + margin : random(0, worldWidth);
    const y = edge === 2 ? -margin : edge === 3 ? worldHeight + margin : random(0, worldHeight);
    const type = Math.random() < Math.min(.3, elapsed / 120) ? 'hunter' : 'drifter';
    enemies.push({ x, y, type, radius: type === 'hunter' ? 8 : 6, speed: type === 'hunter' ? random(55, 78) : random(35, 58), phase: random(0, 7), angle: 0 });
  }
  function spawnShard() { const type = Math.random() < .35 ? 'coin' : 'gem'; const mine = type === 'gem' && selectedMap === 'custom' && customMapMode === 'gem' ? customGoalCenter('gem_mine') : null; shards.push({ x: mine ? mine.x : clamp(player.x + random(-width * .75, width * .75), 30, worldWidth - 30), y: mine ? mine.y : clamp(player.y + random(-height * .75, height * .75), 30, worldHeight - 30), type, radius: type === 'gem' ? 6 : 7, life: 10, spin: random(0, 7) }); }
  function spawnPowerCube() { powerCubes.push({ x: random(45, worldWidth - 45), y: random(45, worldHeight - 45), radius: 8, spin: random(0, 7) }); }
  function spawnMapPowerBoxes() {
    const boxWidth = worldWidth / mapEditorColumns * .8;
    const boxHeight = worldHeight / mapEditorRows * .8;
    let placed = 0;
    for (const y of [.22, .78]) {
      for (const x of [.34, .5, .66]) {
        const left = worldWidth * x - boxWidth / 2;
        const top = worldHeight * y - boxHeight / 2;
        const overlaps = coverBlocks.some(block => block.solid !== false && left < block.x + block.width && left + boxWidth > block.x && top < block.y + block.height && top + boxHeight > block.y);
        if (overlaps) continue;
        coverBlocks.push({ x: left, y: top, width: boxWidth, height: boxHeight, type: 'box', style: 'pillar', solid: true });
        if (++placed === 4) return;
      }
    }
  }
  function applyBulletDamage(target, bullet) {
    if (target.controlled) damageFlash = 1;
    if (footballBall && footballBall.carrier === target) { footballBall.carrier = null; footballBall.x = target.x; footballBall.y = target.y; }
    const absorbed = Math.min(target.shield, bullet.damage * .5);
    target.shield -= absorbed; target.hp -= bullet.damage - absorbed;
    if (bullet.team === 'blue') superCharge = Math.min(100, superCharge + bullet.damage * .35);
    score += bullet.team === 'blue' ? 25 : 0;
    burst(target.x, target.y, bullet.color, 7, 70);
    if (target.hp <= 0) {
      if (isFootballMap()) target.respawnTimer = 2;
      else if (!knockoutActive) {
        if (target.controlled && selectedMode === 'duel') target.respawnTimer = 2;
        else if (target.respawnsLeft > 0) { target.respawnsLeft--; target.respawnTimer = 2; }
      }
      if (bullet.team === 'blue') { unlockAchievement('first_blood'); combo = Math.min(combo + 1, 9); comboTimer = 3; if (combo >= 3) unlockAchievement('combo'); coins += 10; storage.set(coinsKey, coins); coinsEl.textContent = coins; }
      score += bullet.team === 'blue' ? 150 * combo : 0;
      burst(target.x, target.y, colors.orange, 22, 150);
    }
  }

  function burst(x, y, color, amount = 10, force = 70) {
    amount = Math.min(amount, Math.max(0, 360 - particles.length));
    for (let i = 0; i < amount; i++) { const angle = random(0, Math.PI * 2); const speed = random(force * .25, force); particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: random(.25, .7), maxLife: .7, color, size: random(1, 3) }); }
  }
  function insideBlock(x, y) { return coverBlocks.some(block => block.solid !== false && x > block.x - 2 && x < block.x + block.width + 2 && y > block.y - 2 && y < block.y + block.height + 2); }
  function blocksShots(x, y) { return coverBlocks.some(block => block.solid !== false && block.type !== 'fence' && block.type !== 'water' && x > block.x - 2 && x < block.x + block.width + 2 && y > block.y - 2 && y < block.y + block.height + 2); }
  function hasLineOfSight(from, to) {
    const steps = Math.ceil(distance(from, to) / 10);
    for (let step = 1; step < steps; step++) { const ratio = step / steps; if (blocksShots(from.x + (to.x - from.x) * ratio, from.y + (to.y - from.y) * ratio)) return false; }
    return true;
  }
  function balancedDamage(fighter) {
    const shots = fighter.attackType === 'throw' ? 1 : Math.max(1, fighter.shots);
    const fireRate = Math.max(.12, fighter.fireRate);
    return Math.min(fighter.damage, 160 * fireRate / shots);
  }
  function fire(shooter, target, ignoreCover = false) {
    if (shooter.hp <= 0 || shooter.cooldown > 0 || !target || target.hp <= 0 || (shooter.attackType !== 'throw' && !ignoreCover && !hasLineOfSight(shooter, target))) return;
    const angle = Math.atan2(target.y - shooter.y, target.x - shooter.x); shooter.angle = angle; shooter.cooldown = shooter.fireRate; shooter.recoil = .12;
    const damage = balancedDamage(shooter);
    if (shooter.attackType === 'throw') {
      const flight = clamp(distance(shooter, target) / 360, .28, .9);
      bullets.push({ kind: 'lob', x: shooter.x + Math.cos(angle) * 12, y: shooter.y + Math.sin(angle) * 12, startX: shooter.x, startY: shooter.y, targetX: target.x, targetY: target.y, progress: 0, flight, blastRadius: 30, team: shooter.team, damage, life: flight, color: shooter.team === 'blue' ? colors.orange : colors.yellow });
      return;
    }
    for (let shot = 0; shot < shooter.shots; shot++) { const spread = shooter.shots > 1 ? (shot - (shooter.shots - 1) / 2) * .12 : 0; bullets.push({ x: shooter.x + Math.cos(angle + spread) * 15, y: shooter.y + Math.sin(angle + spread) * 15, vx: Math.cos(angle + spread) * 470, vy: Math.sin(angle + spread) * 470, team: shooter.team, damage, life: 1.5, color: shooter.team === 'blue' ? colors.cyan : colors.orange }); }
  }
  function firePlayer() {
    if (player.hp <= 0 || player.cooldown > 0 || ammo <= 0) return;
    const target = pointer || nearestTarget(player, enemies);
    if (!target) return;
    const angle = Math.atan2(target.y - player.y, target.x - player.x); player.angle = angle; player.cooldown = player.fireRate; player.recoil = .12;
    const damage = balancedDamage(player) * (hyperActive > 0 ? 1.5 : 1);
    ammo = Math.max(0, ammo - 1); reloadTimer = ammo === 0 ? 1.1 : 0;
    if (player.attackType === 'throw') {
      const flight = clamp(distance(player, target) / 360, .28, .9);
      bullets.push({ kind: 'lob', x: player.x + Math.cos(angle) * 12, y: player.y + Math.sin(angle) * 12, startX: player.x, startY: player.y, targetX: target.x, targetY: target.y, progress: 0, flight, blastRadius: 30, team: 'blue', damage, life: flight, color: player.suit });
      playTone(280);
      burst(player.x + Math.cos(angle) * 14, player.y + Math.sin(angle) * 14, player.suit, 4, 45);
      return;
    }
    for (let shot = 0; shot < player.shots; shot++) { const spread = player.shots > 1 ? (shot - (player.shots - 1) / 2) * .12 : 0; bullets.push({ x: player.x + Math.cos(angle + spread) * 15, y: player.y + Math.sin(angle + spread) * 15, vx: Math.cos(angle + spread) * 470, vy: Math.sin(angle + spread) * 470, team: 'blue', damage, life: 1.5, color: player.suit }); }
    playTone(440 + player.shots * 35);
    burst(player.x + Math.cos(angle) * 14, player.y + Math.sin(angle) * 14, player.suit, 4, 45);
  }
  function nearestTarget(fighter, targets) {
    let nearest = null;
    let nearestDistance = Infinity;
    for (const target of targets) {
      if (target.hp <= 0) continue;
      const targetDistance = distance(fighter, target);
      if (targetDistance < nearestDistance) {
        nearest = target;
        nearestDistance = targetDistance;
      }
    }
    return nearest;
  }
  function useGadget() { if (state !== 'playing' || !player || player.hp <= 0 || gadgetCooldown > 0) return; moveSafely(player, Math.cos(player.angle) * player.speed * 1.5, Math.sin(player.angle) * player.speed * 1.5, .45, [player, ...allies]); applyStatus(player, 'shield'); gadgetCooldown = 8; burst(player.x, player.y, colors.yellow, 14, 110); }
  function useHypercharge() { if (state !== 'playing' || superCharge < 100 || hyperActive > 0) return; superCharge = 0; hyperActive = 6; burst(player.x, player.y, colors.pink, 28, 150); }
  function moveSafely(fighter, dx, dy, dt, teammates = []) {
    if (selectedMap === 'custom') {
      const tile = coverBlocks.find(block => (block.type === 'speed' || block.type === 'slow') && fighter.x >= block.x && fighter.x <= block.x + block.width && fighter.y >= block.y && fighter.y <= block.y + block.height);
      if (tile) { const multiplier = tile.type === 'speed' ? 1.5 : .55; dx *= multiplier; dy *= multiplier; }
    }
    const occupied = (x, y) => insideBlock(x, y) || teammates.some(teammate => teammate !== fighter && teammate.hp > 0 && Math.hypot(x - teammate.x, y - teammate.y) < 34);
    const stepX = dx * dt; const stepY = dy * dt;
    const candidates = [[stepX, stepY], [stepX, 0], [0, stepY], [-stepY, stepX], [stepY, -stepX], [-stepX, -stepY]];
    for (const [offsetX, offsetY] of candidates) {
      const nextX = clamp(fighter.x + offsetX, 18, worldWidth - 18); const nextY = clamp(fighter.y + offsetY, 18, worldHeight - 18);
      if ((offsetX || offsetY) && !occupied(nextX, nextY)) { fighter.x = nextX; fighter.y = nextY; return true; }
    }
    const nearbyBlock = coverBlocks.find(block => fighter.x > block.x - 28 && fighter.x < block.x + block.width + 28 && fighter.y > block.y - 28 && fighter.y < block.y + block.height + 28);
    if (nearbyBlock) {
      const pushX = fighter.x < nearbyBlock.x + nearbyBlock.width / 2 ? -1 : 1;
      const pushY = fighter.y < nearbyBlock.y + nearbyBlock.height / 2 ? -1 : 1;
      fighter.x = clamp(fighter.x + pushX * 3, 18, worldWidth - 18); fighter.y = clamp(fighter.y + pushY * 3, 18, worldHeight - 18);
    }
    return false;
  }
  function applyCustomMapMechanics(dt) {
    if (selectedMap !== 'custom') return;
    const fighters = [player, ...allies, ...enemies].filter(fighter => fighter && fighter.hp > 0);
    const teleports = coverBlocks.filter(block => block.type === 'teleport');
    fighters.forEach(fighter => {
      fighter.jumpCooldown = Math.max(0, fighter.jumpCooldown - dt);
      const tile = coverBlocks.find(block => fighter.x >= block.x && fighter.x <= block.x + block.width && fighter.y >= block.y && fighter.y <= block.y + block.height);
      if (tile?.type === 'teleport' && fighter.teleportCooldown === 0 && teleports.length > 1) {
        const destination = teleports[(teleports.indexOf(tile) + 1) % teleports.length];
        fighter.x = destination.x + destination.width / 2;
        fighter.y = destination.y + destination.height / 2;
        fighter.teleportCooldown = 1;
        burst(fighter.x, fighter.y, colors.pink, 10, 70);
      } else if (tile?.type !== 'teleport') fighter.teleportCooldown = 0;
      if (tile?.type === 'jump' && fighter.jumpCooldown === 0) {
        const distance = Math.min(worldWidth / mapEditorColumns, worldHeight / mapEditorRows) * 2.5;
        const landingX = clamp(fighter.x + Math.cos(fighter.angle) * distance, 18, worldWidth - 18);
        const landingY = clamp(fighter.y + Math.sin(fighter.angle) * distance, 18, worldHeight - 18);
        if (!insideBlock(landingX, landingY)) { fighter.x = landingX; fighter.y = landingY; }
        fighter.jumpCooldown = 1.2;
        burst(fighter.x, fighter.y, colors.cyan, 10, 80);
      }
      if (tile?.type === 'spikes' && Math.floor(elapsed * 2) % 4 === 0) {
        fighter.hp = Math.max(0, fighter.hp - dt * 30);
        if (fighter.controlled) damageFlash = 1;
      }
    });
  }
  function moveFighter(fighter, target, dt) {
    if (!target || fighter.hp <= 0 || fighter.stunTime > 0) return;
    const angle = Math.atan2(target.y - fighter.y, target.x - fighter.x); fighter.angle = angle;
    const targetDistance = distance(fighter, target); const blocked = !hasLineOfSight(fighter, target);
    const footballCarrier = footballBall && footballBall.carrier === fighter;
    if (isFootballMap() && footballCarrier) {
      moveSafely(fighter, Math.cos(angle) * fighter.speed * 1.15, Math.sin(angle) * fighter.speed * 1.15, dt, fighter.team === 'blue' ? [player, ...allies] : enemies);
      return;
    }
    const preferredDistance = isFootballMap() ? 105 : 165;
    const shouldAdvance = targetDistance > preferredDistance || blocked;
    const direction = fighter.stuckTime > .7 ? (Math.floor(fighter.stuckTime / .45) % 2 ? 1 : -1) : Math.sin(elapsed * 1.3 + fighter.aiPhase) > 0 ? 1 : -1;
    const strafe = Math.sin(elapsed * 2.8 + fighter.aiPhase) * fighter.speed * .48;
    const moveAngle = blocked ? angle + direction * Math.PI / 2 : shouldAdvance ? angle : angle + direction * Math.PI / 2;
    const moveSpeed = (shouldAdvance ? fighter.speed * 1.08 : Math.max(Math.abs(strafe), fighter.speed * .28)) * (fighter.slowTime > 0 ? .45 : 1);
    const moved = moveSafely(fighter, Math.cos(moveAngle) * moveSpeed, Math.sin(moveAngle) * moveSpeed, dt, fighter.team === 'blue' ? [player, ...allies] : enemies);
    fighter.stuckTime = moved ? 0 : fighter.stuckTime + dt;
  }
  function getCamera() {
    const zoom = 1;
    return {
      x: clamp(player ? player.x : worldWidth / 2, width / (2 * zoom), worldWidth - width / (2 * zoom)),
      y: clamp(player ? player.y : worldHeight / 2, height / (2 * zoom), worldHeight - height / (2 * zoom)),
      zoom
    };
  }
  function footballTarget(fighter, opponents) {
    if (!footballBall) return nearestTarget(fighter, opponents);
    if (footballBall.carrier === fighter) return footballGoalCenter(fighter.team);
    if (!footballBall.carrier) return footballBall;
    if (footballBall.carrier.team === fighter.team) {
      const carrier = footballBall.carrier;
      const goal = footballGoalCenter(fighter.team);
      return { x: carrier.x + (goal.x - carrier.x) * .35, y: carrier.y + Math.sin(elapsed * 2 + fighter.aiPhase) * 42 };
    }
    if (footballBall.carrier.team !== fighter.team) return footballBall.carrier;
    return nearestTarget(fighter, opponents);
  }
  function moveFootballAI(fighter, teammates, dt) {
    if (!footballBall || fighter.hp <= 0 || fighter.stunTime > 0) return;
    const direction = fighter.team === 'blue' ? 1 : -1;
    const carrier = footballBall.carrier;
    const activeTeammates = teammates.filter(teammate => teammate.hp > 0);
    const activeBots = activeTeammates.filter(teammate => !teammate.controlled);
    let target;
    let stopDistance = 12;

    if (!carrier) {
      const chaser = activeBots.reduce((closest, teammate) => (
        !closest || distance(teammate, footballBall) < distance(closest, footballBall) ? teammate : closest
      ), null);
      if (chaser === fighter) {
        target = footballBall;
      } else {
        const lane = activeTeammates.indexOf(fighter) % 2 === 0 ? -1 : 1;
        target = {
          x: clamp(footballBall.x + direction * 72, worldWidth * .12, worldWidth * .88),
          y: clamp(footballBall.y + lane * 65, worldHeight * .12, worldHeight * .88)
        };
        stopDistance = 30;
      }
    } else if (carrier.team === fighter.team) {
      if (carrier === fighter) {
        target = footballGoalCenter(fighter.team);
      } else {
        const lane = activeTeammates.indexOf(fighter) % 2 === 0 ? -1 : 1;
        target = {
          x: clamp(carrier.x + direction * 92, worldWidth * .12, worldWidth * .88),
          y: clamp(carrier.y + lane * 76, worldHeight * .12, worldHeight * .88)
        };
        stopDistance = 30;
      }
    } else {
      const chaser = activeBots.reduce((closest, teammate) => (
        !closest || distance(teammate, carrier) < distance(closest, carrier) ? teammate : closest
      ), null);
      if (chaser === fighter) {
        target = carrier;
        stopDistance = 20;
      } else {
        target = {
          x: clamp(carrier.x - direction * 68, worldWidth * .12, worldWidth * .88),
          y: clamp(carrier.y + (fighter.y < carrier.y ? -1 : 1) * 54, worldHeight * .12, worldHeight * .88)
        };
        stopDistance = 28;
      }
    }

    const dx = target.x - fighter.x;
    const dy = target.y - fighter.y;
    const targetDistance = Math.hypot(dx, dy);
    fighter.angle = Math.atan2(dy, dx);
    if (targetDistance <= stopDistance) return;
    const speed = fighter.speed * (fighter.slowTime > 0 ? .45 : 1);
    const moved = moveSafely(fighter, dx / targetDistance * speed, dy / targetDistance * speed, dt, activeTeammates);
    fighter.stuckTime = moved ? 0 : fighter.stuckTime + dt;
  }
  function resetFootballAfterGoal() {
    footballBall = { ...footballStartPosition(), radius: 8, carrier: null };
    bullets = []; particles = [];
    const playerSpawn = customSpawn('spawn_blue', 0, .2, .5);
    player.x = playerSpawn.x; player.y = playerSpawn.y;
    allies.forEach((fighter, index) => { const spawn = customSpawn('spawn_blue', index + 1, .14 + index * .12, [.38, .62][index] || .5); fighter.x = spawn.x; fighter.y = spawn.y; fighter.hp = fighter.maxEnergy; fighter.respawnTimer = 0; });
    enemies.forEach((fighter, index) => { const spawn = customSpawn('spawn_red', index, .78 + index % 3 * .035, .5 + (index - (enemies.length - 1) / 2) * .1); fighter.x = spawn.x; fighter.y = spawn.y; fighter.hp = fighter.maxEnergy; fighter.respawnTimer = 0; });
  }
  function kickLooseFootball(fighter) {
    if (!footballBall || footballBall.carrier || fighter.hp <= 0 || distance(fighter, footballBall) > fighter.radius + footballBall.radius + 32) return false;
    const aim = pointer || { x: fighter.x + Math.cos(fighter.angle) * 100, y: fighter.y + Math.sin(fighter.angle) * 100 };
    const angle = Math.atan2(aim.y - fighter.y, aim.x - fighter.x);
    footballBall.x = fighter.x + Math.cos(angle) * 18;
    footballBall.y = fighter.y + Math.sin(angle) * 18;
    footballBall.vx = Math.cos(angle) * 560;
    footballBall.vy = Math.sin(angle) * 560;
    footballBall.lastKicker = fighter;
    footballBall.noPickupTimer = .32;
    fighter.angle = angle;
    burst(footballBall.x, footballBall.y, colors.yellow, 8, 85);
    return true;
  }
  function takeFootball(fighter) {
    if (fighter.controlled) return false;
    if (!footballBall || fighter.hp <= 0) return false;
    if (footballBall.carrier && footballBall.carrier !== fighter) {
      if (footballBall.carrier.team === fighter.team || distance(fighter, footballBall.carrier) > fighter.radius + footballBall.carrier.radius + 22) return false;
    } else if (footballBall.carrier) return false;
    if (!footballBall.carrier && distance(fighter, footballBall) > fighter.radius + footballBall.radius + 22) return false;
    footballBall.carrier = fighter; burst(fighter.x, fighter.y, colors.yellow, 8, 65); return true;
  }
  function tryFootballShot(fighter) {
    if (!footballBall || footballBall.carrier !== fighter || fighter.controlled || fighter.footballKickCooldown > 0) return;
    const goal = footballGoalCenter(fighter.team);
    const distanceToGoal = Math.hypot(goal.x - fighter.x, goal.y - fighter.y);
    const defenders = (fighter.team === 'blue' ? enemies : [player, ...allies]).filter(opponent => opponent.hp > 0);
    const teammates = (fighter.team === 'blue' ? [player, ...allies] : enemies).filter(teammate => teammate !== fighter && teammate.hp > 0);
    const goalOffset = Math.min(worldWidth / mapEditorColumns, worldHeight / mapEditorRows) * .25;
    const goalLanes = [clamp(goal.y - goalOffset, 18, worldHeight - 18), clamp(goal.y + goalOffset, 18, worldHeight - 18)];
    const shotY = goalLanes.reduce((bestLane, lane) => {
      const pressure = defenders.reduce((total, opponent) => {
        const goalDistance = Math.hypot(goal.x - opponent.x, lane - opponent.y);
        return total + Math.max(0, 1 - goalDistance / 125);
      }, 0);
      return pressure < bestLane.pressure ? { y: lane, pressure } : bestLane;
    }, { y: goalLanes[0], pressure: Infinity }).y;
    const canShoot = distanceToGoal <= worldWidth * .32 && distanceToGoal >= 28;
    const shotBlocked = defenders.some(defender => (
      Math.hypot(defender.x - (fighter.x + goal.x) / 2, defender.y - (fighter.y + shotY) / 2) < 30
    ));

    if (canShoot && !shotBlocked) {
      const angle = Math.atan2(shotY - fighter.y, goal.x - fighter.x);
      footballBall.carrier = null;
      footballBall.x = fighter.x + Math.cos(angle) * 18;
      footballBall.y = fighter.y + Math.sin(angle) * 18;
      footballBall.vx = Math.cos(angle) * 560;
      footballBall.vy = Math.sin(angle) * 560;
      footballBall.lastKicker = fighter;
      footballBall.noPickupTimer = .32;
      fighter.footballKickCooldown = 1.1;
      fighter.angle = angle;
      burst(footballBall.x, footballBall.y, colors.yellow, 8, 85);
      return;
    }

    const pressure = defenders.some(defender => distance(defender, fighter) < 105);
    if (!pressure || teammates.length === 0) return;
    const receiver = teammates
      .filter(teammate => (teammate.x - fighter.x) * direction > 35)
      .sort((a, b) => {
        const progressA = (a.x - fighter.x) * direction;
        const progressB = (b.x - fighter.x) * direction;
        const scoreA = progressA - distance(a, fighter) * .3;
        const scoreB = progressB - distance(b, fighter) * .3;
        return scoreB - scoreA;
      })[0];
    if (!receiver) return;
    const passAngle = Math.atan2(receiver.y - fighter.y, receiver.x - fighter.x);
    footballBall.carrier = null;
    footballBall.x = fighter.x + Math.cos(passAngle) * 18;
    footballBall.y = fighter.y + Math.sin(passAngle) * 18;
    footballBall.vx = Math.cos(passAngle) * 430;
    footballBall.vy = Math.sin(passAngle) * 430;
    footballBall.lastKicker = fighter;
    footballBall.noPickupTimer = .18;
    fighter.footballKickCooldown = .8;
    fighter.angle = passAngle;
    burst(footballBall.x, footballBall.y, colors.cyan, 6, 65);
  }
  function awardFootballGoal(team) {
    footballScore[team]++;
    if (footballScore[team] >= 2) { endGame(team === 'blue'); return; }
    footballTime += 10;
    screenFlash = 1;
    goalPulse = 1;
    burst(footballBall.x, footballBall.y, colors.yellow, 50, 240);
    matchStatus.textContent = `GÓL / ${footballScore.blue} : ${footballScore.red} / +10 s`;
    resetFootballAfterGoal();
  }
  function customGoalCenter(type) {
    const goal = customMapCells.find(cell => cell.type === type);
    return goal ? { x: worldWidth * (goal.x + .5) / mapEditorColumns, y: worldHeight * (goal.y + .5) / mapEditorRows } : null;
  }
  function footballGoalCenter(team) {
    const goal = selectedMap === 'custom' && customMapMode === 'football' ? customGoalCenter(team === 'blue' ? 'goal_red' : 'goal_blue') : null;
    return goal || { x: team === 'blue' ? worldWidth - 18 : 18, y: worldHeight / 2 };
  }
  function footballStartPosition() {
    const ball = selectedMap === 'custom' && customMapMode === 'football' ? customMapCells.find(cell => cell.type === 'ball') : null;
    return ball ? { x: worldWidth * (ball.x + .5) / mapEditorColumns, y: worldHeight * (ball.y + .5) / mapEditorRows } : { x: worldWidth / 2, y: worldHeight / 2 };
  }
  function hasReachedCustomGoal(team, x, y) {
    if (selectedMap !== 'custom' || customMapMode !== 'football') return false;
    const goal = footballGoalCenter(team);
    return goal !== null && Math.hypot(x - goal.x, y - goal.y) < Math.min(worldWidth / mapEditorColumns, worldHeight / mapEditorRows) * .8;
  }
  function updateFootball(dt) {
    if (!footballBall) return;
    const players = [player, ...allies, ...enemies].filter(fighter => fighter.hp > 0);
    if (footballBall.carrier && footballBall.carrier.hp <= 0) { footballBall.x = footballBall.carrier.x; footballBall.y = footballBall.carrier.y; footballBall.carrier = null; }
    if (footballBall.carrier) {
      const carrier = footballBall.carrier;
      const steal = players.find(fighter => fighter !== carrier && fighter.team !== carrier.team && distance(fighter, carrier) < fighter.radius + carrier.radius + 14);
      if (steal) { footballBall.carrier = steal; footballBall.x = steal.x; footballBall.y = steal.y - 19; burst(steal.x, steal.y, colors.yellow, 10, 80); }
    } else {
      footballBall.noPickupTimer = Math.max(0, (footballBall.noPickupTimer || 0) - dt);
      const previousX = footballBall.x;
      const previousY = footballBall.y;
      if (footballBall.vx || footballBall.vy) {
        footballBall.x += footballBall.vx * dt;
        footballBall.y += footballBall.vy * dt;
        if (hasReachedCustomGoal('blue', footballBall.x, footballBall.y)) { awardFootballGoal('blue'); return; }
        if (hasReachedCustomGoal('red', footballBall.x, footballBall.y)) { awardFootballGoal('red'); return; }
        const drag = Math.pow(.985, dt * 60);
        footballBall.vx *= drag;
        footballBall.vy *= drag;
        if (footballBall.y < 18 || footballBall.y > worldHeight - 18) {
          footballBall.y = clamp(footballBall.y, 18, worldHeight - 18);
          footballBall.vy *= -.6;
        }
        const goalTop = worldHeight * .37;
        const goalBottom = worldHeight * .63;
        if (footballBall.y >= goalTop && footballBall.y <= goalBottom) {
          const crossedRightGoal = previousX < worldWidth - 18 && footballBall.x >= worldWidth - 18;
          const crossedLeftGoal = previousX > 18 && footballBall.x <= 18;
          if (crossedRightGoal || crossedLeftGoal) {
            awardFootballGoal(crossedRightGoal ? 'blue' : 'red');
            return;
          }
        }
        if (footballBall.x < 18 || footballBall.x > worldWidth - 18) {
          footballBall.x = clamp(footballBall.x, 18, worldWidth - 18);
          footballBall.vx *= -.6;
        }
      }
      const pickup = players.filter(fighter => !fighter.controlled && (footballBall.noPickupTimer <= 0 || fighter !== footballBall.lastKicker) && distance(fighter, footballBall) < fighter.radius + footballBall.radius + 22).sort((a, b) => distance(a, footballBall) - distance(b, footballBall))[0];
      if (pickup) takeFootball(pickup);
    }
    if (footballBall.carrier) {
      footballBall.x = footballBall.carrier.x; footballBall.y = footballBall.carrier.y - 19;
      const scored = hasReachedCustomGoal(footballBall.carrier.team, footballBall.x, footballBall.y) || (footballBall.carrier.team === 'blue' && footballBall.carrier.x > worldWidth - 32 && footballBall.y >= worldHeight * .37 && footballBall.y <= worldHeight * .63) || (footballBall.carrier.team === 'red' && footballBall.carrier.x < 32 && footballBall.y >= worldHeight * .37 && footballBall.y <= worldHeight * .63);
      if (scored) {
        awardFootballGoal(footballBall.carrier.team);
      }
    }
  }
  function respawnPlayer() {
    if (knockoutActive) return;
    if (selectedMode === 'duel') {
      duelIndex++;
      if (duelIndex >= duelRoster.length) { endGame(false); return; }
      const nextCharacter = getUpgradedCharacter(characters.find(item => item.id === duelRoster[duelIndex]) || characters[0]);
      player.suit = nextCharacter.suit; player.speed = nextCharacter.speed; player.maxEnergy = nextCharacter.maxEnergy; player.damage = nextCharacter.damage; player.shots = nextCharacter.shots; player.fireRate = nextCharacter.fireRate; player.style = nextCharacter.style || ''; player.hp = player.maxEnergy; player.x = worldWidth * .2; player.y = worldHeight / 2; player.angle = 0; player.cooldown = .5; player.duelIndex = duelIndex;
      enemies.forEach((fighter, index) => { fighter.hp = fighter.maxEnergy; fighter.x = worldWidth * (.76 + index % 3 * .035); fighter.y = worldHeight * (.12 + index / (enemies.length - 1) * .76); fighter.respawnTimer = 0; fighter.cooldown = .5; });
      matchStatus.textContent = `DUEL / ${nextCharacter.name} NASTUPUJE`; matchStatus.className = 'match-status playing'; return;
    }
    const spawn = customSpawn('spawn_blue', 0, .2, .5);
    player.hp = player.maxEnergy; player.x = spawn.x; player.y = spawn.y; player.angle = 0; player.cooldown = .5; player.shield = 0; player.slowTime = 0; player.stunTime = 0; player.poisonTime = 0; matchStatus.textContent = `ZNOVU V HRE / ZOSTÁVA ${player.respawnsLeft}`; matchStatus.className = 'match-status playing';
  }
  function isTeamEliminated(team) { return team.every(fighter => fighter.hp <= 0 && fighter.respawnTimer <= 0 && fighter.respawnsLeft <= 0); }
  function finishKnockoutRound(blueWon) {
    if (blueWon !== null) {
      const team = blueWon ? 'blue' : 'red';
      knockoutWins[team]++;
      if (knockoutWins[team] >= 2) {
        endGame(blueWon);
        return;
      }
    }
    player.hp = player.maxEnergy; player.x = worldWidth * .2; player.y = worldHeight / 2; player.angle = 0; player.cooldown = .6; player.shield = 0;
    const teamSize = allies.length + 1;
    const teamLanes = teamSize === 1 ? [.5] : teamSize === 2 ? [.38, .62] : [.3, .5, .7];
    const allyLanes = teamLanes.filter((_, index) => index !== Math.floor(teamSize / 2));
    allies.forEach((fighter, index) => { fighter.hp = fighter.maxEnergy; fighter.x = worldWidth * (.14 + index * .12); fighter.y = worldHeight * (allyLanes[index] ?? .5); fighter.cooldown = .6; fighter.shield = 0; });
    const enemyLanes = enemies.length === 1 ? [.5] : enemies.length === 2 ? [.38, .62] : [.3, .5, .7];
    enemies.forEach((fighter, index) => { fighter.hp = fighter.maxEnergy; fighter.x = worldWidth * (.76 + index % 3 * .035); fighter.y = worldHeight * (enemyLanes[index] ?? .5); fighter.cooldown = .6; fighter.shield = 0; });
    bullets = []; shards = []; particles = []; ammo = 3; reloadTimer = 0; superCharge = 0; gadgetCooldown = 0; hyperActive = 0;
    matchStatus.textContent = blueWon === null ? `KOLO REMÍZA / OPAKUJE SA (${knockoutWins.blue} : ${knockoutWins.red})` : `KNOCKOUT / ${knockoutWins.blue} : ${knockoutWins.red} / 2`;
    matchStatus.className = 'match-status playing';
  }
  function updateFootballRespawns(dt) {
    [...allies, ...enemies].forEach((fighter, index) => {
      if (fighter.hp > 0 || fighter.respawnTimer <= 0) return;
      fighter.respawnTimer -= dt;
      if (fighter.respawnTimer <= 0) {
        const isBlue = fighter.team === 'blue';
        fighter.hp = fighter.maxEnergy; fighter.x = worldWidth * (isBlue ? .2 : .8); fighter.y = worldHeight / 2 + (index - 1) * 55; fighter.cooldown = .5;
      }
    });
  }
  function updateBotRespawns(dt) {
    if (knockoutActive || isFootballMap()) return;
    [...allies, ...enemies].forEach(fighter => {
      if (fighter.hp > 0 || fighter.respawnTimer <= 0) return;
      fighter.respawnTimer = Math.max(0, fighter.respawnTimer - dt);
      if (fighter.respawnTimer > 0) return;
      let spawn;
      if (fighter.team === 'blue') {
        const index = allies.indexOf(fighter);
        spawn = customSpawn('spawn_blue', index + 1, .14 + index * .12, [.38, .62][index] || .5);
      } else {
        const index = enemies.indexOf(fighter);
        const edgeY = enemies.length === 1 ? .5 : .12 + index / (enemies.length - 1) * .76;
        spawn = customSpawn('spawn_red', index, .76 + index % 3 * .035, edgeY);
      }
      fighter.x = spawn.x; fighter.y = spawn.y; fighter.hp = fighter.maxEnergy; fighter.angle = 0; fighter.cooldown = .5;
      fighter.shield = 0; fighter.slowTime = 0; fighter.stunTime = 0; fighter.poisonTime = 0;
    });
  }
  function update(dt) {
    elapsed += dt;
    if (reloadTimer > 0) { reloadTimer -= dt; if (reloadTimer <= 0) ammo = 3; }
    gadgetCooldown = Math.max(0, gadgetCooldown - dt); hyperActive = Math.max(0, hyperActive - dt);
    [...allies, ...enemies, player].filter(Boolean).forEach(fighter => { fighter.recoil = Math.max(0, fighter.recoil - dt); });
    [...allies, ...enemies, player].filter(Boolean).forEach(fighter => { fighter.slowTime = Math.max(0, fighter.slowTime - dt); fighter.stunTime = Math.max(0, fighter.stunTime - dt); fighter.poisonTime = Math.max(0, fighter.poisonTime - dt); if (fighter.poisonTime > 0) fighter.hp = Math.max(0, fighter.hp - dt * 4); if (fighter.shield > 0) fighter.shield = Math.max(0, fighter.shield - dt * 3); });
    screenFlash = Math.max(0, screenFlash - dt * 2.8); goalPulse = Math.max(0, goalPulse - dt * 1.8); damageFlash = Math.max(0, damageFlash - dt * 3.5);
    comboTimer = Math.max(0, comboTimer - dt); if (comboTimer === 0) combo = 1;
    if (!isFootballMap() && state === 'playing') { shardTimer += dt; if (shardTimer > 5.5) { shardTimer = 0; spawnShard(); } }
    if (showdownActive && state === 'playing') { showdownRadius = Math.max(Math.min(worldWidth, worldHeight) * .28, showdownRadius - dt * 3.2 * (worldHeight / height)); if (powerCubes.length < 10 && Math.random() < dt * .12) spawnPowerCube(); [...allies, ...enemies, player].filter(fighter => fighter && fighter.hp > 0).forEach(fighter => { if (Math.hypot(fighter.x - worldWidth / 2, fighter.y - worldHeight / 2) > showdownRadius) fighter.hp = Math.max(0, fighter.hp - dt * 8); }); }
    if (isFootballMap()) {
      footballTime -= dt;
      if (footballTime <= 0) {
        if (!footballOvertime) { footballOvertime = true; footballTime = 20; bullets = []; particles = []; footballBall = { ...footballStartPosition(), radius: 8, carrier: null }; matchStatus.textContent = 'PREDĹŽENIE / 20 s'; }
        else { endGame(footballScore.blue > footballScore.red); return; }
      }
    }
    if (isFootballMap()) updateFootballRespawns(dt);
    else updateBotRespawns(dt);
    if (player.hp <= 0 && player.respawnTimer > 0) { player.respawnTimer -= dt; matchStatus.textContent = `PADOL SI / OBNOVENIE ${Math.ceil(player.respawnTimer)} s`; matchStatus.className = 'match-status lost'; if (player.respawnTimer <= 0) respawnPlayer(); }
    const gamepad = readGamepad(); let dx = gamepad.x + joystick.x, dy = gamepad.y + joystick.y; if (keys.has(settings.bindings.up) || keys.has('arrowup')) dy--; if (keys.has(settings.bindings.down) || keys.has('arrowdown')) dy++; if (keys.has(settings.bindings.left) || keys.has('arrowleft')) dx--; if (keys.has(settings.bindings.right) || keys.has('arrowright')) dx++;
    const length = Math.hypot(dx, dy) || 1; if (player.hp > 0) moveSafely(player, dx / length * player.speed, dy / length * player.speed, dt, [player, ...allies]);
    const blueTeam = [player, ...allies]; const redTeam = enemies;
    [...allies, ...enemies, player].forEach(fighter => { fighter.footballKickCooldown = Math.max(0, fighter.footballKickCooldown - dt); });
    blueTeam.forEach(fighter => {
      if (fighter.hp <= 0) return;
      fighter.cooldown -= dt;
      if (!fighter.controlled) {
        if (isFootballMap()) {
          moveFootballAI(fighter, blueTeam, dt);
          const target = footballBall && footballBall.carrier && footballBall.carrier.team !== fighter.team ? footballBall.carrier : null;
          if (target) fire(fighter, target);
        } else {
          const target = footballTarget(fighter, redTeam);
          moveFighter(fighter, target, dt);
          if (target && target.hp !== undefined) fire(fighter, target);
        }
      }
    });
    redTeam.forEach(fighter => {
      if (fighter.hp <= 0) return;
      fighter.cooldown -= dt;
      if (isFootballMap()) {
        moveFootballAI(fighter, redTeam, dt);
        const target = footballBall && footballBall.carrier && footballBall.carrier.team !== fighter.team ? footballBall.carrier : null;
        if (target) fire(fighter, target);
      } else {
        const opponents = [...blueTeam, ...redTeam].filter(other => other !== fighter && other.team !== fighter.team);
        const target = nearestTarget(fighter, opponents);
        moveFighter(fighter, target, dt);
        if (target && target.hp !== undefined) fire(fighter, target);
      }
    });
    if (isFootballMap()) [...allies, ...enemies].forEach(tryFootballShot);
    if (gamepad.aimX || gamepad.aimY) { pointer = { x: player.x + gamepad.aimX * 260, y: player.y + gamepad.aimY * 260 }; }
    if (player.hp > 0 && (firing || keys.has(settings.bindings.fire) || gamepad.fire)) firePlayer();
    updateFootball(dt);
    applyCustomMapMechanics(dt);
    shards = shards.filter(shard => { shard.life -= dt; shard.spin += dt * 2.5; if (player.hp > 0 && distance(player, shard) < player.radius + shard.radius + 8) { const reward = shard.type === 'gem' ? 1 : 12; if (shard.type === 'gem') { gems += reward; storage.set(gemsKey, gems); gemsEl.textContent = gems; } else { coins += reward; storage.set(coinsKey, coins); coinsEl.textContent = coins; } score += shard.type === 'gem' ? 80 : 45; unlockAchievement('collector'); playTone(700); burst(shard.x, shard.y, shard.type === 'gem' ? colors.yellow : colors.orange, 14, 100); return false; } return shard.life > 0; });
    powerCubes = powerCubes.filter(cube => { cube.spin += dt * 3; const collector = [player, ...allies, ...enemies].find(fighter => fighter && fighter.hp > 0 && distance(fighter, cube) < fighter.radius + cube.radius + 8); if (!collector) return true; collector.maxEnergy += 12; collector.hp = Math.min(collector.maxEnergy, collector.hp + 12); collector.damage += 3; if (collector.controlled) score += 100; burst(cube.x, cube.y, colors.yellow, 16, 120); return false; });
    bullets = bullets.filter(bullet => {
      if (bullet.kind === 'lob') {
        bullet.progress = Math.min(1, bullet.progress + dt / bullet.flight);
        bullet.x = bullet.startX + (bullet.targetX - bullet.startX) * bullet.progress;
        bullet.y = bullet.startY + (bullet.targetY - bullet.startY) * bullet.progress;
        if (bullet.progress < 1) return true;
        const lobTargets = isFootballMap() ? (bullet.team === 'blue' ? redTeam : blueTeam) : [...blueTeam, ...redTeam].filter(fighter => fighter.team !== bullet.team);
        const hitTargets = lobTargets.filter(target => target.hp > 0 && distance(target, bullet) < target.radius + bullet.blastRadius);
        hitTargets.forEach(target => applyBulletDamage(target, bullet));
        coverBlocks = coverBlocks.filter(block => {
          if (!['wall', 'crate', 'box'].includes(block.type) || Math.hypot(block.x + block.width / 2 - bullet.x, block.y + block.height / 2 - bullet.y) > bullet.blastRadius) return true;
          if (block.type === 'box') powerCubes.push({ x: block.x + block.width / 2, y: block.y + block.height / 2, radius: 8, spin: random(0, 7) });
          burst(block.x + block.width / 2, block.y + block.height / 2, colors.orange, 10, 70);
          return false;
        });
        burst(bullet.x, bullet.y, bullet.color, 16, 120);
        return false;
      }
      bullet.life -= dt; bullet.x += bullet.vx * dt; bullet.y += bullet.vy * dt;
      const crate = coverBlocks.find(block => ['crate', 'box'].includes(block.type) && bullet.x > block.x && bullet.x < block.x + block.width && bullet.y > block.y && bullet.y < block.y + block.height);
      if (crate) { coverBlocks = coverBlocks.filter(block => block !== crate); if (crate.type === 'box') powerCubes.push({ x: crate.x + crate.width / 2, y: crate.y + crate.height / 2, radius: 8, spin: random(0, 7) }); burst(crate.x + crate.width / 2, crate.y + crate.height / 2, colors.orange, 8, 55); return false; }
      if (bullet.life <= 0 || bullet.x < 0 || bullet.x > worldWidth || bullet.y < 0 || bullet.y > worldHeight || blocksShots(bullet.x, bullet.y)) return false;
      const allFighters = [...blueTeam, ...redTeam];
      const targets = isFootballMap() ? (bullet.team === 'blue' ? redTeam : blueTeam) : allFighters.filter(fighter => fighter.team !== bullet.team);
      const target = targets.find(fighter => fighter.hp > 0 && distance(bullet, fighter) < fighter.radius + 4);
      if (!target) return true;
      applyBulletDamage(target, bullet);
      return false;
    });
    particles = particles.filter(particle => { particle.life -= dt; particle.x += particle.vx * dt; particle.y += particle.vy * dt; particle.vx *= .97; particle.vy *= .97; return particle.life > 0; });
    if (knockoutActive && enemies.every(fighter => fighter.hp <= 0) && player.hp <= 0 && allies.every(fighter => fighter.hp <= 0)) finishKnockoutRound(null);
    else if (knockoutActive && enemies.every(fighter => fighter.hp <= 0)) finishKnockoutRound(true);
    else if (knockoutActive && player.hp <= 0 && allies.every(fighter => fighter.hp <= 0)) finishKnockoutRound(false);
    else if (!isFootballMap() && isTeamEliminated(enemies)) endGame(true);
    else if (!knockoutActive && !isFootballMap() && selectedMode === 'duel' && player.hp <= 0 && player.respawnTimer <= 0 && duelIndex >= duelRoster.length - 1) endGame(false);
    else if (!knockoutActive && !isFootballMap() && selectedMode !== 'duel' && isTeamEliminated([player, ...allies])) endGame(false);
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const theme = mapThemes[selectedMap] || mapThemes.neon; const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width * .75); gradient.addColorStop(0, theme[0]); gradient.addColorStop(1, theme[1]); ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
    ctx.save(); ctx.globalAlpha = .2; ctx.strokeStyle = theme[2]; ctx.lineWidth = 1; for (let ray = -4; ray <= 4; ray++) { ctx.beginPath(); ctx.moveTo(width / 2, height / 2); ctx.lineTo(width / 2 + Math.cos(ray * .28 + elapsed * .02) * width, height / 2 + Math.sin(ray * .28 + elapsed * .02) * height); ctx.stroke(); } ctx.restore();
    const camera = getCamera();
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(viewRotation);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.x, -camera.y);
    const floorGlow = ctx.createRadialGradient(worldWidth / 2, worldHeight / 2, 24, worldWidth / 2, worldHeight / 2, worldWidth * .68);
    floorGlow.addColorStop(0, 'rgba(111,255,233,.055)'); floorGlow.addColorStop(1, 'rgba(2,8,18,.16)');
    ctx.fillStyle = floorGlow; ctx.fillRect(0, 0, worldWidth, worldHeight);
    ctx.save(); ctx.globalAlpha = .095; ctx.strokeStyle = theme[2]; ctx.lineWidth = 1;
    const gridSize = 48;
    for (let x = width % gridSize; x < worldWidth; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, worldHeight); ctx.stroke(); }
    for (let y = height % gridSize; y < worldHeight; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(worldWidth, y); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = 'rgba(111,255,233,.45)'; ctx.lineWidth = 3; ctx.strokeRect(1, 1, worldWidth - 2, worldHeight - 2);
    if (isFootballMap()) {
      ctx.save();
      const fieldLeft = 18, fieldTop = 18, fieldWidth = worldWidth - 36, fieldHeight = worldHeight - 36;
      ctx.globalAlpha = .16; for (let stripe = 0; stripe < 10; stripe++) { ctx.fillStyle = stripe % 2 ? '#1db58b' : '#073b47'; ctx.fillRect(fieldLeft + stripe * fieldWidth / 10, fieldTop, fieldWidth / 10, fieldHeight); }
      ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(111,255,233,.58)'; ctx.lineWidth = 2; ctx.strokeRect(fieldLeft, fieldTop, fieldWidth, fieldHeight);
      ctx.strokeStyle = 'rgba(238,242,232,.62)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(worldWidth / 2, fieldTop); ctx.lineTo(worldWidth / 2, worldHeight - fieldTop); ctx.stroke(); ctx.beginPath(); ctx.arc(worldWidth / 2, worldHeight / 2, 42, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeRect(fieldLeft, worldHeight * .27, 88, worldHeight * .46); ctx.strokeRect(worldWidth - fieldLeft - 88, worldHeight * .27, 88, worldHeight * .46); ctx.strokeRect(fieldLeft, worldHeight * .37, 40, worldHeight * .26); ctx.strokeRect(worldWidth - fieldLeft - 40, worldHeight * .37, 40, worldHeight * .26);
      ctx.beginPath(); ctx.arc(fieldLeft + 88, worldHeight / 2, 24, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.beginPath(); ctx.arc(worldWidth - fieldLeft - 88, worldHeight / 2, 24, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
      ctx.strokeStyle = 'rgba(249,215,110,.9)'; ctx.lineWidth = 4; ctx.strokeRect(fieldLeft - 8, worldHeight * .37, 8, worldHeight * .26); ctx.strokeRect(worldWidth - fieldLeft, worldHeight * .37, 8, worldHeight * .26);
      ctx.fillStyle = '#eef2e8'; ctx.shadowBlur = 16; ctx.shadowColor = '#6fffe9'; ctx.beginPath(); ctx.arc(worldWidth / 2, worldHeight / 2, 7, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    coverBlocks.forEach(block => {
      const style = block.style || 'metal';
      if (block.type && !block.solid) {
        const colorsByType = { bush: '#3cba70', spikes: '#ff6eaa', jump: '#6fffe9', teleport: '#d498ff', speed: '#60e5b3', slow: '#b9a7ff', spawn_blue: '#6fffe9', spawn_red: '#ff6eaa', box: '#f9d76e', gem_mine: '#d498ff', goal_blue: '#6fffe9', goal_red: '#ff6eaa', ball: '#f9d76e', safe: '#f9d76e' };
        const icon = mapEditorTools.find(tool => tool.id === block.type)?.icon || '•';
        ctx.fillStyle = `${colorsByType[block.type] || colors.cyan}24`; ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.strokeStyle = colorsByType[block.type] || colors.cyan; ctx.globalAlpha = .8; ctx.lineWidth = 1.5; ctx.strokeRect(block.x + 1, block.y + 1, block.width - 2, block.height - 2); ctx.globalAlpha = 1;
        if (block.type === 'bush') {
          ctx.fillStyle = '#37a95d'; for (const [ox, oy] of [[.28, .3], [.58, .38], [.42, .65]]) { ctx.beginPath(); ctx.arc(block.x + block.width * ox, block.y + block.height * oy, Math.min(block.width, block.height) * .22, 0, Math.PI * 2); ctx.fill(); }
        } else {
          ctx.fillStyle = colorsByType[block.type] || colors.cyan; ctx.font = `700 ${Math.max(9, Math.min(20, block.height * .55))}px Space Mono`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(icon, block.x + block.width / 2, block.y + block.height / 2);
        }
        return;
      }
      const edge = style === 'crystal' ? '#ff6eaa' : style === 'pillar' ? '#f9d76e' : style === 'indestructible' ? '#aab5b8' : style === 'water' ? '#4ca8e5' : '#6fffe9';
      const face = style === 'crystal' ? '#316882' : style === 'pillar' ? '#36445b' : style === 'indestructible' ? '#53616e' : style === 'water' ? '#144c70' : '#163a4e';
      const top = ctx.createLinearGradient(block.x, block.y, block.x + block.width, block.y + block.height);
      top.addColorStop(0, style === 'crystal' ? '#78c9dc' : style === 'pillar' ? '#8294a5' : style === 'indestructible' ? '#9daab3' : style === 'water' ? '#388fce' : '#3f8190');
      top.addColorStop(.32, face); top.addColorStop(1, '#0b1c30');
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 12; ctx.shadowOffsetX = 5; ctx.shadowOffsetY = 9;
      ctx.fillStyle = '#07121f'; ctx.fillRect(block.x + 4, block.y + 7, block.width, block.height);
      ctx.restore();
      ctx.fillStyle = style === 'crystal' ? 'rgba(255,110,170,.42)' : 'rgba(5,14,27,.92)';
      ctx.beginPath(); ctx.moveTo(block.x, block.y + block.height); ctx.lineTo(block.x + 5, block.y + block.height + 6); ctx.lineTo(block.x + block.width + 5, block.y + block.height + 6); ctx.lineTo(block.x + block.width, block.y + block.height); ctx.closePath(); ctx.fill();
      ctx.fillStyle = style === 'crystal' ? 'rgba(111,255,233,.35)' : 'rgba(2,9,20,.88)';
      ctx.beginPath(); ctx.moveTo(block.x + block.width, block.y); ctx.lineTo(block.x + block.width + 5, block.y + 6); ctx.lineTo(block.x + block.width + 5, block.y + block.height + 6); ctx.lineTo(block.x + block.width, block.y + block.height); ctx.closePath(); ctx.fill();
      ctx.fillStyle = top; ctx.fillRect(block.x, block.y, block.width, block.height);
      ctx.strokeStyle = edge; ctx.globalAlpha = .68; ctx.lineWidth = 1.2; ctx.strokeRect(block.x + .5, block.y + .5, block.width - 1, block.height - 1); ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(255,255,255,.24)'; ctx.fillRect(block.x + 2, block.y + 2, Math.max(0, block.width - 4), 2);
      if (style === 'crystal') {
        ctx.fillStyle = 'rgba(238,242,232,.45)'; ctx.beginPath(); ctx.moveTo(block.x + block.width * .16, block.y + block.height * .82); ctx.lineTo(block.x + block.width * .25, block.y + block.height * .18); ctx.lineTo(block.x + block.width * .34, block.y + block.height * .82); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(111,255,233,.35)'; ctx.beginPath(); ctx.moveTo(block.x + block.width * .64, block.y + 5); ctx.lineTo(block.x + block.width * .64, block.y + block.height - 5); ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(111,255,233,.38)'; ctx.fillRect(block.x + 5, block.y + block.height - 5, Math.max(0, block.width - 10), 2);
      }
      if (block.type === 'box') {
        ctx.save();
        ctx.strokeStyle = colors.yellow;
        ctx.fillStyle = '#07111f';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = colors.yellow;
        ctx.strokeRect(block.x + 5, block.y + 5, block.width - 10, block.height - 10);
        ctx.font = `700 ${Math.max(10, Math.min(20, block.height * .45))}px Space Mono`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('+', block.x + block.width / 2, block.y + block.height / 2);
        ctx.restore();
      }
    });
    particles.forEach(p => { ctx.globalAlpha = Math.max(0, p.life / p.maxLife); ctx.fillStyle = p.color; ctx.shadowBlur = 12; ctx.shadowColor = p.color; ctx.fillRect(p.x, p.y, p.size, p.size); }); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    bullets.forEach(bullet => {
      if (bullet.kind === 'lob') {
        const height = Math.sin(bullet.progress * Math.PI) * 34;
        ctx.save(); ctx.globalAlpha = .3 + Math.sin(bullet.progress * Math.PI) * .55; ctx.fillStyle = '#07111f'; ctx.beginPath(); ctx.ellipse(bullet.x, bullet.y + height, 7, 3, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; ctx.fillStyle = bullet.color; ctx.shadowBlur = 12; ctx.shadowColor = bullet.color; ctx.beginPath(); ctx.arc(bullet.x, bullet.y - height, 5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); return;
      }
      ctx.save(); ctx.translate(bullet.x, bullet.y); ctx.rotate(Math.atan2(bullet.vy, bullet.vx));
      const trail = ctx.createLinearGradient(-17, 0, 2, 0); trail.addColorStop(0, 'rgba(0,0,0,0)'); trail.addColorStop(1, bullet.color);
      ctx.fillStyle = trail; ctx.beginPath(); ctx.ellipse(-6, 0, 9, 2.3, 0, 0, Math.PI * 2); ctx.fill();
      const orb = ctx.createRadialGradient(-1, -1.5, .2, 0, 0, 5); orb.addColorStop(0, '#ffffff'); orb.addColorStop(.34, bullet.color); orb.addColorStop(1, 'rgba(7,17,31,.15)');
      ctx.fillStyle = orb; ctx.shadowBlur = 14; ctx.shadowColor = bullet.color; ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }); ctx.shadowBlur = 0;
    if (footballBall) {
      const ballRadius = footballBall.radius + goalPulse * 3; const ballGradient = ctx.createRadialGradient(footballBall.x - 3, footballBall.y - 4, 1, footballBall.x, footballBall.y, ballRadius);
      ballGradient.addColorStop(0, '#b2ee27'); ballGradient.addColorStop(.65, '#dce9e6'); ballGradient.addColorStop(1, '#536777');
      ctx.fillStyle = ballGradient; ctx.strokeStyle = '#07111f'; ctx.lineWidth = 2; ctx.shadowBlur = 18 + goalPulse * 20; ctx.shadowColor = goalPulse > 0 ? colors.yellow : '#eef2e8'; ctx.beginPath(); ctx.arc(footballBall.x, footballBall.y, ballRadius, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(7, 31, 30, 0.65)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(footballBall.x - 3, footballBall.y - 5); ctx.lineTo(footballBall.x + 4, footballBall.y); ctx.lineTo(footballBall.x - 3, footballBall.y + 5); ctx.stroke();
    }
    powerCubes.forEach(cube => {
      ctx.save();
      ctx.translate(cube.x, cube.y);
      ctx.rotate(cube.spin);
      ctx.fillStyle = 'rgba(249,215,110,.25)';
      ctx.strokeStyle = colors.yellow;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 18;
      ctx.shadowColor = colors.yellow;
      ctx.beginPath();
      ctx.moveTo(0, -cube.radius);
      ctx.lineTo(cube.radius, 0);
      ctx.lineTo(0, cube.radius);
      ctx.lineTo(-cube.radius, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.rotate(-cube.spin);
      ctx.fillStyle = colors.white;
      ctx.font = '700 11px Space Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', 0, 0);
      ctx.restore();
    });
    shards.forEach(shard => { ctx.save(); ctx.translate(shard.x, shard.y); ctx.rotate(shard.spin); const color = shard.type === 'gem' ? colors.yellow : colors.orange; ctx.strokeStyle = color; ctx.shadowBlur = 15; ctx.shadowColor = color; ctx.lineWidth = 2; ctx.beginPath(); if (shard.type === 'gem') { ctx.moveTo(0, -8); ctx.lineTo(5, 0); ctx.lineTo(0, 8); ctx.lineTo(-5, 0); } else { ctx.arc(0, 0, 6, 0, Math.PI * 2); } ctx.closePath(); ctx.stroke(); ctx.restore(); });
    [...allies, ...enemies, player].forEach(fighter => {
      if (fighter.hp <= 0) return;
      const bodyScale = fighter.characterId === 'titan' ? 1.2 : fighter.characterId === 'runner' || fighter.characterId === 'scout' ? .9 : 1;
      const showingBack = Math.cos(fighter.angle) < 0;
      ctx.save(); ctx.translate(fighter.x, fighter.y); ctx.rotate(fighter.angle); ctx.scale(bodyScale, bodyScale); ctx.translate(0, Math.sin(elapsed * 8 + fighter.walkPhase) * .9);
      const teamColor = fighter.team === 'blue' ? colors.cyan : colors.orange;
      const bodyGradient = ctx.createLinearGradient(-10, -10, 12, 15);
      bodyGradient.addColorStop(0, '#ffffff'); bodyGradient.addColorStop(.16, fighter.suit); bodyGradient.addColorStop(.62, fighter.suit); bodyGradient.addColorStop(1, '#101a2b');
      const helmetGradient = ctx.createLinearGradient(-7, -22, 8, -6);
      helmetGradient.addColorStop(0, '#ffffff'); helmetGradient.addColorStop(.24, '#e4c9ab'); helmetGradient.addColorStop(.72, '#b98267'); helmetGradient.addColorStop(1, '#634b50');
      ctx.save(); ctx.rotate(-fighter.angle); ctx.filter = 'blur(4px)'; ctx.fillStyle = 'rgba(0,0,0,.58)'; ctx.beginPath(); ctx.ellipse(0, 17, 16, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,.11)'; ctx.beginPath(); ctx.ellipse(0, 17, 13, 2.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const step = Math.sin(elapsed * 10 + fighter.walkPhase) * 2;
      ctx.strokeStyle = '#0e1830'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-13, 5); ctx.moveTo(7, -3); ctx.lineTo(12, 1); ctx.stroke();
      ctx.strokeStyle = fighter.suit; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-13, 5); ctx.moveTo(7, -3); ctx.lineTo(12, 1); ctx.stroke();
      ctx.strokeStyle = '#101a2b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-4, 7); ctx.lineTo(-5 - step, 15); ctx.moveTo(4, 7); ctx.lineTo(5 + step, 15); ctx.stroke();
      ctx.strokeStyle = bodyGradient; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-4, 7); ctx.lineTo(-5 - step, 14); ctx.moveTo(4, 7); ctx.lineTo(5 + step, 14); ctx.stroke();
      ctx.fillStyle = '#0b1422'; ctx.beginPath(); ctx.ellipse(-5 - step, 16, 5, 2.8, -.12, 0, Math.PI * 2); ctx.ellipse(5 + step, 16, 5, 2.8, .12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = fighter.suit; ctx.beginPath(); ctx.roundRect(-8 - step, 10, 5, 4, 1); ctx.roundRect(3 + step, 10, 5, 4, 1); ctx.fill();
      if (fighter.style === 'hood') {
        ctx.fillStyle = '#17183b'; ctx.beginPath(); ctx.moveTo(-7, -4); ctx.lineTo(-13, 9); ctx.lineTo(-7, 7); ctx.lineTo(-4, 13); ctx.lineTo(8, 9); ctx.lineTo(10, -3); ctx.closePath(); ctx.fill();
        const robeGradient = ctx.createLinearGradient(-8, -5, 8, 13); robeGradient.addColorStop(0, '#db5362'); robeGradient.addColorStop(.6, '#a71f3c'); robeGradient.addColorStop(1, '#381d45');
        ctx.fillStyle = robeGradient;
        ctx.beginPath(); ctx.roundRect(-8, -5, 16, 17, 4); ctx.fill();
        ctx.fillStyle = '#f4f0de'; ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(4, 3); ctx.lineTo(0, 8); ctx.lineTo(-4, 3); ctx.closePath(); ctx.fill();
        const hoodGradient = ctx.createLinearGradient(-10, -24, 10, -4);
        hoodGradient.addColorStop(0, '#53679c'); hoodGradient.addColorStop(.42, '#182e5b'); hoodGradient.addColorStop(1, '#09172f');
        ctx.fillStyle = hoodGradient; ctx.beginPath(); ctx.moveTo(-10, -6); ctx.lineTo(-12, -16); ctx.quadraticCurveTo(-11, -24, 0, -25); ctx.quadraticCurveTo(11, -24, 12, -15); ctx.lineTo(9, -5); ctx.lineTo(6, -10); ctx.lineTo(-6, -10); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.34)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-8, -17); ctx.quadraticCurveTo(-5, -23, 3, -22); ctx.stroke();
        ctx.fillStyle = '#d8a77d'; ctx.beginPath(); ctx.ellipse(1, -10, 7, 5, 0, 0, Math.PI); ctx.fill();
        ctx.fillStyle = '#4b3f9f'; ctx.fillRect(-10, -7, 21, 4); ctx.fillStyle = '#db3345'; ctx.fillRect(-11, -3, 5, 3);
        ctx.fillStyle = '#f4f0de'; ctx.fillRect(1, -9, 3, 2); ctx.fillRect(6, -9, 2, 2);
      } else {
        const armWidth = fighter.characterId === 'titan' ? 8 : 6;
        ctx.lineCap = 'round'; ctx.strokeStyle = '#101a2b'; ctx.lineWidth = armWidth + 3; ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-12, 3); ctx.moveTo(7, -3); ctx.lineTo(13, 1); ctx.stroke();
        ctx.strokeStyle = bodyGradient; ctx.lineWidth = armWidth; ctx.beginPath(); ctx.moveTo(-7, -3); ctx.lineTo(-12, 3); ctx.moveTo(7, -3); ctx.lineTo(13, 1); ctx.stroke();
        ctx.fillStyle = fighter.suit; ctx.beginPath(); ctx.arc(-12, 3, 3, 0, Math.PI * 2); ctx.arc(13, 1, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#101a2b'; ctx.beginPath(); ctx.roundRect(-10, -8, 20, 22, 7); ctx.fill();
        ctx.fillStyle = bodyGradient; ctx.beginPath(); ctx.moveTo(-7, -7); ctx.quadraticCurveTo(-9, -8, -8, -3); ctx.lineTo(-7, 8); ctx.quadraticCurveTo(0, 13, 7, 8); ctx.lineTo(8, -3); ctx.quadraticCurveTo(9, -8, 7, -7); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#101a2b'; ctx.beginPath(); ctx.ellipse(-7, -4, 4, 4, -.4, 0, Math.PI * 2); ctx.ellipse(7, -4, 4, 4, .4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = bodyGradient; ctx.beginPath(); ctx.ellipse(-7, -4, 3, 3, -.4, 0, Math.PI * 2); ctx.ellipse(7, -4, 3, 3, .4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.52)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-5, -4); ctx.lineTo(-4, 3); ctx.stroke();
        ctx.fillStyle = '#101a2b'; ctx.beginPath(); ctx.moveTo(-4, 1); ctx.lineTo(4, 1); ctx.lineTo(5, 7); ctx.quadraticCurveTo(0, 10, -5, 7); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(5,14,27,.78)'; ctx.beginPath(); ctx.roundRect(-3, 3, 6, 4, 1.5); ctx.fill();
        ctx.fillStyle = teamColor; ctx.shadowBlur = 8; ctx.shadowColor = teamColor; ctx.beginPath(); ctx.arc(2, 5, 1.6, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,.48)'; ctx.fillRect(-6, -6, 2, 1); ctx.fillRect(4, -6, 2, 1);
        ctx.strokeStyle = 'rgba(5,14,27,.65)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-6, 8); ctx.lineTo(-5, 11); ctx.moveTo(6, 8); ctx.lineTo(5, 11); ctx.stroke();
        ctx.fillStyle = '#101a2b'; ctx.beginPath(); ctx.ellipse(0, -15, 8, 9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = helmetGradient; ctx.beginPath(); ctx.ellipse(-1, -16, 6.5, 7.5, -.12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#14263c'; ctx.beginPath(); ctx.ellipse(3, -16, 4.2, 4, .15, -Math.PI * .48, Math.PI * .48); ctx.fill();
        ctx.strokeStyle = 'rgba(111,255,233,.82)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(1, -17); ctx.lineTo(5, -17); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.68)'; ctx.beginPath(); ctx.ellipse(-3, -19, 1.4, 2.2, -.35, 0, Math.PI * 2); ctx.fill();
        if (fighter.characterId === 'titan') {
          ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.roundRect(-13, -6, 6, 14, 2); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.46)'; ctx.fillRect(-12, -4, 2, 8);
          ctx.fillStyle = '#fbbf24'; ctx.fillRect(-5, 0, 9, 2);
        } else if (fighter.characterId === 'medic') {
          ctx.fillStyle = '#eef2e8'; ctx.fillRect(-3, -2, 7, 7); ctx.fillStyle = '#ff6eaa'; ctx.fillRect(-1, -1, 3, 5); ctx.fillRect(-2, 0, 5, 2);
        } else if (fighter.characterId === 'engineer') {
          ctx.fillStyle = '#facc15'; ctx.fillRect(-7, -9, 4, 2); ctx.fillStyle = '#101a2b'; ctx.fillRect(-7, -8, 4, 2);
        }
        if (showingBack) {
          ctx.fillStyle = '#142338'; ctx.beginPath(); ctx.roundRect(-5, -3, 9, 11, 2); ctx.fill();
          ctx.fillStyle = fighter.suit; ctx.fillRect(-3, -1, 6, 4);
          ctx.fillStyle = teamColor; ctx.shadowBlur = 8; ctx.shadowColor = teamColor; ctx.fillRect(-3, 5, 2, 2); ctx.fillRect(2, 5, 2, 2); ctx.shadowBlur = 0;
        }
      }
      ctx.fillStyle = '#101a2b'; ctx.beginPath(); ctx.roundRect(7, -3, 13, 6, 2); ctx.fill();
      ctx.fillStyle = fighter.characterId === 'titan' ? '#fbbf24' : fighter.suit; ctx.beginPath(); ctx.roundRect(8, -2, 10, 3, 1); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(9, -2, 4, 1);
      if (fighter.characterId === 'sniper') {
        ctx.fillStyle = '#111d31'; ctx.fillRect(10, -4, 12, 2); ctx.fillStyle = '#d9f7f2'; ctx.fillRect(13, -5, 4, 1); ctx.fillStyle = '#6fffe9'; ctx.fillRect(19, -4, 2, 2);
      } else if (fighter.attackType === 'throw') {
        ctx.fillStyle = '#101a2b'; ctx.beginPath(); ctx.roundRect(-9, -1, 7, 8, 2); ctx.fill(); ctx.fillStyle = fighter.suit; ctx.beginPath(); ctx.arc(-5.5, 1, 2.2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f9d76e'; ctx.fillRect(-6, 5, 2, 1);
      } else if (fighter.characterId === 'titan') {
        ctx.fillStyle = '#fbbf24'; ctx.fillRect(17, -3, 5, 5); ctx.fillStyle = '#fff1b2'; ctx.fillRect(19, -2, 2, 3);
      }
      if (fighter.recoil > 0) { ctx.strokeStyle = colors.yellow; ctx.lineWidth = 2; ctx.shadowBlur = 14; ctx.shadowColor = colors.yellow; ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(21 + fighter.recoil * 32, 0); ctx.stroke(); ctx.shadowBlur = 0; }
      ctx.restore();
      ctx.save(); ctx.globalAlpha = .45; ctx.strokeStyle = teamColor; ctx.lineWidth = fighter.controlled ? 2 : 1; ctx.beginPath(); ctx.ellipse(fighter.x, fighter.y + 2, fighter.controlled ? 21 : 18, fighter.controlled ? 8 : 7, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      ctx.fillStyle = 'rgba(0,0,0,.68)'; ctx.fillRect(fighter.x - 14, fighter.y - 28, 28, 3);
      ctx.fillStyle = teamColor; ctx.shadowBlur = 5; ctx.shadowColor = teamColor; ctx.fillRect(fighter.x - 14, fighter.y - 28, 28 * Math.max(0, fighter.hp) / 100, 3); ctx.shadowBlur = 0;
      ctx.fillStyle = teamColor; ctx.font = '700 7px Space Mono'; ctx.textAlign = 'center'; ctx.shadowBlur = 4; ctx.shadowColor = '#07111f'; ctx.fillText(fighter.controlled ? playerName : fighter.displayName.toUpperCase(), fighter.x, fighter.y - 33); ctx.shadowBlur = 0;
    });
    ctx.restore();
    if (state === 'playing' && selectedMap !== 'custom') {
      const miniWidth = 154, miniHeight = 86, miniX = width - miniWidth - 14, miniY = 14;
      ctx.fillStyle = 'rgba(4,12,24,.82)'; ctx.fillRect(miniX, miniY, miniWidth, miniHeight); ctx.strokeStyle = 'rgba(111,255,233,.55)'; ctx.lineWidth = 1; ctx.strokeRect(miniX, miniY, miniWidth, miniHeight);
      const miniXFor = value => miniX + value / worldWidth * miniWidth, miniYFor = value => miniY + value / worldHeight * miniHeight;
      coverBlocks.forEach(block => { ctx.fillStyle = 'rgba(111,255,233,.2)'; ctx.fillRect(miniXFor(block.x), miniYFor(block.y), block.width / worldWidth * miniWidth, block.height / worldHeight * miniHeight); });
      [...allies, ...enemies].forEach(fighter => { if (fighter.hp <= 0) return; ctx.fillStyle = fighter.team === 'blue' ? colors.cyan : colors.orange; ctx.fillRect(miniXFor(fighter.x) - 2, miniYFor(fighter.y) - 2, 4, 4); });
      if (player && player.hp > 0) { ctx.fillStyle = colors.white; ctx.shadowBlur = 8; ctx.shadowColor = colors.white; ctx.fillRect(miniXFor(player.x) - 3, miniYFor(player.y) - 3, 6, 6); ctx.shadowBlur = 0; }
      if (footballBall) { ctx.fillStyle = colors.yellow; ctx.beginPath(); ctx.arc(miniXFor(footballBall.x), miniYFor(footballBall.y), 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.strokeStyle = 'rgba(255,255,255,.82)'; ctx.lineWidth = 1;
      ctx.strokeRect(miniXFor(camera.x - width / (2 * camera.zoom)), miniYFor(camera.y - height / (2 * camera.zoom)), width / camera.zoom / worldWidth * miniWidth, height / camera.zoom / worldHeight * miniHeight);
    }
    if (pointer && player.hp > 0) { const centeredX = (pointer.x - camera.x) * camera.zoom; const centeredY = (pointer.y - camera.y) * camera.zoom; const pointerScreenX = centeredX * Math.cos(viewRotation) - centeredY * Math.sin(viewRotation) + width / 2; const pointerScreenY = centeredX * Math.sin(viewRotation) + centeredY * Math.cos(viewRotation) + height / 2; ctx.strokeStyle = 'rgba(111,255,233,.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pointerScreenX - 9, pointerScreenY); ctx.lineTo(pointerScreenX + 9, pointerScreenY); ctx.moveTo(pointerScreenX, pointerScreenY - 9); ctx.lineTo(pointerScreenX, pointerScreenY + 9); ctx.arc(pointerScreenX, pointerScreenY, 14, 0, Math.PI * 2); ctx.stroke(); }
    if (screenFlash > 0) { ctx.fillStyle = `rgba(249,215,110,${screenFlash * .18})`; ctx.fillRect(0, 0, width, height); }
    if (damageFlash > 0) { ctx.fillStyle = `rgba(255,71,87,${damageFlash * .14})`; ctx.fillRect(0, 0, width, height); }
    if (state === 'paused') { ctx.fillStyle = 'rgba(4,12,24,.72)'; ctx.fillRect(0, 0, width, height); ctx.textAlign = 'center'; ctx.fillStyle = colors.cyan; ctx.font = '800 54px Barlow Condensed'; ctx.fillText('PAUZA', width / 2, height / 2 - 8); ctx.fillStyle = colors.white; ctx.font = '700 10px Space Mono'; ctx.fillText('STLAČ P PRE POKRAČOVANIE', width / 2, height / 2 + 20); }
  }

  function loop(now) { if (state === 'paused') { draw(); animationId = 0; return; } if (state !== 'playing') { draw(); return; } const dt = Math.min((now - lastTime) / 1000, .04); lastTime = now; update(dt); draw(); animationId = requestAnimationFrame(loop); }
  window.addEventListener('pointerup', () => { mapMakerPainting = false; mapMakerStrokeRecorded = false; });
  window.addEventListener('blur', () => { mapMakerPainting = false; mapMakerStrokeRecorded = false; });
  window.addEventListener('keydown', event => {
    if (!systemContent.querySelector('.map-editor') || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') return;
    if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select')) return;
    event.preventDefault();
    if (event.shiftKey) redoMapEdit();
    else undoMapEdit();
  });
  function triggerDash() { if (state === 'playing') firing = true; }
  function pointerPosition(event) { const rect = canvas.getBoundingClientRect(); const screenX = (event.clientX - rect.left) * width / rect.width; const screenY = (event.clientY - rect.top) * height / rect.height; const cos = Math.cos(-viewRotation); const sin = Math.sin(-viewRotation); const centeredX = screenX - width / 2; const centeredY = screenY - height / 2; const worldScreenX = centeredX * cos - centeredY * sin; const worldScreenY = centeredX * sin + centeredY * cos; const camera = getCamera(); const worldX = camera.x + worldScreenX / camera.zoom; const worldY = camera.y + worldScreenY / camera.zoom; return player ? { x: player.x + (worldX - player.x) * settings.mouseSensitivity, y: player.y + (worldY - player.y) * settings.mouseSensitivity } : { x: worldX, y: worldY }; }
  function chooseArenaCharacter(position) { if (state !== 'ready') return false; const candidate = [player, ...allies].find(fighter => fighter && fighter.hp > 0 && distance(fighter, position) < 30); if (!candidate || !ownedCharacters.includes(candidate.characterId)) return false; selectedCharacterId = candidate.characterId; persistGarage(); renderShop(); matchHint.textContent = `${candidate.displayName.toUpperCase()} VYBRANÝ DO ZÁPASU.`; return true; }

  window.addEventListener('resize', resize); window.addEventListener('keydown', event => { const key = event.key.toLowerCase(); if (rebinding) { settings.bindings[rebinding] = key; saveSettings(); settingsMessage.textContent = `NOVÁ KLÁVESA: ${key === ' ' ? 'SPACE' : key.toUpperCase()}`; rebinding = null; updateKeyButtons(); event.preventDefault(); return; } if (state === 'playing' && key.startsWith('arrow')) event.preventDefault(); if (key === 'p' && (state === 'playing' || state === 'paused')) { state = state === 'playing' ? 'paused' : 'playing'; matchStatus.textContent = state === 'paused' ? 'PAUZA' : 'ZÁPAS PREBIEHA'; matchStatus.className = `match-status ${state === 'paused' ? 'lost' : 'playing'}`; if (state === 'playing') { lastTime = performance.now(); cancelAnimationFrame(animationId); animationId = requestAnimationFrame(loop); } return; } keys.add(key); if (key === 'e' && state === 'playing' && isFootballMap()) { if (!kickLooseFootball(player)) matchStatus.textContent = footballBall?.carrier ? 'LOPTU DRŽÍ SÚPER / PRIHRÁVKA LETÍ' : 'PRÍĎ K LOPTE A STLAČ E PRE KOP'; } if (key === 'shift' || key === ' ') { event.preventDefault(); triggerDash(); } if (key === 'enter' && state !== 'playing') start(); }); window.addEventListener('keyup', event => { const key = event.key.toLowerCase(); keys.delete(key); if (key === 'shift' || key === ' ') firing = false; });
  canvas.addEventListener('pointerdown', event => { const position = pointerPosition(event); if (chooseArenaCharacter(position)) return; pointer = position; firing = true; canvas.setPointerCapture(event.pointerId); }); canvas.addEventListener('pointermove', event => { viewRotation = 0; pointer = pointerPosition(event); }); canvas.addEventListener('pointerup', () => { pointer = null; firing = false; }); canvas.addEventListener('pointercancel', () => { pointer = null; firing = false; });
  function updateJoystick(event) { const rect = mobileJoystick.getBoundingClientRect(); const x = event.clientX - (rect.left + rect.width / 2); const y = event.clientY - (rect.top + rect.height / 2); const length = Math.min(25, Math.hypot(x, y)); const angle = Math.atan2(y, x); joystick.x = Math.cos(angle) * length / 25; joystick.y = Math.sin(angle) * length / 25; joystickKnob.style.transform = `translate(${joystick.x * 25}px, ${joystick.y * 25}px)`; }
  mobileJoystick.addEventListener('pointerdown', event => { joystick.active = true; mobileJoystick.setPointerCapture(event.pointerId); updateJoystick(event); }); mobileJoystick.addEventListener('pointermove', event => { if (joystick.active) updateJoystick(event); }); mobileJoystick.addEventListener('pointerup', () => { joystick.active = false; joystick.x = 0; joystick.y = 0; joystickKnob.style.transform = ''; }); mobileJoystick.addEventListener('pointercancel', () => { joystick.active = false; joystick.x = 0; joystick.y = 0; joystickKnob.style.transform = ''; });
  gadgetButton.addEventListener('click', useGadget); hyperButton.addEventListener('click', useHypercharge); window.addEventListener('keydown', event => { if (event.key.toLowerCase() === 'q') useGadget(); if (event.key.toLowerCase() === 'f') useHypercharge(); });
  modePicker.querySelectorAll('.option-button').forEach(button => button.addEventListener('click', () => chooseMode(button.dataset.mode)));
  duelSlots.forEach((slot, index) => slot.addEventListener('change', () => { duelRoster[index] = slot.value; }));
  mapPicker.querySelectorAll('.option-button').forEach(button => button.addEventListener('click', () => button.dataset.map === 'random' ? chooseRandomMap() : chooseMap(button.dataset.map)));
  document.querySelectorAll('[data-hub-tab]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-hub-tab]').forEach(tabButton => tabButton.classList.toggle('active', tabButton === button)); renderBrawlerHub(button.dataset.hubTab); }));
  document.querySelectorAll('[data-system-tab]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-system-tab]').forEach(tabButton => tabButton.classList.toggle('active', tabButton === button)); renderSystemHub(button.dataset.systemTab); }));
  document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', () => openMenuSection(button.dataset.menu)));
  document.getElementById('trophyRoadButton').addEventListener('click', openTrophyRoad);
  shopToggle.addEventListener('click', () => setShopVisible(shopPanel.hidden));
  panelToggle.addEventListener('click', () => { if (sidePanel.hidden) setPanelView('settings'); setPanelVisible(sidePanel.hidden); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape' && !sidePanel.hidden) setPanelVisible(false); });
  startButton.addEventListener('click', start); restartButton.addEventListener('click', start); chooseGameButton.addEventListener('click', showGamePicker);
  redeemCodeButton.addEventListener('click', redeemRewardCode); rewardCode.addEventListener('keydown', event => { if (event.key === 'Enter') redeemRewardCode(); });
  playerNameInput.addEventListener('input', () => { playerName = playerNameInput.value.trim().slice(0, 12) || 'TY'; storage.set(playerNameKey, playerName); });
  function updateKeyButtons() { document.querySelectorAll('[data-bind]').forEach(button => { const value = settings.bindings[button.dataset.bind]; button.textContent = value === ' ' ? 'SPACE' : value.toUpperCase(); }); }
  settingsToggle.addEventListener('click', () => { settingsPanel.hidden = !settingsPanel.hidden; settingsToggle.setAttribute('aria-expanded', String(!settingsPanel.hidden)); });
  qualitySetting.addEventListener('change', () => updateSetting('quality', qualitySetting.value)); resolutionSetting.addEventListener('change', () => updateSetting('resolution', resolutionSetting.value)); uiScaleSetting.addEventListener('input', () => updateSetting('uiScale', Number(uiScaleSetting.value))); mouseSetting.addEventListener('input', () => updateSetting('mouseSensitivity', Number(mouseSetting.value))); volumeSetting.addEventListener('input', () => updateSetting('volume', Number(volumeSetting.value)));
  document.querySelectorAll('[data-bind]').forEach(button => button.addEventListener('click', () => { rebinding = button.dataset.bind; settingsMessage.textContent = 'STLAČ NOVÚ KLÁVESU...'; }));
  document.getElementById('saveSlot1').addEventListener('click', () => saveSlot(1)); document.getElementById('loadSlot1').addEventListener('click', () => loadSlot(1)); document.getElementById('saveSlot2').addEventListener('click', () => saveSlot(2)); document.getElementById('loadSlot2').addEventListener('click', () => loadSlot(2));
  ensureSocialData(); trophyRoadReward(); updateKeyButtons(); applySettings();
  renderShop(); renderMatchOptions(); resize(); reset(); draw();
})();
