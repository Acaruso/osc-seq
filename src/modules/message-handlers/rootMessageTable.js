import { drawBall } from "./../ball";
import { drawDebugDialog } from "./../dialog";
import { getKeyboardMessageTable } from "./keyboardMessageTable";
import { getOscMessageTable } from "./oscMessageTable";

function getRootMessageTable(state) {
  const rootMessageTable = {
    "clear screen": (message) => {
      let ctx = state.canvas.getContext("2d");
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    },
    "update ball": (message) => {
      state.ball = message.data.ball;
    },
    "update debug text": (message) => {
      state.debugText = message.data.newDebugText;
    },
    "draw ball": (message) => {
      drawBall(state.ball, state.canvas);
    },
    "draw debug dialog": (message) => {
      drawDebugDialog(state.debugText, state.canvas);
    },
    "update clock": (message) => {
      state.clock = (state.clock + 1) % 4096;
    },
    "end of draw loop": (message) => { },
  };

  return {
    ...rootMessageTable,
    ...getKeyboardMessageTable(state),
    ...getOscMessageTable(state),
  };
}

export { getRootMessageTable };
