import { updateComponent } from "./../entityComponent";

function getUpdateMessageTable(state) {
  return {
    "update component": (message) => {
      // const compName = message.component;
      // const entityId = message.entityId;
      // const compTable = state.components[compName];
      // updateComponent(compTable, message.data, entityId);

      const comp = message.data;
      const tableName = message.component;
      const entityId = message.entityId;

      state.ecManager.updateComponent(comp, tableName, entityId)
    },
    "update clock": (message) => {
      state.clock = (state.clock + 1) % 4096;
    },
  };
}

export { getUpdateMessageTable };
