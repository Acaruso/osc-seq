function createOscMessageTable(state) {
  return {
    "send osc": (message) => {
      const channel = message.data.channel;
      state.oscClient.send(`/${channel}`, 200);
    },
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

export { createOscMessageTable };
