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

  createClockGridEntity(ecManager, options);

  const gridOptions = { ...options, y: options.y + 20, clickable: true };

  createGridEntity(ecManager, gridOptions);
}

export { createSeqGridEntity };
