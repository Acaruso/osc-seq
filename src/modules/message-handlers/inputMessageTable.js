function createInputMessageTable(state) {
  return {
    "ArrowRight:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        right: true
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowRight:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        right: false
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowLeft:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        left: true
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowLeft:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        left: false
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowUp:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        up: true
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowUp:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        up: false
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowDown:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        down: true
      };
      return createUpdateInputMessage(newUserInput);
    },
    "ArrowDown:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        down: false
      };
      return createUpdateInputMessage(newUserInput);
    },
    "Enter:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        enter: true
      };
      return createUpdateInputMessage(newUserInput);
    },
    "Enter:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        enter: false
      };
      return createUpdateInputMessage(newUserInput);
    },
    "mouse click": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        click: true,
        clickCoord: message.data,
      };
      return createUpdateInputMessage(newUserInput);
    },
  };
}

function createUpdateInputMessage(input) {
  return {
    type: "update component",
    component: "userInput",
    entityId: -1,
    data: input,
  };
}

export { createInputMessageTable };
