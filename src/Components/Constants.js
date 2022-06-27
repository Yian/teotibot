import { isEmpty } from "lodash-es";
import {
  directionTileLeft,
  directionTileLeft2Step,
  directionTileLeft2StepFlipped,
  directionTileLeft3Step,
  directionTileLeft3StepFlipped,
  directionTileRight,
  directionTileRight2Step,
  directionTileRight2StepFlipped,
  directionTileRight3Step,
  directionTileRight3StepFlipped,
} from "./Tiles/TileList.css";

import { getActionItemByName } from "./Logic";

export const num_trans = [
  {
    fig: "L",
    op: { range: [0.75, 1], output: [0, 1] },
    trans: {
      range: [0.75, 1],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "o",
    op: {
      range: [0.25, 0.5],
      output: [0, 1],
    },
    trans: {
      range: [0.25, 0.5],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "a",
    op: {
      range: [0, 0.25],
      output: [0, 1],
    },
    trans: {
      range: [0, 0.25],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "d",
    op: {
      range: [0.5, 0.75],
      output: [0, 1],
    },
    trans: {
      range: [0.5, 0.75],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "i",
    op: { range: [0.75, 1], output: [0, 1] },
    trans: {
      range: [0.75, 1],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "n",
    op: {
      range: [0.25, 0.5],
      output: [0, 1],
    },
    trans: {
      range: [0.25, 0.5],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
  {
    fig: "g",
    op: {
      range: [0, 0.25],
      output: [0, 1],
    },
    trans: {
      range: [0, 0.25],
      output: [-40, 0],
      extrapolate: "clamp",
    },
  },
];

export const backgroundsToPreload = [
  "forms",
  "late-preclassic",
  "main",
  "period",
  "xitle",
];

export const resourcesToPreload = [
  "5cocoa",
  "any",
  "ascension",
  "avenue",
  "back",
  "cancel",
  "cocoa",
  "discovery",
  "mdiscovery",
  "eclipse",
  "gold",
  "obsidian",
  "hod1",
  "hod2",
  "hod3",
  "powerup",
  "pyramidt",
  "wood",
  "stone",
  "tr",
  "tb",
  "tg",
  "to",
  "tw",
  "tech",
  "worship",
  "worker",
  "ascension",
];

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
const obsidian = "obsidian";
const tech = "tech";
const discovery = "discovery";
const majorDiscovery = "mdiscovery";
const worship = "worship";
const worker = "worker";
const ascension = "ascension";
const pyramid = "pyramid";
const templeWild = "tw";
const base = "base";
const xitle = "xitle";
const period = "period";

const alchemy = "alchemy";
const construction = "construction";
const decorations = "decorations";
const mask_collection = "mask_collection";
const mastery = "mastery";
const masteryForest = "masteryForest";
const masteryQuarry = "masteryQuarry";
const masteryGold = "masteryGold";
const masteryAlchemy = "masteryAlchemy";
const masteryNobles = "masteryNobles";
const masteryDecorations = "masteryDecorations";
const masteryConstruction = "masteryConstruction";
const nobles = "nobles";
const eclipse = "eclipse";

export const Eclipse = "Eclipse";
export const noNeutralDice = 3;

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
export const initialAlternativeDirectionOrdering = [0, 1, 2, 3];
export const players = [3, 4, 5, 6];

export const diceTilePositions = {
  2: 3,
  3: 3,
  4: 1,
  5: 1,
  6: 0,
  7: 0,
  8: 0,
  9: 2,
  10: 2,
  11: 5,
  12: 5,
};

export const actionNames = [
  { name: "Palace", value: 1, color: "#9a3b2e" },
  { name: "Forest", value: 2, color: "#c6beaf" },
  { name: "Stone Quarry", value: 3, color: "#917c6d" },
  { name: "Gold Deposits", value: 4, color: "#917c6d" },
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
  { name: "Alchemy", src: "alchemy" },
  { name: "Construction", src: "construction" },
  { name: "Decorations", src: "decorations" },
  { name: "Mask Collection", src: "mask_collection" },
  { name: "Mastery", src: "mastery" },
  { name: "Nobles", src: "nobles" },
  { name: "Worship", src: "worship" },
];

export const baseDirectionTiles = [
  {
    name: "left",
    src: "left",
    css: directionTileLeft,
    type: "left",
    actionBoard: "next",
  },
  {
    name: "right",
    src: "right",
    css: directionTileRight,
    type: "right",
    actionBoard: "next",
  },
];

export const alternativeDirectionTilesStep2 = [
  {
    name: "step2",
    src: "rightstep2",
    css: directionTileRight2Step,
    initialCss: directionTileRight2Step,
    flippedCss: directionTileLeft2StepFlipped,
    stepTile: true,
    type: "right",
    actionBoard: "second",
  },
  {
    name: "step2",
    src: "leftstep2",
    css: directionTileLeft2Step,
    initialCss: directionTileLeft2Step,
    flippedCss: directionTileRight2StepFlipped,
    stepTile: true,
    type: "left",
    actionBoard: "second",
  },
];

export const alternativeDirectionTilesStep3 = [
  {
    name: "step3",
    src: "rightstep3",
    css: directionTileRight3Step,
    initialCss: directionTileRight3Step,
    flippedCss: directionTileLeft3StepFlipped,
    stepTile: true,
    type: "right",
    actionBoard: "third",
  },
  {
    name: "step3",
    src: "leftstep3",
    css: directionTileLeft3Step,
    initialCss: directionTileLeft3Step,
    flippedCss: directionTileRight3StepFlipped,
    stepTile: true,
    type: "left",
    actionBoard: "third",
  },
];

export const initialTeotibotStartingResources = (
  startingGold,
  startingWood,
  startingStone
) => {
  return [
    { quantity: startingGold, type: gold },
    { quantity: startingStone, type: stone },
    { quantity: startingWood, type: wood },
  ];
};

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
    numbers: [6, 6],
    tooltip:
      "Advance on the orange temple (gaining its reward) and gain 3 cocoa and 2 stone. You may place two of your starting workers on the Nobles (6) Action Board. (If you are playing without the Height of Development module from Teotihuacan: Late Preclassic Period, advance on the red temple instead of the orange temple.)",
    resources: [
      { quantity: 1, type: templeOrange, alt: templeRed },
      { quantity: 3, type: cocoa },
      { quantity: 2, type: stone },
    ],
    selected: false,
    duplicateNumbers: true,
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
    duplicateNumbers: true,
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

export const periodStartTiles = [
  {
    name: "PST1",
    numbers: [5, 5],
    tooltip:
      "Gain an obsidian, increase the power of one of your starting workers, and you may claim a random Major Discovery tile (by paying its cost). You may look at the Major Discovery tile before deciding to pick this tile.",
    resources: [
      { quantity: 1, type: majorDiscovery },
      { quantity: 1, type: powerup },
      { quantity: 1, type: obsidian },
    ],
    selected: false,
    duplicateNumbers: true,
    src: period,
  },
  {
    name: "PST2",
    numbers: [1, 6],
    tooltip: "Gain 3 obsidian and 4 cocoa.",
    resources: [
      { quantity: 3, type: obsidian },
      { quantity: 4, type: cocoa },
    ],
    selected: false,
    duplicateNumbers: true,
    src: period,
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

export const periodTechTiles = [
  {
    name: "PTT1",
    tooltip: "When gaining “any resource” you may gain obsidian instead.",
    src: period,
  },
  {
    name: "PTT2",
    tooltip:
      "You may spend 1 obsidian in place of up to 3 cocoa. No change is given.",
    src: period,
  },
  {
    name: "PTT3",
    tooltip:
      "Whenever you perform the Collect Cocoa action or Worship at a Royal tile, gain 1 obsidian.",
    src: period,
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
  { name: "BT3", tooltip: "Score 15 Victory Points.", src: base },
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

export const obsidianPriestPriestessTiles = [{ name: "ppp1", src: obsidian }];

export const baseTeotiPriestPriestessTiles = [
  { name: "ppt1", src: base },
  { name: "ppt2", src: base },
  { name: "ppt3", src: base },
  { name: "ppt4", src: base },
  { name: "ppt5", src: base },
  { name: "ppt6", src: base },
];

const getImage = (imagePath) => {
  return `<img class="icon" src=".${imagePath}" alt={}/>`;
};

const getActionImage = (imageName) => {
  return `<img class="icon" src="./actions/${imageName}.png" alt=${imageName}}/>`;
};

const getDiceImage = (imageName) => {
  return `<img class="icon" src="./dice/${imageName}.png" alt=${imageName}}/>`;
};

const getActionBoard = (actionName, noText) => {
  return `${actionName} ${getActionImage(
    `no${getActionItemByName(actionName).value}`
  )} ${!noText ? "Action Board" : ""}`;
};

export const getResourceImage = (imageName, className = "icon") => {
  return `<img class="${className}" src="./resources/${imageName}.png" alt=${imageName}}/>`;
};

const advancement = (isAlternateTeotibotMovement, topDirectionTile) => {
  if (isAlternateTeotibotMovement) {
    return altAdvancement(topDirectionTile);
  } else {
    return baseAdvancement;
  }
};

const baseAdvancement = `<ul><li>${getImage("/dice/d1.png")}${getImage(
  "/dice/d2.png"
)}${getImage(
  "/dice/d3.png"
)} clockwise to the next Action Board.</li><li>${getImage(
  "/dice/d4.png"
)}${getImage("/dice/d5.png")} clockwise to the second Action Board.</li></ul>`;

const getResourceImageStep = (actionBoard) => {
  if (actionBoard === "next") {
    return getResourceImage("step1");
  }
  if (actionBoard === "second") {
    return getResourceImage("step2");
  }
  if (actionBoard === "third") {
    return getResourceImage("step3");
  }
};

const altAdvancement = (topDirectionTile) => {
  return `<div class="margin">Clockwise to the ${
    topDirectionTile.actionBoard
  } ${getResourceImageStep(topDirectionTile.actionBoard)} Action Board.</div>`;
};

export const powerupMsg = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa
) => {
  return `<div>Teotibot gains
5 cocoa ${getResourceImage(
    "5cocoa"
  )} (exchange <span class="bold">10</span> cocoa for <span class="bold">${teotibotVPFor10Cocoa}</span> VP ${getResourceImage(
    "VP"
  )}), powers up ${getResourceImage("powerup")} its lowest powered worker, and
then advances it:</div>${advancement(
    isAlternateTeotibotMovement,
    topDirectionTile
  )}`;
};

// Question helpers
const templeTip = `<div class="templeTip"><div>*Advance Teotibot on its highest temple ignoring topmost.</div>
<div class="priority">
  Temple priority: <br/>
  ${getResourceImage("tb")} ->
  ${getResourceImage("tr")} ->
  ${getResourceImage("tg")}
</div>
<div class="priority">
  Resource priority:<br/>
  Least -> ${getResourceImage("gold")} -> ${getResourceImage(
  "stone"
)} -> ${getResourceImage("wood")}
</div></div>`;

const gainResources = (type, isObsidian, teotibotResourcesToGain) => {
  return !isObsidian
    ? `<span class="bold">2</span> ${type} ${getResourceImage(type)}`
    : `<span class="bold">${teotibotResourcesToGain}</span> ${type} ${getResourceImage(
        type
      )} and <span class="bold">1</span> obsidian ${getResourceImage(
        "obsidian"
      )}`;
};

const gainResourcesNoText = (type, isObsidian, teotibotResourcesToGain) => {
  return !isObsidian
    ? `<span class="bold">2</span> ${getResourceImage(type)}`
    : `<span class="bold">${teotibotResourcesToGain}</span> ${getResourceImage(
        type
      )} and <span class="bold">1</span> ${getResourceImage("obsidian")}`;
};

const hasResources = (type, isObsidian, numResources) => {
  return `<span class="bold">${numResources}</span> or more ${type} ${getResourceImage(
    type
  )} ${
    isObsidian ? `(including obsidian ${getResourceImage("obsidian")})` : ""
  }`;
};

const hasResourcesNoText = (type, isObsidian, numResources) => {
  return `≥ <span class="bold">${numResources}</span> ${getResourceImage(
    type
  )} ${isObsidian ? `(include ${getResourceImage("obsidian")})` : ""}`;
};

const hasResourcesOnBoard = (
  action,
  type,
  actionNo,
  numResources,
  isObsidian
) => {
  return `<div>Does Teotibot have ${hasResources(
    type,
    isObsidian,
    numResources
  )} and at least one worker on the ${action} ${getActionImage(
    `no${actionNo}`
  )} Action Board?</div>`;
};

const spendResources = (type, isObsidian, numResources) => {
  return `<span class="bold">${numResources}</span> ${type} ${getResourceImage(
    type
  )} ${
    isObsidian ? `(spending obsidian ${getResourceImage("obsidian")} last)` : ""
  }`;
};

const spendResourcesNoText = (type, isObsidian, numResources) => {
  return `<span class="bold">${numResources}</span> ${getResourceImage(type)} ${
    isObsidian ? `(spending ${getResourceImage("obsidian")} last)` : ""
  }`;
};

const getGoldDepositsReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain
) => {
  return `<div>Teotibot gains ${gainResources(
    gold,
    isObsidian,
    teotibotResourcesToGain
  )}</div>
  <div class="margin">Power up Teotibots worker ${getResourceImage(
    "powerup"
  )} on the Gold Deposits ${getActionImage("no4")}
  Action Board (this might trigger an Ascension, which is resolved
  normally). Then advance the powered-up worker (or the new worker, if the
  old one triggered Ascension)
  ${advancement(isAlternateTeotibotMovement, topDirectionTile)}
  </div>`;
};

const getQuarryReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain
) => {
  return `<div>Teotibot gains ${gainResources(
    stone,
    isObsidian,
    teotibotResourcesToGain
  )}</div>
  <div class="margin">Power up Teotibots worker ${getResourceImage(
    "powerup"
  )} on the Stone Quarry ${getActionImage("no3")}
  Action Board (this might trigger an Ascension, which is resolved
  normally). Then advance the powered-up worker (or the new worker, if the
  old one triggered Ascension)
  ${advancement(isAlternateTeotibotMovement, topDirectionTile)}
  </div>`;
};

const getForestReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain
) => {
  return `<div>Teotibot gains ${gainResources(
    wood,
    isObsidian,
    teotibotResourcesToGain
  )}</div>
  <div class="margin">Power up Teotibots worker ${getResourceImage(
    "powerup"
  )} on the Forest ${getActionImage("no2")}
  Action Board (this might trigger an Ascension, which is resolved
  normally). Then advance the powered-up worker (or the new worker, if the
  old one triggered Ascension)
  ${advancement(isAlternateTeotibotMovement, topDirectionTile)}
  </div>`;
};

const getConstructionReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  numResources,
  isObsidian
) => {
  return `<div>Teotibot spends ${spendResources(
    stone,
    isObsidian,
    numResources
  )} and places the leftmost pyramid ${getResourceImage("pyramidt")}
tile (rotated randomly) onto the top left,
lowest level space available on the Pyramid grid of the Main
Board. 
Then Teotibot: <ul>
<li>Scores Victory Points ${getResourceImage(
    "vp"
  )} for the level.</li><li>Advances on the Pyramid ${getResourceImage(
    "pyramid"
  )} track.</li>
<li><span class="bold">Advances*</span> on any temple by one. ${getResourceImage(
    "tw"
  )}</li><li>Scores an additional <span class="bold">2</span> Victory Points ${getResourceImage(
    "vp"
  )} (Note: This represents average points the
bot would score by matching icons.)</li>
</ul></div>
<div>
Power up ${getResourceImage("powerup")} Teotibots worker ${getDiceImage(
    "d3"
  )} on the Construction ${getActionImage("no8")}
Action Board (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the
old one triggered Ascension)
${advancement(isAlternateTeotibotMovement, topDirectionTile)}
${templeTip}
</div>`;
};

const isOnActionBoard = (type, num) => {
  return `<div>Does Teotibot have at least one worker on the ${type} ${getActionImage(
    `no${num}`
  )} Action Board? </div>`;
};

const getElipseBuilding = (eclipseStage) => {
  if (eclipseStage === 0) {
    return `<li>Place it in the <span class="bold">first (top)</span> row.</li>`;
  }
  if (eclipseStage === 1) {
    return `<li>Place it in the <span class="bold">second (center)</span> row.</li>`;
  }
  if (eclipseStage === 2) {
    return `<li>Place it in the <span class="bold">third (bottom)</span> row.</li>`;
  }
};

const getAlchemyReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian
) => {
  return `<div> Teotibot spends ${spendResources(
    gold,
    isObsidian,
    1
  )} and then gains
the technology ${getResourceImage(
    "tech"
  )} of the lowest number that does not have any markers (yours or Teotibot's). 
<ul>
<li>If all remaining tiles have your marker on, then the bot
gains the lowest numbered technology which it does not
yet have, while you score the <span class="bold">3</span> Victory Points ${getResourceImage(
    "vp"
  )} as normal.</li>
<li><span class="bold">Advance*</span> on the temple ${getResourceImage("tw")} matching the gained
Technology ${getResourceImage("tech")} and power up ${getResourceImage(
    "powerup"
  )} a worker on this Action Board
(resolve any Ascensions normally). Then the bot advances the powered-up worker
(or the new worker, if the old one triggered Ascension).</li></ul>
${advancement(isAlternateTeotibotMovement, topDirectionTile)}
${templeTip}
</div>
<div>
</div>`;
};

const getNoblesReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  eclipseStage,
  isObsidian
) => {
  return `<div>Teotibot spends ${spendResources(
    wood,
    isObsidian,
    2
  )} and builds a Building.
<ul>
${getElipseBuilding(eclipseStage)}
<li>If a row is full, place it into a space with the lowest printed
Victory Point value of all three rows.</li>
<li>Score the Victory Points ${getResourceImage(
    "vp"
  )} shown on the space just covered,
and advance the bot on the Avenue of the Dead ${getResourceImage(
    "avenue"
  )} (the same
way an actual player would advance).</li>
</ul></div>
<div>
Power up ${getResourceImage("powerup")} Teotibots worker ${getDiceImage(
    "d3"
  )} on the Nobles
Action Board ${getActionImage(
    "no6"
  )} (this might trigger an Ascension, which is resolved
normally). Then advance the powered-up worker (or the new worker, if the
old one triggered Ascension)
${advancement(isAlternateTeotibotMovement, topDirectionTile)}
</div>`;
};

const getDecorationsReward = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian
) => {
  return `<div> Teotibot spends ${spendResources(
    gold,
    isObsidian,
    2
  )} and places the topmost Decoration 
tile onto an available Decorations space on the Pyramid grid on the Main Board (clockwise from the top). 
Then Teotibot: <ul>
<li>Scores 5 Victory Points ${getResourceImage(
    "vp"
  )}.</li><li>Advances on the Pyramid track. ${getResourceImage("pyramid")}</li>
<li><span class="bold">Advances*</span> on any temple by one. ${getResourceImage(
    "tw"
  )}</li>
</ul></div>
<div>
Power up ${getResourceImage("powerup")} Teotibots worker ${getDiceImage(
    "d3"
  )} on the Decorations
Action Board ${getActionImage(
    "no7"
  )} (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the
old one triggered Ascension)
${advancement(isAlternateTeotibotMovement, topDirectionTile)}
${templeTip}
</div>`;
};

const maskQuestionText = () => {
  return `<div>If the bot does not yet have one of the masks available near
  one of the Worship actions ${getResourceImage(
    "worshipspace"
  )} (on the Palace ${getActionImage("no1")} Action Board
  or on any of the 4 temple bands) and it can pay for its cost,
  it pays that cost and immediately gains that mask.</div> 
  <div>
  <ul>
    <li>Draw a replacement for it immediately, and do not move any dice.</li>
    <li>Take the lowest number mask first</li>
    <li>If tied, it picks the first one clockwise from (and including) the Palace ${getActionImage(
      "no1"
    )} action board.</li>
  </ul>
</div>`;
};

// Questions
const alchemyQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian
) => {
  return [
    {
      question: hasResourcesOnBoard("Alchemy", gold, 5, 1, isObsidian),
      questionId: 1,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getAlchemyReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: `Power up ${getResourceImage("powerup")} ${getResourceImage(
        "powerup"
      )} its lowest unlocked worker
    by <span class="bold">2</span>, without carrying out any actions or advancing any
    workers.`,
      questionId: 3,
      condition: ({ answers }) =>
        answers[1] === "no" && answers[3] === undefined,
      isEnd: true,
      margin: 50,
    },
  ];
};

const decorationQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: hasResourcesOnBoard("Decorations", gold, 7, 2, isObsidian),
      questionId: 1,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getDecorationsReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: isOnActionBoard("Gold Deposits", 4),
      questionId: 3,
      condition: ({ answers }) =>
        answers[1] === "no" && answers[3] === undefined,
      margin: 50,
    },
    {
      question: getGoldDepositsReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      ),
      questionId: 4,
      condition: ({ answers }) => answers[3] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      ),
      questionId: 5,
      condition: ({ answers }) => answers[3] === "no",
      margin: 50,
      isEnd: true,
    },
  ];
};

const constructionQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: hasResourcesOnBoard("Construction", stone, 8, 2, isObsidian),
      questionId: 1,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getConstructionReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        2,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: isOnActionBoard("Stone Quarry", 3),
      questionId: 3,
      condition: ({ answers }) =>
        answers[1] === "no" && answers[3] === undefined,
      margin: 50,
    },
    {
      question: getQuarryReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      ),
      questionId: 4,
      condition: ({ answers }) => answers[3] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      ),
      questionId: 5,
      condition: ({ answers }) => answers[3] === "no",
      margin: 50,
      isEnd: true,
    },
  ];
};

const noblesQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  eclipseStage,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: hasResourcesOnBoard("Nobles", wood, 6, 2, isObsidian),
      questionId: 1,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getNoblesReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        eclipseStage,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: isOnActionBoard("Forest", 2),
      questionId: 3,
      condition: ({ answers }) =>
        answers[1] === "no" && answers[3] === undefined,
      margin: 50,
    },
    {
      question: getForestReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      ),
      questionId: 4,
      condition: ({ answers }) => answers[3] === "yes",
      isEnd: true,
      margin: 50,
    },
    {
      question: powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      ),
      questionId: 5,
      condition: ({ answers }) => answers[3] === "no",
      isEnd: true,
      margin: 50,
    },
  ];
};

const worshipQuestions = (teotibotStepsPerWorship) => {
  return [
    {
      question: `<div>Advance Teotibots worker on a Worship space to the next
    clockwise Worship space on a temple sidebar (remember:
    Teotibot always ignores the Palace Action Board ${getActionImage("no1")}).
    <ul>
    <li>If there is one of your workers on that space, the Teotibot unlocks that worker.</li>
    <li>The bot <span class="bold">advances*</span> on the matching temple by <span class="bold">${teotibotStepsPerWorship}</span> spaces,
    gaining rewards for both (and gaining printed bonuses
    instead of Discovery tiles as mentioned before).</li>
    <li>If the activated space is on the Decorations ${getActionImage(
      "no7"
    )} Action
    Board, the bot <span class="bold">advances*</span> on any temple by <span class="bold">${
      teotibotStepsPerWorship + 1
    }</span> instead.</li>
    </ul></div>
    <div>
    Discard the Discovery tile near the activated space, and
immediately draw a replacement for it.
  </div>
  ${templeTip}`,
      questionId: 1,
      isEnd: true,
      margin: 50,
    },
  ];
};

const maskQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa
) => {
  return [
    {
      question: `${maskQuestionText()}
  </br>
  <div>Did the above yield any Masks?</div>`,
      questionId: 1,
      isEnd: false,
      endsOnYes: true,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      ),
      questionId: 5,
      condition: ({ answers }) => answers[1] === "no",
      isEnd: true,
      margin: 50,
    },
  ];
};

const eclipseQuestions = (eclipseStage, isHeightOfDevelopment) => {
  const getVpForEclipse = (eclipseStage) => {
    if (eclipseStage === 1) {
      return 4;
    } else if (eclipseStage === 2) {
      return 3;
    } else if (eclipseStage === 3) {
      return 2;
    }
  };

  const heightOfDevelopmentEclipse = (isHeightOfDevelopment, eclipseStage) => {
    if (isHeightOfDevelopment) {
      if (eclipseStage === 1) {
        return `<span class="height">Teotibot places a Special Ability marker on ${getResourceImage(
          "hod1",
          "icon-dev"
        )}</span>`;
      }
      if (eclipseStage === 2) {
        return `<span class="height">Teotibot places a Special Ability marker on ${getResourceImage(
          "hod2",
          "icon-dev"
        )}</span>`;
      }
      if (eclipseStage === 3) {
        return `<span class="height">Teotibot places a Special Ability marker on ${getResourceImage(
          "hod3",
          "icon-dev"
        )}</span>`;
      }
    }
    return "";
  };

  return [
    {
      question: `<div>
    ${heightOfDevelopmentEclipse(isHeightOfDevelopment, eclipseStage)}
    <ul>
    <li>Score lowest visible number on the Buildings row for each step progressed on the Avenue of the Dead ${getResourceImage(
      "avenue"
    )}.</li>
    <li>The player (or players) furthest ahead on the Pyramid track scores <span class="bold">${getVpForEclipse(
      eclipseStage
    )}</span> Victory Points ${getResourceImage("vp")}.</li>
    <li>Each player scores <span class="bold">4</span> points for each step they have moved up on the Pyramid track. ${getResourceImage(
      "pyramid"
    )}.</li>
    <li>Reset the Pyramid track for all players, by moving all player markers to their starting position.</li>
    <li>Each player organizes their masks into one or more sets, where each set is comprised of different masks. Then each set scores points, depending on the number of masks in that set:
    Each set of <span class="bold">1</span>/2/<span class="bold">3</span>/4/<span class="bold">5</span>/6/<span class="bold">7</span> masks score <span class="bold">1</span>/3/<span class="bold">6</span>/10/<span class="bold">15</span>/21/<span class="bold">28</span> Victory Points.</li>
    <li>Each player (not Teotibot) must now pay a salary of <span class="bold">1</span> cocoa per worker, and an additional cocoa for each worker with a power of ${getDiceImage(
      "d4"
    )} or ${getDiceImage(
        "d5"
      )}. For each cocoa a player is unwilling or unable to pay, that player loses <span class="bold">3</span> Victory Points. If at any time this reduces a player's Victory Point total to <span class="bold">0</span>, that player loses no more Victory Points.</li>
    </ul> 
  </div>`,
      questionId: 1,
      isEnd: true,
      noButtons: true,
    },
  ];
};

// Mastery questions
export const masteryQuestions = [
  { id: 1, name: `Forest ${getActionImage("no2")}`, action: masteryForest },
  {
    id: 2,
    name: `Stone Quarry ${getActionImage("no3")}`,
    action: masteryQuarry,
  },
  {
    id: 3,
    name: `Gold Deposits ${getActionImage("no4")}`,
    action: masteryGold,
  },
  { id: 4, name: `Alchemy ${getActionImage("no5")}`, action: masteryAlchemy },
  { id: 5, name: `Nobles ${getActionImage("no6")}`, action: masteryNobles },
  {
    id: 6,
    name: `Decorations ${getActionImage("no7")}`,
    action: masteryDecorations,
  },
  {
    id: 7,
    name: `Construction ${getActionImage("no8")}`,
    action: masteryConstruction,
  },
];

const masteryForestQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: isOnActionBoard("Forest", 2),
      questionId: 1,
      masteryQuestionId: 1,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getForestReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

const masteryQuarryQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: isOnActionBoard("Stone Quarry", 3),
      questionId: 1,
      masteryQuestionId: 2,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getQuarryReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

const masteryGoldQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: isOnActionBoard("Gold Deposits", 4),
      questionId: 1,
      masteryQuestionId: 3,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getGoldDepositsReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

const masteryAlchemyQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian
) => {
  return [
    {
      question: hasResourcesOnBoard("Alchemy", gold, 5, 1, isObsidian),
      questionId: 1,
      masteryQuestionId: 4,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getAlchemyReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

const masteryNoblesQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  eclipseStage,
  isObsidian
) => {
  return [
    {
      question: hasResourcesOnBoard("Nobles", wood, 6, 2, isObsidian),
      questionId: 1,
      masteryQuestionId: 5,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getNoblesReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        eclipseStage,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

const masteryDecorationsQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian
) => {
  return [
    {
      question: hasResourcesOnBoard("Decorations", gold, 7, 2, isObsidian),
      questionId: 1,
      masteryQuestionId: 6,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getDecorationsReward(
        isAlternateTeotibotMovement,
        topDirectionTile
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

const masteryConstructionQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian
) => {
  return [
    {
      question: hasResourcesOnBoard("Construction", stone, 8, 2, isObsidian),
      questionId: 1,
      masteryQuestionId: 7,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
    },
    {
      question: getConstructionReward(
        isAlternateTeotibotMovement,
        topDirectionTile,
        2,
        isObsidian
      ),
      questionId: 2,
      condition: ({ answers }) => answers[1] === "yes",
      isEnd: true,
      margin: 50,
    },
  ];
};

export const TilesToQuestions = (
  tileSrc,
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain,
  eclipseStage,
  teotibotStepsPerWorship,
  teotibotVPFor10Cocoa,
  isHeightOfDevelopment
) => {
  var result;

  switch (tileSrc) {
    case alchemy:
      result = alchemyQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      );
      break;
    case construction:
      result = constructionQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case nobles:
      result = noblesQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        eclipseStage,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case decorations:
      result = decorationQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case mask_collection:
      result = maskQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      );
      break;
    case worship:
      result = worshipQuestions(teotibotStepsPerWorship);
      break;
    case mastery:
      result = [];
      break;
    case masteryForest:
      result = masteryForestQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case masteryQuarry:
      result = masteryQuarryQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case masteryGold:
      result = masteryGoldQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case masteryAlchemy:
      result = masteryAlchemyQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      );
      break;
    case masteryNobles:
      result = masteryNoblesQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        eclipseStage,
        isObsidian
      );
      break;
    case masteryDecorations:
      result = masteryDecorationsQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      );
      break;
    case masteryConstruction:
      result = masteryConstructionQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian
      );
      break;
    case eclipse:
      result = eclipseQuestions(eclipseStage, isHeightOfDevelopment);
      break;
    default:
      result = [];
  }
  return result;
};

const advancedNoblesQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain,
  eclipseStage
) => {
  return [
    {
      question: `<div><span class="step">1.</span> If Teotibot has ${hasResourcesNoText(
        wood,
        isObsidian,
        2
      )} and at <span class="bold">least 1</span> worker on the ${getActionBoard(
        "Nobles"
      )}, it spends ${spendResourcesNoText(
        wood,
        isObsidian,
        2
      )} and builds a building:</div>
      <ul>
      ${getElipseBuilding(eclipseStage)}
      <li>If a row is full, place it in the space with the lowest printed VP.</li>
      <li>Score the Victory Points ${getResourceImage(
        "vp"
      )} shown on the space just covered,
    and advance the bot on the Avenue of the Dead ${getResourceImage(
      "avenue"
    )}.</li>
      </ul>
      <div><span class="step">2.</span> <span class="red">If 1. not performed</span> & Teotibot has at <span class="bold">least 1</span> worker on the ${getActionBoard(
        "Forest"
      )}, it gains ${gainResourcesNoText(
        wood,
        isObsidian,
        teotibotResourcesToGain
      )}</div>
      </br>
      <div><span class="step">3.</span> <span class="green">If 1. or 2. performed</span> power ${getResourceImage(
        "powerup"
      )} up a worker on the relevant Action Board (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension).</div>
      </br>
      <div>
      <span class="step">4.</span> <span class="red">If neither performed:</span>
      </div>
      ${powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      )}
      `,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
      questionId: 1,
      isEnd: true,
    },
  ];
};

const advancedConstructionQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: `<div><span class="step">1.</span> If Teotibot has ${hasResourcesNoText(
        stone,
        isObsidian,
        2
      )} and at <span class="bold">least 1</span> worker on ${getActionBoard(
        "Construction"
      )}.</div>
      <ul>
        <li>Spends ${spendResourcesNoText(stone, isObsidian, 2)}.</li>
        <li>Builds the leftmost available Pyramid Tile ${getResourceImage(
          "pyramidt"
        )}</li>
        <li>Places the Tile (randomly oriented) onto the top left, lowest level available space</li>
        <li>Scores VP ${getResourceImage(
          "vp"
        )} in accordance with level + 2.</li>
        <li>Advances on the pyramid track.</li>
        <li>Advances on any temple ${getResourceImage("tw")}.</li>
      </ul>
      <div><span class="step">2.</span> <span class="red">If 1. not performed</span> & Teotibot has at <span class="bold">least 1</span> worker on the ${getActionBoard(
        "Stone Quarry"
      )}, gain ${gainResourcesNoText(
        stone,
        isObsidian,
        teotibotResourcesToGain
      )}.</div>
      </br>
      <div><span class="step">3.</span> <span class="green">If 1. or 2. performed</span> power ${getResourceImage(
        "powerup"
      )} up a worker on the relevant Action Board (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension).</div>
      </br>
      <div><span class="step">4.</span> <span class="red">If neither performed:</span></div>
      ${powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      )}`,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
      questionId: 1,
      isEnd: true,
    },
  ];
};

const advancedDecorationsQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: `<div><span class="step">1.</span> If Teotibot has ${hasResourcesNoText(
        gold,
        isObsidian,
        2
      )} and at least one worker on the ${getActionBoard(
        "Decorations"
      )}, it spends ${spendResourcesNoText(
        gold,
        isObsidian,
        2
      )} and places the top most Decoration tile onto an available Decorations space on the Pyramid (clockwise from the top). Then the bot:</div>
      <ul>
        <li>Scores 5 Victory Points ${getResourceImage("vp")}</li>
        <li><span class="bold">Advances*</span> on the Pyramid track ${getResourceImage("pyramid")}</li>
        <li><span>Advances</span> on any temple by one</li>
      </ul>
      <div><span class="step">2.</span> <span class="red">If 1. not performed</span> & Teotibot has at <span class="bold">least 1</span> worker on the Gold Deposits  action board, it gains ${gainResourcesNoText(
        gold,
        isObsidian,
        teotibotResourcesToGain
      )}.</div>
      </br>
      <div><span class="step">3.</span> <span class="green">If 1. or 2. performed</span> power ${getResourceImage(
        "powerup"
      )} up a worker on the relevant Action Board (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension).</div>
      </br>
      <div><span class="step">4.</span> <span class="red">If neither performed:</span></div>
      ${powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      )}
      ${templeTip}`,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
      questionId: 1,
      isEnd: true,
    },
  ];
};

const advancedAlchemyQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: `<div><span class="step">1.</span> If the bot has ${hasResourcesNoText(gold, isObsidian, 1)}, and at <span class="bold">least 1</span> worker on the ${getActionBoard("Alchemy")}, it spends ${spendResourcesNoText(gold, isObsidian, 1)} and then gains the technology ${getResourceImage("tech")} of the lowest number that does not have any markers (yours, or Teotibot's).</div>
      <div><ul>
      <li>If all remaining tiles have your marker on, then the bot
      gains the lowest numbered technology ${getResourceImage("tech")} which it does not
      yet have, while you score the <span class="bold">3</span> VP ${getResourceImage(
          "vp"
        )} as normal.</li>
      <li><span class="bold">Advance*</span> on the temple ${getResourceImage("tw")} matching the gained
      technology ${getResourceImage("tech")} and power up ${getResourceImage(
          "powerup"
        )} a worker on this Action Board
      (resolve any Ascensions normally). Then the bot advances the powered-up worker
      (or the new worker, if the old one triggered Ascension).</li></ul></div>
      ${advancement(isAlternateTeotibotMovement, topDirectionTile)}
     <div><span class="step">2.</span> <span class="red">If the above step failed,</span> power up ${getResourceImage("powerup")} ${getResourceImage(
        "powerup"
      )} its lowest unlocked worker
    by <span class="bold">2</span>, without carrying out any actions or advancing any
    workers.
    ${templeTip}`,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
      questionId: 1,
      isEnd: true,
    },
  ];
};

const advancedMaskQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: `<div>If the bot does not yet have one of the masks available near
      one of the Worship actions ${getResourceImage(
        "worshipspace"
      )} (on the Palace ${getActionImage("no1")} Action Board
      or on any of the 4 temple bands) and it can pay for its cost,
      it pays that cost and immediately gains that mask.</div> 
      <div>
      <ul>
        <li>Draw a replacement for it immediately, and do not move any dice.</li>
        <li>Take the lowest number mask first.</li>
        <li>If tied, it picks the first one clockwise from (and including) the Palace ${getActionImage(
          "no1"
        )} action board.</li>
      </ul>
    </div>
    <div class="red">If the above did not yield any masks:</div>
    </br>
    ${powerupMsg(
      isAlternateTeotibotMovement,
      topDirectionTile,
      teotibotVPFor10Cocoa
    )}`,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
      questionId: 1,
      isEnd: true,
    },
  ];
};

const advancedMasteryQuestions = (
  isAlternateTeotibotMovement,
  topDirectionTile,
  teotibotVPFor10Cocoa,
  isObsidian,
  teotibotResourcesToGain
) => {
  return [
    {
      question: `<div><span class="step">1.</span> Find the bot's highest powered unlocked die.</div>
      </br>
      <div><span class="step">2.</span> Perform that action board's action if possible:</div>
      <ul>
      <li>${getActionBoard("Forest", true)}: Gain ${gainResourcesNoText(
        wood,
        isObsidian,
        teotibotResourcesToGain
      )}</li>
      <li>${getActionBoard("Stone Quarry", true)}: Gain ${gainResourcesNoText(
        stone,
        isObsidian,
        teotibotResourcesToGain
      )}</li>
      <li>${getActionBoard("Gold Deposits", true)}: Gain ${gainResourcesNoText(
        gold,
        isObsidian,
        teotibotResourcesToGain
      )}</li>

      <li>${getActionBoard("Alchemy", true)}: Attempt the board's action.</li>
      <li>${getActionBoard("Nobles", true)}: Attempt the board's action.</li>
      <li>${getActionBoard(
        "Decorations",
        true
      )}: Attempt the board's action.</li>
      <li>${getActionBoard(
        "Construction",
        true
      )}: Attempt the board's action.</li>
      </ul>
      </br>
      <div><span class="step">3.</span>
        <span class="red">If the action failed,</span> find the bot's next highest powered unlocked worker, and repeat step 2.
      </div>
      </br>
      <div><span class="step">4.</span> <span class="green">If an action is successful</span>, power up the worker in question (this might trigger an Ascension, which is resolved normally). Then advance the powered-up worker (or the new worker, if the old one triggered ascension).</div>
      </br>
      <div><span class="step">5.</span> <span class="red">If all workers failed to perform an action</span>: ${powerupMsg(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa
      )}
      `,
      condition: ({ answers }) => isEmpty(answers),
      margin: 50,
      questionId: 1,
      isEnd: true,
    },
  ];
};

export const AdvancedTilesToQuestions = (
  tileSrc,
  isAlternateTeotibotMovement,
  topDirectionTile,
  isObsidian,
  teotibotResourcesToGain,
  eclipseStage,
  teotibotStepsPerWorship,
  teotibotVPFor10Cocoa,
  isHeightOfDevelopment
) => {
  var result;

  switch (tileSrc) {
    case alchemy:
      result = advancedAlchemyQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case construction:
      result = advancedConstructionQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case nobles:
      result = advancedNoblesQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain,
        eclipseStage
      );
      break;
    case decorations:
      result = advancedDecorationsQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case mask_collection:
      result = advancedMaskQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case worship:
      result = worshipQuestions(teotibotStepsPerWorship);
      break;
    case mastery:
      result = advancedMasteryQuestions(
        isAlternateTeotibotMovement,
        topDirectionTile,
        teotibotVPFor10Cocoa,
        isObsidian,
        teotibotResourcesToGain
      );
      break;
    case eclipse:
      result = eclipseQuestions();
      break;
    default:
      result = [];
  }
  return result;
};
