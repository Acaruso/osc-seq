import { createOscMessageTable } from "./oscMessageTable";
import { createDrawMessageTable } from "./drawMessageTable";
import { createUpdateMessageTable } from "./updateMessageTable";
import { createUserInputMessageTable } from './userInputMessageTable';

function createRootMessageTable(state) {
  const rootMessageTable = {
    "end of game loop": (message) => { },
  };

  return {
    ...rootMessageTable,
    ...createOscMessageTable(state),
    ...createDrawMessageTable(state),
    ...createUpdateMessageTable(state),
    ...createUserInputMessageTable(state),
  };
}

export { createRootMessageTable };
