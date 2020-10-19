import { createOscMessageTable } from "./oscMessageTable";
import { createDrawMessageTable } from "./drawMessageTable";
import { createUpdateMessageTable } from "./updateMessageTable";

function createRootMessageTable(state) {
  const rootMessageTable = {
    "end of game loop": (message) => { },
  };

  return {
    ...rootMessageTable,
    ...createOscMessageTable(state),
    ...createDrawMessageTable(state),
    ...createUpdateMessageTable(state),
  };
}

export { createRootMessageTable };
