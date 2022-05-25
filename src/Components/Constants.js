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

export const baseBotTiles = [
  { name: "alchemy" },
  { name: "construction" },
  { name: "decorations" },
  { name: "mask_collection" },
  { name: "mastery" },
  { name: "nobles" },
  { name: "worship" },
];

export const directionTiles = [{ name: "left" }, { name: "right" }];

const avenue = "avenue";
const any = "any";
const wood = "wood";
const gold = "gold";
const stone = "stone";
const cocoa = "cocoa";
const templeRed = "tr";
const templeBlue = "tb";
const templeGreen = "tg";
const powerup = "powerup";
const tech = "tech";
const discovery = "discovery";

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
  },
  {
    name: "ST10",
    numbers: [7, 8],
    tooltip:
      "Advance on the red temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { quantity: 1, type: templeRed },
      {quantity: 1, type: powerup},
      { quantity: 5, type: cocoa },
    ],
    selected: false,
  },
  {
    name: "ST11",
    numbers: [6, 8],
    tooltip: "Advance on the green temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { quantity: 1, type: templeGreen },
      { quantity: 1, type: powerup },
      { quantity: 5, type: cocoa },
    ],
    selected: false,
  },
  {
    name: "ST12",
    numbers: [5, 7],
    tooltip: "Advance on the blue and red temples (gaining rewards), and gain any 2 resources.",
    resources: [
      { quantity: 1, type: templeBlue },
      { quantity: 1, type: templeRed },
      { quantity: 2, type: any },
    ],
    selected: false,
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
  },
  {
    name: "ST14",
    numbers: [3, 7],
    tooltip: "Gain 3 stone and 1 gold. You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile.",
    resources: [
      { quantity: 3, type: stone },
      { quantity: 1, type: gold },
      { quantity: 1, type: discovery },
    ],
    selected: false,
  },
  {
    name: "ST15",
    numbers: [2, 6],
    tooltip: "Gain 1 wood, 2 stone, and 3 gold.",
    resources: [
      { quantity: 1, type: wood },
      { quantity: 3, type: gold },
    ],
    selected: false,
  },
  {
    name: "ST16",
    numbers: [4, 8],
    tooltip: "Gain 2 cocoa and 3 gold. You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile.",
    resources: [
      { quantity: 2, type: cocoa },
      { quantity: 3, type: gold },
      { quantity: 1, type: discovery },
    ],
    selected: false,
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
  },
  {
    name: "ST18",
    numbers: [2, 7],
    tooltip: "Advance on the Avenue of the Dead track and gain 1 wood and 2 stone.",
    resources: [
      { quantity: 1, type: avenue },
      { quantity: 1, type: wood },
      { quantity: 2, type: stone },
    ],
    selected: false,
  },
];

export const baseTechTiles = [
  { name: "TT1", tooltip: "" },
  { name: "TT2", tooltip: "" },
  { name: "TT3", tooltip: "" },
  { name: "TT4", tooltip: "" },
  { name: "TT5", tooltip: "" },
  { name: "TT6", tooltip: "" },
  { name: "TT7", tooltip: "" },
  { name: "TT8", tooltip: "" },
  { name: "TT9", tooltip: "" },
];

export const baseTempleTiles = [
  { name: "BT1", tooltip: "" },
  { name: "BT2", tooltip: "" },
  { name: "BT3", tooltip: "" },
  { name: "BT4", tooltip: "" },
  { name: "BT5", tooltip: "" },
  { name: "BT6", tooltip: "" },
  { name: "BT7", tooltip: "" },
];
