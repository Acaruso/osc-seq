import { getOscMessageTable } from "./oscMessageTable";
import { getDrawMessageTable } from "./drawMessageTable";
import { getUpdateMessageTable } from "./updateMessageTable";

function getRootMessageTable(state) {
  const rootMessageTable = {
    "end of game loop": (message) => { },
  };

  return {
    ...rootMessageTable,
    ...getOscMessageTable(state),
    ...getDrawMessageTable(state),
    ...getUpdateMessageTable(state),
  };
}

export { getRootMessageTable };
