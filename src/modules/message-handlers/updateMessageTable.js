function getUpdateMessageTable(state) {
  return {
    "update component": (message) => {
      const component = message.component;
      const entityId = message.entityId;

      // entityId === -1 is singleton component
      // is there some better way to represent this?
      if (entityId === -1) {
        state.components[component] = message.data;
      } else {
        state.components[component][entityId] = message.data;
      }
    },
    "update clock": (message) => {
      state.clock = (state.clock + 1) % 4096;
    },
  };
}

export { getUpdateMessageTable };
