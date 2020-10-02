function getUpdateMessageTable(state) {
  return {
    "update ball": (message) => {
      state.ball = message.data.ball;
    },
    "update debug text": (message) => {
      state.debugText = message.data.newDebugText;
    },
    "update clock": (message) => {
      state.clock = (state.clock + 1) % 4096;
    },
  };
}

export { getUpdateMessageTable };
