import { handleKeyboardEvents } from "../keyboard";

function getKeyboardMessageTable(state) {
  return {
    "handle keyboard events": (message) => {
      handleKeyboardEvents(state);
    },
    "ArrowRight:keydown": (message) => {
      state.keyboard.right = true;
    },
    "ArrowRight:keyup": (message) => {
      state.keyboard.right = false;
    },
    "ArrowLeft:keydown": (message) => {
      state.keyboard.left = true;
    },
    "ArrowLeft:keyup": (message) => {
      state.keyboard.left = false;
    },
    "ArrowUp:keydown": (message) => {
      state.keyboard.up = true;
    },
    "ArrowUp:keyup": (message) => {
      state.keyboard.up = false;
    },
    "ArrowDown:keydown": (message) => {
      state.keyboard.down = true;
    },
    "ArrowDown:keyup": (message) => {
      state.keyboard.down = false;
    },
    "Enter:keydown": (message) => {
      state.keyboard.enter = true;
    },
    "Enter:keyup": (message) => {
      state.keyboard.enter = false;
    },
  };
}

export { getKeyboardMessageTable };
