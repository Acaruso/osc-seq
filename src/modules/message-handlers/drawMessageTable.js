import { drawBall } from "./../ball";
import { drawDebugDialog } from "./../dialog";

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
  };
}

export { getDrawMessageTable };
