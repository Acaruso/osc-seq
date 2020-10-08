function getUpdateMessageTable(state) {
  return {
    "update state": (message) => {
      const key = message.key;
      state.objects[key] = message.data;
    },
    "update state w/ selector": (message) => {
      message.selector(state)(message.data);
    },
    "update ball": (message) => {
      const index = message.key;
      state.objects[index] = message.data;
    },
    "update rect": (message) => {
      state.rect = message.data.rect;
    },
    "update grid": (message) => {
      const { row, col } = message.data;
      state.grid.data[row][col] = message.data.cell;
    },
    "update clock": (message) => {
      state.clock = (state.clock + 1) % 4096;
    },
  };
}

export { getUpdateMessageTable };
