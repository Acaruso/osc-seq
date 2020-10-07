import { isCoordInsideRect } from "./util";

function getRect(options = {}) {
  const { x, y, width, height, color } = options;
  
  return {
    x,
    y,
    width,
    height,
    color,
    getDrawMessage: (key, state) => {
      const rect = state.objects[key];
      return { type: "draw rect", data: rect };
    },
    detectClick: (key, coord, state) => {
      const rect = state.objects[key];
      return isCoordInsideRect(coord, rect);
    },
    onClick: (key, coord, state) => {
      const rect = state.objects[key];
      let newRect = { ...rect };

      if (rect.color === "#FF5733") {
        newRect.color = "#000000";
      } else {
        newRect.color = "#FF5733";
      }

      return { type: "update state", key, data: newRect };
    },
  };
}

export { getRect };
