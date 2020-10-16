import { getComponent, updateComponent } from "./../entityComponent";
import { log } from "./../util";

function createUserInputMessageTable(state) {
  return {
    "ArrowRight:keydown": (message) => {
      update(state.ecManager, { right: true });
    },
    "ArrowRight:keyup": (message) => {
      update(state.ecManager, { right: false });
    },
    "ArrowLeft:keydown": (message) => {
      update(state.ecManager, { left: true });
    },
    "ArrowLeft:keyup": (message) => {
      update(state.ecManager, { left: false });
    },
    "ArrowUp:keydown": (message) => {
      update(state.ecManager, { up: true });
    },
    "ArrowUp:keyup": (message) => {
      update(state.ecManager, { up: false });
    },
    "ArrowDown:keydown": (message) => {
      update(state.ecManager, { down: true });
    },
    "ArrowDown:keyup": (message) => {
      update(state.ecManager, { down: false });
    },
    "Enter:keydown": (message) => {
      console.log(state);
      update(state.ecManager, { enter: true });
    },
    "Enter:keyup": (message) => {
      update(state.ecManager, { enter: false });
    },
    "mouse click": (message) => {
      update(
        state.ecManager, 
        { click: true, cx: message.data.cx, cy: message.data.cy },
      );
    },
  };
}

function update(ecManager, newState) {
  let newUserInput = { 
    ...ecManager.getComponent("userInput"),
    ...newState,
  };  
  ecManager.updateComponent(newUserInput, "userInput");
}

export { createUserInputMessageTable };
