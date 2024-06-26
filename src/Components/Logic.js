import { find, union, sortBy } from "lodash";
import { actionNames, diceFaces } from "./Constants";

export const right = "right";
export const left = "left";

export const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const swapArrayLocs = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};

export const removeRandomItemFromArray = (array) => {
  if (array.length === 0) return undefined; // If the array is empty, return undefined.

  const randomIndex = Math.floor(Math.random() * array.length); // Generate a random index.
  const removedItem = array.splice(randomIndex, 1)[0]; // Remove the item at the random index.

  return removedItem; // Return the removed item.
}

export const orderTiles = (
  newOrder,
  tileIndex,
  topDirectionTile,
  bottomDirectionTile
) => {
  const topTileRight =
    (topDirectionTile.type === right && !topDirectionTile.flipped) ||
    (topDirectionTile.type === left && topDirectionTile.flipped);

  const topTileLeft =
    (topDirectionTile.type === left && !topDirectionTile.flipped) ||
    (topDirectionTile.type === right && topDirectionTile.flipped);

  const bottomTileLeft =
    (bottomDirectionTile.type === left && !bottomDirectionTile.flipped) ||
    (bottomDirectionTile.type === right && bottomDirectionTile.flipped);

  const bottomTileRight =
    (bottomDirectionTile.type === right && !bottomDirectionTile.flipped) ||
    (bottomDirectionTile.type === left && bottomDirectionTile.flipped);

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

export const calculateYTile = (index, tileWidth, media, altmovement) => {
  var result = 0;

  const getExtraTileYLoc = (altmovement) => {
    if (altmovement) {
      return tileWidth * 1.5;
    } else {
      return media === 3 ? tileWidth * 1.5 : tileWidth;
    }
  };

  switch (index) {
    case 0:
      result = 0;
      break;
    case 1:
      result = tileWidth / 2;
      break;
    case 2:
      result = tileWidth / 2;
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
      result = getExtraTileYLoc(altmovement);
  }
  return result;
};

export const calculateXTile = (index, width, media, altmovement) => {
  var result = 0;
  var tile04 = media === 3 ? 0 : -width * 0.6;

  const getExtraTileXLoc = (altmovement) => {
    if (altmovement) {
      return tile04 + width;
    } else {
      return media === 3 ? tile04 + width : width * 1.5;
    }
  };

  switch (index) {
    case 0:
      result = tile04;
      break;
    case 1:
      result = tile04 - width / 2;
      break;
    case 2:
      result = tile04 + width / 2;
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
      result = getExtraTileXLoc(altmovement);
  }
  return result;
};

export const calculateXDirectionTile = (index, width, media) => {
  var result = 0;
  var tile04 = media === 3 ? 0 : -width * 0.6;
  switch (index) {
    case 0:
      result = media === 3 ? tile04 - width : width * 1.5;
      break;
    case 1:
      result = media === 3 ? tile04 : width * 1.5;
      break;
    case 2:
      result = media === 3 ? tile04 : width * 1.5;
      break;
    case 3:
      result = media === 3 ? tile04 - width : width * 1.5;
      break;
    default:
      result = width * 1.5;
  }
  return result;
};

export const calculateYDirectionTile = (index, width, media) => {
  var result = 0;
  switch (index) {
    case 0:
      result = media === 3 ? width * 1.5 : 0;
      break;
    case 1:
      result = media === 3 ? width * 1.5 : width / 2;
      break;
    case 2:
      result = media === 3 ? width * 2 : width;
      break;
    case 3:
      result = media === 3 ? width * 2 : width * 1.5;
      break;
    default:
      result = width;
  }
  return result;
};

export const calculateXEmpireTile = (width, media, altmovement) => {
  if (altmovement) {
   // return media === 3 ? width : -width * 0.6;
  }
  return -width*2;
};

export const calculateYEmpireTile = (width, media, altmovement) => {
  if (altmovement) {
    //return media === 3 ? 2 * width : width + width / 2;
  }

  return 0;
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

export const getRandomArrayIndex = (arr) => {
  return Math.floor(Math.random() * (arr.length - 1)) + 1;
};

export function getActionItemByValue(item) {
  return find(actionNames, ["value", item]);
}

export function getActionItemByName(actionName) {
  return find(actionNames, ["name", actionName]);
}

export function getDiceFace(item) {
  return find(diceFaces, ["value", item]);
}

export function getTeotibotArray(
  teotibotWorkerPowerForAction4,
  teotibotWorkerPowerForAction6,
  teotibotWorkerPowerForAction8
) {
  return sortBy(
    [
      {
        key: 0,
        diceFace: getDiceFace(teotibotWorkerPowerForAction4),
        number: 4,
        actionName: getActionItemByValue(4).name,
        color: getActionItemByValue(4).color,
      },
      {
        key: 1,
        diceFace: getDiceFace(teotibotWorkerPowerForAction6),
        number: 6,
        actionName: getActionItemByValue(6).name,
        color: getActionItemByValue(6).color,
      },
      {
        key: 2,
        diceFace: getDiceFace(teotibotWorkerPowerForAction8),
        number: 8,
        actionName: getActionItemByValue(8).name,
        color: getActionItemByValue(8).color,
      },
      {
        key: 3,
        diceFace: diceFaces[0],
        number: 7,
        worship: true,
        actionName: getActionItemByValue(7).name,
        color: getActionItemByValue(7).color,
      },
    ],
    ["key"]
  );
}

export function getNeutralArray(shuffledTiles) {
  let index = getRandomArrayIndex(shuffledTiles);
  let numbers1 = shuffledTiles[index].numbers;
  let dupNumbers = [];

  const shuffledTile = shuffledTiles[index];

  if (shuffledTile.duplicateNumbers) {
    dupNumbers.push(shuffledTiles[index].numbers[0]);
  }

  shuffledTiles.splice(index, 1);

  index = getRandomArrayIndex(shuffledTiles);
  let numbers2 = shuffledTiles[index].numbers;

  if (shuffledTiles[index].duplicateNumbers) {
    dupNumbers.push(shuffledTiles[index].numbers[0]);
  }

  shuffledTiles.splice(index, 1);

  let mergedActions = [...union(numbers1, numbers2), ...dupNumbers];
  return sortBy(
    [
      {
        key: 0,
        diceFace: diceFaces[0],
        number: mergedActions[0],
        actionName: getActionItemByValue(mergedActions[0]).name,
        color: getActionItemByValue(mergedActions[0]).color,
      },
      {
        key: 1,
        diceFace: diceFaces[0],
        number: mergedActions[1],
        actionName: getActionItemByValue(mergedActions[1]).name,
        color: getActionItemByValue(mergedActions[1]).color,
      },
      {
        key: 2,
        diceFace: diceFaces[0],
        number: mergedActions[2],
        actionName: getActionItemByValue(mergedActions[2]).name,
        color: getActionItemByValue(mergedActions[2]).color,
      },
    ],
    ["number"]
  );
}

export function getPlayerArray(selectedStartTiles) {
  let actions = [];
  let playerPositions = [];

  selectedStartTiles.forEach((selectedStartTile) => {
    actions = union([...actions, ...selectedStartTile.numbers]);
  });

  var dupNumberTiles = find(selectedStartTiles, ["duplicateNumbers", true]);
  if (dupNumberTiles) {
    actions.push(dupNumberTiles.numbers[0]);
  }

  sortBy(actions).forEach((item, i) => {
    playerPositions.push({
      key: i,
      diceFace: diceFaces[0],
      number: item,
      actionName: getActionItemByValue(item).name,
      color: getActionItemByValue(item).color,
    });
  });

  return playerPositions;
}

export function getMansionResults(dieResult) {
  var result = 0;
  switch (dieResult) {
    case 1:
      result = `<span>The <span class="bold">left</span> Royal tile is activated, <span class="weight">if it was previously claimed by either you or Teotibot</span></span>`;
      break;
    case 2:
      result = `<span>The <span class="bold">middle</span> Royal tile is activated, <span class="weight">if it was previously claimed by either you or Teotibot</span></span>`;
      break;
    case 3:
      result = `<span>The <span class="bold">right</span> Royal tile is activated, <span class="weight">if it was previously claimed by either you or Teotibot</span></span>`;
      break;
    default:
      result = `<span class="bold nothing">nothing happens.</span>`;
  }
  return result;
}
