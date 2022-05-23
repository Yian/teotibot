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
const wood = "woood";
const gold = "gold";
const stone = "stone";
const cocoa = "cocoa";
const templeRed = "rg";
const templeBlue = "bg";
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
      { q: 1, t: avenue },
      { q: 2, t: cocoa },
      { q: 3, t: wood },
    ],
  },
  {
    name: "ST2",
    numbers: [4, 3],
    tooltip:
      "Advance on the green temple (gaining its reward) and gain 2 stone and 3 gold.",
    resources: [
      { q: 1, t: templeGreen },
      { q: 2, t: stone },
      { q: 3, t: gold },
    ],
  },
  {
    name: "ST3",
    numbers: [2, 3],
    tooltip:
      "Advance on the blue temple (gaining its reward) and gain 4 wood and 1 stone.",
    resources: [
      { q: 1, t: templeBlue },
      { q: 4, t: wood },
      { q: 1, t: stone },
    ],
  },
  {
    name: "ST4",
    numbers: [1, 4],
    tooltip:
      "Advance on the red temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { q: 1, t: templeRed },
      { q: 1, t: powerup },
      { q: 5, t: cocoa },
    ],
  },
  {
    name: "ST5",
    numbers: [4, 5],
    tooltip:
      "Select the lowest numbered Technology tile on the Alchemy (5) Action Board, and place your marker on it for free. Gain the associated temple advance (and its reward) plus 2 gold.",
    resources: [
      { q: 1, t: tech },
      { q: 2, t: gold },
    ],
  },
  {
    name: "ST6",
    numbers: [2, 4],
    tooltip:
      "Increase the power of one of your starting workers. Gain 3 wood and 2 gold.",
    resources: [
      { q: 1, t: powerup },
      { q: 3, t: wood },
      { q: 2, t: gold },
    ],
  },
  {
    name: "ST7",
    numbers: [5, 8],
    tooltip:
      "Select the lowest numbered Technology tile on the Alchemy (5) Action Board, and place your marker on it for free. Gain the associated temple advance (and its reward) plus any 2 resources.",
    resources: [
      { q: 1, t: tech },
      { q: 2, t: any },
    ],
  },
  {
    name: "ST8",
    numbers: [6, 7],
    tooltip:
      "Advance on the blue temple (gaining its reward) and gain 2 cocoa and 4 stone.",
    resources: [
      { q: 1, t: templeBlue },
      { q: 2, t: cocoa },
      { q: 4, t: stone },
    ],
  },
  {
    name: "ST9",
    numbers: [5, 6],
    tooltip: "Advance on each of the three temples (gaining rewards).",
    resources: [
      { q: 1, t: templeBlue },
      { q: 1, t: templeRed },
      { q: 1, t: templeGreen },
    ],
  },
  {
    name: "ST10",
    numbers: [7, 8],
    tooltip:
      "Advance on the red temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { q: 1, t: templeRed },
      { q: 5, t: cocoa },
    ],
  },
  {
    name: "ST11",
    numbers: [6, 8],
    tooltip: "Advance on the green temple (gaining its reward), increase the power of one of your starting workers, and gain 5 cocoa.",
    resources: [
      { q: 1, t: templeGreen },
      { q: 1, t: powerup },
      { q: 5, t: cocoa },
    ],
  },
  {
    name: "ST12",
    numbers: [5, 7],
    tooltip: "Advance on the blue and red temples (gaining rewards), and gain any 2 resources.",
    resources: [
      { q: 1, t: templeBlue },
      { q: 1, t: templeRed },
      { q: 2, t: any },
    ],
  },
  {
    name: "ST13",
    numbers: [3, 5],
    tooltip: "Gain 3 cocoa and 5 wood.",
    resources: [
      { q: 3, t: cocoa },
      { q: 5, t: wood },
    ],
  },
  {
    name: "ST14",
    numbers: [3, 7],
    tooltip: "Gain 3 stone and 1 gold. You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile.",
    resources: [
      { q: 3, t: stone },
      { q: 1, t: gold },
      { q: 1, t: discovery },
    ],
  },
  {
    name: "ST15",
    numbers: [2, 6],
    tooltip: "Gain 1 wood, 2 stone, and 3 gold.",
    resources: [
      { q: 1, t: wood },
      { q: 3, t: gold },
    ],
  },
  {
    name: "ST16",
    numbers: [4, 8],
    tooltip: "Gain 2 cocoa and 3 gold. You may claim a random Discovery tile (by paying its cost). You may look at the Discovery tile before deciding to pick this tile.",
    resources: [
      { q: 2, t: cocoa },
      { q: 3, t: gold },
      { q: 1, t: discovery },
    ],
  },
  {
    name: "ST17",
    numbers: [3, 8],
    tooltip: "Gain 3 cocoa, 2 wood, and 3 stone.",
    resources: [
      { q: 3, t: cocoa },
      { q: 2, t: wood },
      { q: 3, t: stone },
    ],
  },
  {
    name: "ST18",
    numbers: [2, 7],
    tooltip: "Advance on the Avenue of the Dead track and gain 1 wood and 2 stone.",
    resources: [
      { q: 1, t: avenue },
      { q: 1, t: wood },
      { q: 2, t: stone },
    ],
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

export const resources = [
  { name: wood, x: 100 },
  { name: stone, x: 300 },
  { name: gold, x: 400 },
];
