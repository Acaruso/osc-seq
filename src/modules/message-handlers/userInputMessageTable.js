import { getComponent, updateComponent } from "./../entityComponent";
import { log } from "./../util";

function createUserInputMessageTable(state) {
  return {
    "ArrowRight:keydown": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        right: true
      };

      // let newUserInput = { 
      //   ...state.components.userInput.data[0],
      //   right: true
      // };

      // state.components.userInput.data[0] = newUserInput;

      // state.components.userInput.data[0] = {blah: "asdf"};

      updateComponent(state.components.userInput, newUserInput);
      
      // state.components.userInput = newUserInput;
    },
    "ArrowRight:keyup": (message) => {
      let newUserInput = {
        ...getComponent(state.components.userInput),
        right: false
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "ArrowLeft:keydown": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        left: true
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "ArrowLeft:keyup": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        left: false
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "ArrowUp:keydown": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        up: true
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "ArrowUp:keyup": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        up: false
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "ArrowDown:keydown": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        down: true
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "ArrowDown:keyup": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        down: false
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "Enter:keydown": (message) => {
      console.log(state);
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        enter: true
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "Enter:keyup": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        enter: false
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
    "mouse click": (message) => {
      let newUserInput = { 
        ...getComponent(state.components.userInput),
        click: true,
        cx: message.data.cx,
        cy: message.data.cy,
      };
      updateComponent(state.components.userInput, newUserInput);
      // state.components.userInput = newUserInput;
    },
  };
}

export { createUserInputMessageTable };
