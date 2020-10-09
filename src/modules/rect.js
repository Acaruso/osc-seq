import { isCoordInsideRect } from "./util";

function getRect(options = {}) {
  const { x, y, width, height, color } = options;
  
  return {
    x,
    y,
    width,
    height,
    color,
    getDrawMessage: (keys, state) => {
      const [ tableId, objectId ] = keys;
      const rect = state.objects.get(tableId).get(objectId);
      return { type: "draw rect", data: rect };
    },
    detectClick: (key, coord, state) => {
      return false;
      // const rect = state.objects[key];
      // return isCoordInsideRect(coord, rect);
    },
    onClick: (key, coord, state) => {
      return {};
      // const rect = state.objects[key];
      // let newRect = { ...rect };

      // if (rect.color === "#FF5733") {
      //   newRect.color = "#000000";
      // } else {
      //   newRect.color = "#FF5733";
      // }

      // return { type: "update state", key, data: newRect };
    },
  };
}

function createRectForGrid(options = {}) {
  let rect = getRect(options);
  const { row, col, fill, gridId } = options;
  rect.row = row;
  rect.col = col;
  rect.fill = fill;
  rect.gridId = gridId;
  rect.getDrawMessage = (keys, state) => {
    const [ tableId, objectId ] = keys;
    const rect = state.objects.get(tableId).get(objectId);
    return { type: "stroke rect", data: rect };
  };
  return rect;
}

export { getRect, createRectForGrid };
