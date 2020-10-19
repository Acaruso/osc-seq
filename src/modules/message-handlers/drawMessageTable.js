import { drawBall } from "./../ball";
import { drawRect } from "./../util";
import { drawGrid } from "./../grid";

function createDrawMessageTable(state) {
  return {
    "clear screen": (message) => {
      let ctx = state.canvas.getContext("2d");
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    },
    "draw ball": (message) => {
      drawBall(message.data, state.canvas);
    },
    "draw rect": (message) => {
      drawRect(message.data, state.canvas);
    },
    "draw grid": (message) => {
      drawGrid(message.data, state.canvas);
    },
  };
}

export { createDrawMessageTable };
