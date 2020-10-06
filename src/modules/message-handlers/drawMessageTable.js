import { drawBall } from "./../ball";
import { drawDebugDialog } from "./../dialog";
import { drawRect, strokeRect } from "./../util";
import { drawGrid } from "./../grid";

function getDrawMessageTable(state) {
  return {
    "clear screen": (message) => {
      let ctx = state.canvas.getContext("2d");
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    },
    "draw ball": (message) => {
      drawBall(state.ball, state.canvas);
    },
    "draw debug dialog": (message) => {
      drawDebugDialog(state.debugText, state.canvas);
    },
    "draw grid": (message) => {
      drawGrid(state.grid, state.canvas);
    },
    "draw rect": (message) => {
      drawRect(state.rect, state.canvas);
    },
  };
}

export { getDrawMessageTable };
