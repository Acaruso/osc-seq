import { getComponent, updateComponent } from "./../entityComponent";
import { log } from "./../util";

function createUserInputMessageTable(state) {
  return {
    "ArrowRight:keydown": (message) => {
      // log('right')
      
      // log(state.ecManager.components.userInput)

      update(state.ecManager, { right: true });

      // log(state.ecManager.components.userInput)

      // let newUserInput = { 
      //   ...state.ecManager.getComponent("userInput"),
      //   right: true
      // };

      // state.ecManager.updateComponent(newUserInput, "userInput");
      
      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   right: true
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowRight:keyup": (message) => {
      update(state.ecManager, { right: false });

      // let newUserInput = { 
      //   ...state.ecManager.getComponent("userInput"),
      //   right: false
      // };

      // state.ecManager.updateComponent(newUserInput, "userInput");

      // let newUserInput = {
      //   ...getComponent(state.components.userInput),
      //   right: false
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowLeft:keydown": (message) => {
      update(state.ecManager, { left: true });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   left: true
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowLeft:keyup": (message) => {
      update(state.ecManager, { left: false });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   left: false
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowUp:keydown": (message) => {
      update(state.ecManager, { up: true });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   up: true
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowUp:keyup": (message) => {
      update(state.ecManager, { up: false });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   up: false
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowDown:keydown": (message) => {
      update(state.ecManager, { down: true });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   down: true
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "ArrowDown:keyup": (message) => {
      update(state.ecManager, { down: false });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   down: false
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "Enter:keydown": (message) => {
      console.log(state);
      update(state.ecManager, { enter: true });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   enter: true
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "Enter:keyup": (message) => {
      update(state.ecManager, { enter: false });

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   enter: false
      // };
      // updateComponent(state.components.userInput, newUserInput);
    },
    "mouse click": (message) => {
      update(
        state.ecManager, 
        { click: true, cx: message.data.cx, cy: message.data.cy },
      );

      // let newUserInput = { 
      //   ...getComponent(state.components.userInput),
      //   click: true,
      //   cx: message.data.cx,
      //   cy: message.data.cy,
      // };
      // updateComponent(state.components.userInput, newUserInput);
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
