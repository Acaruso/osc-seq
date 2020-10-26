function createUpdateMessageTable(state) {
  return {
    "update component": (message) => {
      const comp = message.data;
      const tableName = message.component;
      state.ecManager.updateComponent(comp, tableName);
    },
  };
}

export { createUpdateMessageTable };
