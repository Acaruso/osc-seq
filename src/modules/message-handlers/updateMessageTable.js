import { updateComponent } from "./../entityComponent";

function getUpdateMessageTable(state) {
  return {
    "update component": (message) => {
      const compName = message.component;
      const entityId = message.entityId;

      const compTable = state.components[compName];

      updateComponent(compTable, message.data, entityId);

      // if (compTable.isSingleton) {
      //   compTable.data = message.data;
      // } else {
      //   updateComponent(compTable, message.data, entityId);
      // }

      // entityId === -1 is singleton component
      // is there some better way to represent this?
      // if (entityId === -1) {
      //   state.components[component] = message.data;
      // } else {
      //   state.components[component][entityId] = message.data;
      // }
    },
    "update clock": (message) => {
      state.clock = (state.clock + 1) % 4096;
    },
  };
}

export { getUpdateMessageTable };
