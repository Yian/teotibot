const avenue = "avenue";
const any = "any";
const wood = "wood";
const gold = "gold";
const stone = "stone";
const cocoa = "cocoa";
const templeRed = "tr";
const templeBlue = "tb";
const templeGreen = "tg";
const templeOrange = "to";
const powerup = "powerup";
const tech = "tech";
const discovery = "discovery";
const worship = "worship";
const worker = "worker";
const ascension = "ascension";
const pyramid = "pyramid";
const templeWild = "tw";
const base = "base";
const xitle = "xitle";

export const StartScreen = 1;
export const SetupScreen = 2;
export const AppScreen = 3;
export const OptionsScreen = 4;

export const initialOrdering = [0, 1, 2, 3, 4, 5, 6];
export const tileToolTip = [
  [2, 3],
  [4, 5],
  [6, 7, 8],
  [9, 10],
  [11, 12],
];
export const initialDirectionOrdering = [0, 1];
export const players = [3, 4, 5, 6];

export const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const actionNames = [
  { name: "Palace", value: 1, color: "#9a3b2e" },
  { name: "Forest", value: 2, color: "#c6beaf" },
  { name: "Stone Quarry", value: 3, color: "#917c6d" },
  { name: "Gold Deposit", value: 4, color: "#917c6d" },
  { name: "Alchemy", value: 5, color: "#a5743e" },
  { name: "Nobles", value: 6, color: "#647f8b" },
  { name: "Decorations", value: 7, color: "#8aa89e" },
  { name: "Construction", value: 8, color: "#a3655a" },
];

export const diceFaces = [
  { name: "d1", value: 1 },
  { name: "d2", value: 2 },
  { name: "d3", value: 3 },
  { name: "d4", value: 4 },
  { name: "d5", value: 5 },
  { name: "d6", value: 6 },
];

export const baseBotTiles = [
  { name: "alchemy" },
  { name: "construction" },
  { name: "decorations" },
  { name: "mask_collection" },
  { name: "mastery" },
  { name: "nobles" },
  { name: "worship" },
];

export const baseDirectionTiles = [{ name: "left" }, { name: "right" }];

// Starting Tiles
export const baseStartTiles = [
  {
    name: "ST1",
    numbers: [1, 2],
    tooltip:
      "Advance on the Avenue of the Dead track and gain 2 cocoa and 3 wood.",
    resources: [
      { quantity: 1, type: avenue },
      { quantity: 2, type: cocoa },
      { quantity: 3, type: wood },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST2",
    numbers: [4, 3],
    tooltip:
      "Advance on the green temple (gaining its reward) and gain 2 stone and 3 gold.",
    resources: [
      { quantity: 1, type: templeGreen },
      { quantity: 2, type: stone },
      { quantity: 3, type: gold },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST3",
    numbers: [2, 3],
    tooltip:
      "Advance on the blue temple (gaining its reward) and gain 4 wood and 1 stone.",
    resources: [
      { quantity: 1, type: templeBlue },
      { quantity: 4, type: wood },
      { quantity: 1, type: stone },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST4",
    numbers: [1, 4],
    tooltip:
      "Advance on the red temple (gaining its reward) and gain 5 cocoa and 2 gold.",
    resources: [
      { quantity: 1, type: templeRed },
      { quantity: 5, type: cocoa },
      { quantity: 2, type: gold },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST5",
    numbers: [4, 5],
    tooltip:
      "Select the lowest numbered Technology tile on the Alchemy (5) Action Board, and place your marker on it for free. Gain the associated temple advance (and its reward) plus 2 gold.",
    resources: [
      { quantity: 1, type: tech },
      { quantity: 2, type: gold },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST6",
    numbers: [2, 4],
    tooltip:
      "Increase the power of one of your starting workers. Gain 3 wood and 2 gold.",
    resources: [
      { quantity: 1, type: powerup },
      { quantity: 3, type: wood },
      { quantity: 2, type: gold },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST7",
    numbers: [5, 8],
    tooltip:
      "Select the lowest numbered Technology tile on the Alchemy (5) Action Board, and place your marker on it for free. Gain the associated temple advance (and its reward) plus any 2 resources.",
    resources: [
      { quantity: 1, type: tech },
      { quantity: 2, type: any },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST8",
    numbers: [6, 7],
    tooltip:
      "Advance on the blue temple (gaining its reward) and gain 2 cocoa and 4 stone.",
    resources: [
      { quantity: 1, type: templeBlue },
      { quantity: 2, type: cocoa },
      { quantity: 4, type: stone },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST9",
    numbers: [5, 6],
    tooltip: "Advance on each of the three temples (gaining rewards).",
    resources: [
      { quantity: 1, type: templeBlue },
      { quantity: 1, type: templeRed },
      { quantity: 1, type: templeGreen },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST10",
    numbers: [7, 8],
    tooltip:
      "Advance on the red temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { quantity: 1, type: templeRed },
      { quantity: 1, type: powerup },
      { quantity: 5, type: cocoa },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST11",
    numbers: [6, 8],
    tooltip:
      "Advance on the green temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { quantity: 1, type: templeGreen },
      { quantity: 1, type: powerup },
      { quantity: 5, type: cocoa },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST12",
    numbers: [5, 7],
    tooltip:
      "Advance on the blue and red temples (gaining rewards), and gain any 2 resources.",
    resources: [
      { quantity: 1, type: templeBlue },
      { quantity: 1, type: templeRed },
      { quantity: 2, type: any },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST13",
    numbers: [3, 5],
    tooltip: "Gain 3 cocoa and 5 wood.",
    resources: [
      { quantity: 3, type: cocoa },
      { quantity: 5, type: wood },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST14",
    numbers: [3, 7],
    tooltip:
      "Gain 3 stone and 1 gold. You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile.",
    resources: [
      { quantity: 3, type: stone },
      { quantity: 1, type: gold },
      { quantity: 1, type: discovery },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST15",
    numbers: [2, 6],
    tooltip: "Gain 1 wood, 2 stone, and 3 gold.",
    resources: [
      { quantity: 1, type: wood },
      { quantity: 2, type: stone },
      { quantity: 3, type: gold },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST16",
    numbers: [4, 8],
    tooltip:
      "Gain 2 cocoa and 3 gold. You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile.",
    resources: [
      { quantity: 2, type: cocoa },
      { quantity: 3, type: gold },
      { quantity: 1, type: discovery },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST17",
    numbers: [3, 8],
    tooltip: "Gain 3 cocoa, 2 wood, and 3 stone.",
    resources: [
      { quantity: 3, type: cocoa },
      { quantity: 2, type: wood },
      { quantity: 3, type: stone },
    ],
    selected: false,
    src: base,
  },
  {
    name: "ST18",
    numbers: [2, 7],
    tooltip:
      "Advance on the Avenue of the Dead track and gain 1 wood and 2 stone.",
    resources: [
      { quantity: 1, type: avenue },
      { quantity: 1, type: wood },
      { quantity: 2, type: stone },
    ],
    selected: false,
    src: base,
  },
];

export const xitleStartTiles = [
  {
    name: "XST1",
    numbers: [1, 7],
    tooltip:
      "Take two separate Worship actions with two of your workers. You may activate the Worship space ability AND claim the Discovery tile without paying 1 cocoa to doing so. These two workers will begin the game locked.",
    resources: [{ quantity: 2, type: worship }],
    selected: false,
    src: xitle,
  },
  {
    name: "XST2",
    numbers: [6, 6], //Todo work this out
    tooltip:
      "Advance on the orange temple (gaining its reward) and gain 3 cocoa and 2 stone. You may place two of your starting workers on the Nobles (6) Action Board. (If you are playing without the Height of Development module from Teotihuacan: Late Preclassic Period, advance on the red temple instead of the orange temple.)",
    resources: [
      { quantity: 1, type: templeOrange, alt: templeRed },
      { quantity: 3, type: cocoa },
      { quantity: 2, type: stone },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST3",
    numbers: [4, 6],
    tooltip:
      "Gain your 4th worker with a power of 3. Then select a valid reward from the Ascension wheel. (All four of your workers must be placed on different Action Boards, if possible.)",
    resources: [
      { quantity: 1, type: worker },
      { quantity: 1, type: ascension },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST4",
    numbers: [4, 7],
    tooltip:
      "Advance on the orange temple (gaining its reward) and gain 2 wood and 3 gold. (If you are playing without the Height of Development module from Teotihuacan: Late Preclassic Period, advance on the blue temple instead of the orange temple.)",
    resources: [
      { quantity: 1, type: templeOrange, alt: templeBlue },
      { quantity: 2, type: wood },
      { quantity: 3, type: gold },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST5",
    numbers: [1, 5],
    tooltip:
      "Advance on two different temples of your choice (gaining rewards) and gain 2 cocoa.",
    resources: [
      { quantity: 2, type: templeWild },
      { quantity: 2, type: cocoa },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST6",
    numbers: [1, 8],
    tooltip:
      "Advance on two different temples of your choice (gaining rewards) and gain any 1 resource.",
    resources: [
      { quantity: 2, type: templeWild },
      { quantity: 1, type: any },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST7",
    numbers: [2, 8],
    tooltip: "Advance on the Pyramid track and gain 2 wood and 2 gold.",
    resources: [
      { quantity: 1, type: pyramid },
      { quantity: 2, type: wood },
      { quantity: 2, type: gold },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST8",
    numbers: [2, 5],
    tooltip: "Advance on the Pyramid track and gain 3 cocoa and 1 stone.",
    resources: [
      { quantity: 1, type: pyramid },
      { quantity: 3, type: cocoa },
      { quantity: 1, type: stone },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST9",
    numbers: [7, 7],
    tooltip:
      "Select the highest numbered Technology tile on the Alchemy (5) Action Board and place your marker on it for free. Gain the associated temple advancement (and its reward) plus any 1 resource. You may place two of your starting workers on the Decorations/Architecture (7) Action Board.",
    resources: [
      { quantity: 1, type: tech },
      { quantity: 1, type: any },
    ],
    selected: false,
    src: xitle,
  },
  {
    name: "XST10",
    numbers: [3, 6],
    tooltip:
      "Select the highest numbered Technology tile on the Alchemy (5) Action Board and place your marker on it for free. Gain the associated temple advancement (and its reward). You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile. 8",
    resources: [
      { quantity: 1, type: tech },
      { quantity: 1, type: discovery },
    ],
    selected: false,
    src: xitle,
  },
];

// Tech tiles
export const baseTechTiles = [
  {
    name: "TT1",
    tooltip:
      "Each time you land on or move a worker over the Palace (1) Action Board, you gain 1 cocoa.",
    src: base,
  },
  {
    name: "TT2",
    tooltip:
      "Each time you perform the Main action of Alchemy (5) or Nobles (6) Action Boards, gain 3 Victory Points.",
    src: base,
  },
  {
    name: "TT3",
    tooltip:
      "Each time you perform the Main action of Forest (2), Stone Quarry (3), Gold Deposits (4), you get one (additional) wood, stone, gold, respectively.",
    src: base,
  },
  {
    name: "TT4",
    tooltip:
      "Each time you perform the Main action of the Forest (2), Stone Quarry (3), or Gold Deposits (4) Action Boards, gain 1 cocoa and 1 Victory Point.",
    src: base,
  },
  {
    name: "TT5",
    tooltip:
      "Each time you perform the Main action of the Decorations (7) Action Board, gain 4 Victory Points.",
    src: base,
  },
  {
    name: "TT6",
    tooltip:
      "Each time you perform the Main action of the Construction (8) Action Board, gain 3 Victory Points (regardless of the number of tiles placed).",
    src: base,
  },
  {
    name: "TT7",
    tooltip:
      "Each time one of your workers gains a power-up as part of a Main action, you may pay 1 cocoa to power up once more (same or different worker) on the same Action Board.",
    src: base,
  },
  {
    name: "TT8",
    tooltip:
      "Each time you perform the Main action of the Construction (8) Action Board, resolve it as if you had an additional worker, that also granted a discount of 1 resource.",
    src: base,
  },
  {
    name: "TT9",
    tooltip:
      "Each time you perform the Main action of the Construction (8) Action Board, advance on one temple (regardless of the number of tiles placed).",
    src: base,
  },
];

export const xitleTechTiles = [
  {
    name: "XTT1",
    tooltip:
      "Each time you move a worker onto or past the Palace (1) Action Board, you may immediately exchange up to 4 resources of one type (wood, stone, or gold) into the same number of resources of a different type",
    src: xitle,
  },
  {
    name: "XTT2",
    tooltip:
      "When taking the Collect Cocoa action, collect 1 more cocoa than normal.",
    src: xitle,
  },
  {
    name: "XTT3",
    tooltip:
      "At the end of your turn, if you unlocked one or more of your workers, gain 4 Victory Points.",
    src: xitle,
  },
  {
    name: "XTT4",
    tooltip:
      "When claiming a mask Discovery tile, gain 2 Victory Points. If you acquired both this Technology and a mask Discovery tile as a benefits from your Starting tiles, immediately apply the benefit of this Technology.",
    src: xitle,
  },
  {
    name: "XTT5",
    tooltip:
      "During Eclipse scoring, after paying the salary for your workers as normal, you may pay 1 additional cocoa for each worker you have. If you do so, immediately gain 2 Victory Points for each worker you have.",
    src: xitle,
  },
  {
    name: "XTT6",
    tooltip:
      "After performing the Main action of the Decorations/Architecture (7) Action Board, if you placed one or more Decoration tiles, advance your marker one additional step on the Pyramid track.",
    src: xitle,
  },
  {
    name: "XTT7",
    tooltip:
      "At the end of your turn, if you unlocked all of your locked workers — either by paying cocoa (normally 3 cocoa) or by unlocking them for free (in lieu of taking a normal turn) — advance your marker once on a temple of your choice.",
    src: xitle,
  },
  {
    name: "XTT8",
    tooltip:
      "When performing the Main action of the Decorations/Architecture (7) Action Board, you may place Decoration tiles without consideration for which way the arrow is pointing.",
    src: xitle,
  },
  {
    name: "XTT9",
    tooltip:
      "After performing the Main action of the Nobles (6) Action Board, if you placed one or more Buildings, advance your marker once on a temple of your choice.",
    src: xitle,
  },
  {
    name: "XTT10",
    tooltip:
      "Before taking a normal turn, you may move one of your unlocked workers exactly 1 space backwards (counterclockwise), but without performing an action with that worker. Afterwards, move a different unlocked worker, and perform an action on the Action Board the second worker moved to, as normal.",
    src: xitle,
  },
];

// Temple Tiles
export const baseTempleTiles = [
  {
    name: "BT1",
    tooltip: "Score your highest scoring mask set one more time.",
    src: base,
  },
  {
    name: "BT2",
    tooltip:
      "Score 5 Victory Points for each Technology tile with your marker.",
    src: base,
  },
  { name: "BT3", tooltip: "Score 15 Victory Points." },
  {
    name: "BT4",
    tooltip:
      "Score 3 Victory Points for each step you progressed on the Avenue of the Dead track.",
    src: base,
  },
  {
    name: "BT5",
    tooltip:
      "Score 9 Victory Points for each Bonus tile you unlocked, including this tile.",
    src: base,
  },
  {
    name: "BT6",
    tooltip:
      "Score 2 Victory Points for each nonmask Discovery tile you have (used or unused).",
    src: base,
  },
  {
    name: "BT7",
    tooltip:
      "Score for your workers: for each worker with 1-3 power, score 4 Victory Points; for each worker with 4-5 power, score 9 Victory Points.",
    src: base,
  },
];

export const basePriestPriestessTiles = [
  { name: "pp1", src: base },
  { name: "pp2", src: base },
  { name: "pp3", src: base },
  { name: "pp4", src: base },
  { name: "pp5", src: base },
  { name: "pp6", src: base },
  { name: "pp7", src: base },
  { name: "pp8", src: base },
  { name: "pp9", src: base },
  { name: "pp10", src: base },
];

export const baseTeotiPriestPriestessTiles = [
  { name: "ppt1", src: base },
  { name: "ppt2", src: base },
  { name: "ppt3", src: base },
  { name: "ppt4", src: base },
  { name: "ppt5", src: base },
  { name: "ppt6", src: base },
];
