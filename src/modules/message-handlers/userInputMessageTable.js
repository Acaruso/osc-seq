function createUserInputMessageTable(state) {
  return {
    "ArrowRight:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        right: true
      };
      state.components.userInput = newUserInput;
    },
    "ArrowRight:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        right: false
      };
      state.components.userInput = newUserInput;
    },
    "ArrowLeft:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        left: true
      };
      state.components.userInput = newUserInput;
    },
    "ArrowLeft:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        left: false
      };
      state.components.userInput = newUserInput;
    },
    "ArrowUp:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        up: true
      };
      state.components.userInput = newUserInput;
    },
    "ArrowUp:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        up: false
      };
      state.components.userInput = newUserInput;
    },
    "ArrowDown:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        down: true
      };
      state.components.userInput = newUserInput;
    },
    "ArrowDown:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        down: false
      };
      state.components.userInput = newUserInput;
    },
    "Enter:keydown": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        enter: true
      };
      state.components.userInput = newUserInput;
    },
    "Enter:keyup": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        enter: false
      };
      state.components.userInput = newUserInput;
    },
    "mouse click": (message) => {
      let newUserInput = { 
        ...state.components.userInput,
        click: true,
        clickCoord: message.data,
      };
      state.components.userInput = newUserInput;
    },
  };
}

export { createUserInputMessageTable };
