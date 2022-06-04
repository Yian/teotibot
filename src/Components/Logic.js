export const right = "right";
export const left = "left";

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

export const calculateYTile = (index, tileWidth) => {
  var result = 0;

  switch (index) {
    case 0:
      result = 0;
      break;
    case 1:
      result = tileWidth*0.5;
      break;
    case 2:
      result = tileWidth*0.5;
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
      result = tileWidth;
  }
  return result;
};

export const calculateXTile = (index, width) => {
  var result = 0;
  var tile04 = -width*0.6;
  switch (index) {
    case 0:
      result = tile04;
      break;
    case 1:
      result = -width*1.05;
      break;
    case 2:
      result = -width*0.15;
      break;
    case 3:
      result = -width*1.5;
      break;
    case 4:
      result = tile04;
      break;
    case 5:
      result = width*0.3;
      break;
    default:
      result = width*1.5;
  }
  return result;
};

export const calculateXDirectionTile = (index, width)=> {
  var result = 0;
  switch (index) {
    case 0:
      result = width*1.5;
      break;
    case 1:
      result = width*1.5;
      break;
    default:
      result = width*1.5;
  }
  return result;
};

export const calculateYDirectionTile = (index, tileWidth)=> {
  var result = 0;
  switch (index) {
    case 0:
      result = 0;
      break;
    case 1:
      result = tileWidth * 0.5;
      break;
    default:
      result = tileWidth;
  }
  return result;
};