function getOscMessageTable(state) {
  return {
    "osc trigger 1": (message) => {
      if (state.clock % 32 === 0) {
        state.oscClient.send('/1', 200);
      }
    },
    "osc trigger 2": (message) => {
      if (state.clock % 64 === 0) {
        state.oscClient.send('/2', 200);
      }
    },
  };
}

export { getOscMessageTable };
