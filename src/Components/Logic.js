import { find, remove, union, cloneDeep, shuffle } from "lodash";
import { actionNames, diceFaces, noNeutralDice } from "./Constants";

export const right = "right";
export const left = "left";

export const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const swapArrayLocs = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};

export const orderTiles = (newOrder, tileIndex, topDirectionTile, bottomDirectionTile) => {
  const topTileRight =
    (topDirectionTile.name === right && !topDirectionTile.flipped) ||
    (topDirectionTile.name === left && topDirectionTile.flipped);

  const topTileLeft =
    (topDirectionTile.name === left && !topDirectionTile.flipped) ||
    (topDirectionTile.name === right && topDirectionTile.flipped);

  const bottomTileLeft =
    (bottomDirectionTile.name === left && !bottomDirectionTile.flipped) ||
    (bottomDirectionTile.name === right && bottomDirectionTile.flipped);

  const bottomTileRight =
    (bottomDirectionTile.name === right && !bottomDirectionTile.flipped) ||
    (bottomDirectionTile.name === left && bottomDirectionTile.flipped);

  if (tileIndex === 0) {
    swapArrayLocs(newOrder, tileIndex, 6);
    // right, left
    if (topTileRight && bottomTileLeft) {
      swapArrayLocs(newOrder, 1, tileIndex);
      swapArrayLocs(newOrder, 4, 1);
    }

    // left, right
    if (topTileLeft && bottomTileRight) {
      swapArrayLocs(newOrder, 2, tileIndex);
      swapArrayLocs(newOrder, 4, 2);
    }

    // right right
    if (topTileRight && bottomTileRight) {
      swapArrayLocs(newOrder, 1, tileIndex);
      swapArrayLocs(newOrder, 3, 1);
    }

    // left left
    if (topTileLeft && bottomTileLeft) {
      swapArrayLocs(newOrder, 2, tileIndex);
      swapArrayLocs(newOrder, 5, 2);
    }
  }

  if (tileIndex === 1) {
    // right, left || right, right
    if (topTileRight) {
      swapArrayLocs(newOrder, tileIndex, 6);
      swapArrayLocs(newOrder, 3, tileIndex);
    }

    // left, right || left left
    if (topTileLeft) {
      swapArrayLocs(newOrder, tileIndex, 6);
      swapArrayLocs(newOrder, 4, tileIndex);
    }
  }

  //Position 2
  if (tileIndex === 2) {
    // right, left || right, right
    if (topTileRight) {
      swapArrayLocs(newOrder, tileIndex, 6);
      swapArrayLocs(newOrder, 4, tileIndex);
    }

    // left, right || left left
    if (topTileLeft) {
      swapArrayLocs(newOrder, tileIndex, 6);
      swapArrayLocs(newOrder, 5, tileIndex);
    }
  }

  //Position 3
  if (tileIndex === 3) {
    swapArrayLocs(newOrder, tileIndex, 6);
  }

  //Position 4
  if (tileIndex === 4) {
    swapArrayLocs(newOrder, tileIndex, 6);
  }

  //Position 5
  if (tileIndex === 5) {
    swapArrayLocs(newOrder, tileIndex, 6);
  }
};

export const calculateYTile = (index, tileWidth, media) => {
  var result = 0;

  switch (index) {
    case 0:
      result = 0;
      break;
    case 1:
      result = tileWidth/2;
      break;
    case 2:
      result = tileWidth/2;
      break;
    case 3:
      result = tileWidth;
      break;
    case 4:
      result = tileWidth;
      break;
    case 5:
      result = tileWidth;
      break;
    default:
      result = media === 3 ? tileWidth*1.5 : tileWidth;
  }
  return result;
};

export const calculateXTile = (index, width, media) => {
  var result = 0;
  var tile04 = media === 3 ? 0 : -width*0.6;
  switch (index) {
    case 0:
      result = tile04;
      break;
    case 1:
      result = tile04 - width/2;
      break;
    case 2:
      result = tile04 + width/2;
      break;
    case 3:
      result = tile04 - width;
      break;
    case 4:
      result = tile04;
      break;
    case 5:
      result = tile04 + width;
      break;
    default:
      result = media === 3 ? tile04 + width : tile04 + width*2;
  }
  return result;
};

export const calculateXDirectionTile = (index, width, media)=> {
  var result = 0;
  var tile04 = media === 3 ? 0 : -width*0.6;
  switch (index) {
    case 0:
      result = media === 3 ? tile04 -width : width*1.5 ;
      break;
    case 1:
      result = media === 3 ? tile04 : width*1.5 ;
      break;
    default:
      result = width*1.5;
  }
  return result;
};

export const calculateYDirectionTile = (index, width, media)=> {
  var result = 0;
  switch (index) {
    case 0:
      result = media === 3 ? width*1.5 : 0;
      break;
    case 1:
      result = media === 3 ? width*1.5 : width/2;
      break;
    default:
      result = width;
  }
  return result;
};

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

function getRandomArrayIndex(arr) {
  return Math.floor(Math.random() * (arr.length - 1)) + 1;
}


export function getActionItem(item) {
  return find(actionNames, ["value", item]);
}

export function getNeutralArray(shuffledTiles) {
  let index = getRandomArrayIndex(shuffledTiles);
  let numbers1 = shuffledTiles[index].numbers;

  shuffledTiles.splice(index, 1);

  index = getRandomArrayIndex(shuffledTiles);
  let numbers2 = shuffledTiles[index].numbers;

  shuffledTiles.splice(index, 1);

  let mergedActions = union(numbers1, numbers2);

  //Get the 3 dice values
  let dice = getRandom(diceFaces, noNeutralDice);

  return [
    {
      key: 0,
      diceFace: dice[0],
      number: [mergedActions[0]],
      actionName: getActionItem(mergedActions[0]).name,
      color: getActionItem(mergedActions[0]).color,
    },
    {
      key: 1,
      diceFace: dice[1],
      number: [mergedActions[1]],
      actionName: getActionItem(mergedActions[1]).name,
      color: getActionItem(mergedActions[1]).color,
    },
    {
      key: 2,
      diceFace: dice[2],
      number: [mergedActions[2]],
      actionName: getActionItem(mergedActions[2]).name,
      color: getActionItem(mergedActions[2]).color,
    },
  ];
}

export function getPlayerArray(selectedStartTiles) {
  let actions = [];

    selectedStartTiles.forEach((selectedStartTile) => {
      actions = union([...actions, ...selectedStartTile.numbers]);
    });

    return [
      {
        key: 0,
        diceFace: diceFaces[0],
        number: [actions[0]],
        actionName: getActionItem(1).name,
        color: getActionItem(1).color,
      },
      {
        key: 1,
        diceFace: diceFaces[0],
        number: [actions[1]],
        actionName: getActionItem(2).name,
        color: getActionItem(2).color,
      },
      {
        key: 2,
        diceFace: diceFaces[0],
        number: [actions[2]],
        actionName: getActionItem(3).name,
        color: getActionItem(3).color,
      },
    ];
}