export const right = "right";
export const left = "left";

export const calculateYTile = (index, tileWidth) => {
  var result = 0;

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
      result = tileWidth;
  }
  return result;
};

export const calculateXTile = (index, tileWidth) => {
  var result = 0;
  switch (index) {
    case 0:
      result = -0;
      break;
    case 1:
      result = -tileWidth / 2;
      break;
    case 2:
      result = tileWidth / 2;
      break;
    case 3:
      result = -tileWidth;
      break;
    case 4:
      result = tileWidth / 100;
      break;
    case 5:
      result = tileWidth;
      break;
    default:
      result = tileWidth * 2;
  }
  return result;
};

export const calculateXDirectionTile = (index, tileWidth)=> {
  var result = 0;
  switch (index) {
    case 0:
      result = tileWidth * 2;
      break;
    case 1:
      result = tileWidth * 2;
      break;
    default:
      result = tileWidth * 2;
  }
  return result;
}

