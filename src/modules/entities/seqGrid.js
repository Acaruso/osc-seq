import { createClockGridEntity } from "./clockGrid";
import { createGridEntity } from "./grid";

const defaultOptions = {
  x: 0,
  y: 0,
  numRows: 2,
  numCols: 4,
};

function createSeqGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };

  const id = ecManager.addEntity();

  const clockGridOptions = { ...options, parentId: id };

  createClockGridEntity(ecManager, clockGridOptions);

  const gridOptions = { ...options, y: options.y + 20, clickable: true };

  createGridEntity(ecManager, gridOptions);

  // for (const r2c of options.rowsToChannels) {
  //   createRowToChannelEntity(ecManager, r2c);
  // }
}

export { createSeqGridEntity };
