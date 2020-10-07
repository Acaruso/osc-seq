function getUpdateMessageTable(state) {
  return {
    "update ball": (message) => {
      const index = message.index;
      state.objects[index] = message.data.ball;
    },
    "update rect": (message) => {
      state.rect = message.data.rect;
    },
    "update grid": (message) => {
      const { row, col } = message.data;
      state.grid.data[row][col] = message.data.cell;
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
