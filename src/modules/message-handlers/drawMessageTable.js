import { drawBall } from "../entities/ball";
import { drawRect } from "../entities/rect";
import { drawImage } from "../entities/image";

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
    "draw image": (message) => {
      const name = message.data.image.name;
      const imageElt = state.images[name];
      drawImage(message.data, imageElt, state.canvas);
    },
  };
}

export { createDrawMessageTable };
