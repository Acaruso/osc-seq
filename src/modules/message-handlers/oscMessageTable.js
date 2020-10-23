function createOscMessageTable(state) {
  return {
    "send osc": (message) => {
      const channel = message.data.channel;
      state.oscClient.send(`/${channel}`, 200);
    },
  };
}

export { createOscMessageTable };
