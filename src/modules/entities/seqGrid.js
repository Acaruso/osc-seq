import { createGridEntity } from "./grid";

const defaultOptions = {
  position: { x: 50, y: 50 },
  grid: { numRows: 4, numCols: 6 },
};

function createSeqGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };

  createGridEntity(
    ecManager,
    getClockGridOptions(options),
    getClockRectOptions(),
  );

  const gridId = createGridEntity(
    ecManager,
    getGridOptions(options),
    getRectOptions(),
  );

  addTriggerable(ecManager, options.rowToChannel, gridId);
}

function addTriggerable(ecManager, rowToChannel, gridId) {
  const r2gs = ecManager
    .join2(["rectToGrid"])
    .filter(({ rectToGrid }) => rectToGrid.gridId === gridId);
  
  // rowToChannel: { "0": 0, "1": 1}
  // index is row, key is channel

  for (const { rectToGrid } of r2gs) {
    const row = rectToGrid.row.toString();
    if (rowToChannel.hasOwnProperty(row)) {
      const channel = rowToChannel[row];
      ecManager.extend(
        {
          triggerable: { channel },
        },
        rectToGrid.entityId,
      )
    }
  }
}

function getClockGridOptions(options) {
  return {
    grid: { numRows: 1, numCols: options.grid.numCols },
    position: { x: options.position.x, y: options.position.y },
    clockable: {},
  };
}

function getClockRectOptions() {
  return {
    rect: {
      w: 50,
      h: 20,
      color: "#FF5733",
      altColor: "#B2B2B2",
      gridRect: true,
    },
    toggleable: {},
  };
}

function getGridOptions(options) {
  return {
    grid: { numRows: options.grid.numRows, numCols: options.grid.numCols },
    position: { x: options.position.x, y: options.position.y + 20 },
  };
}

function getRectOptions() {
  return {
    rect: {
      w: 50,
      h: 50,
      color: "#FF5733",
      altColor: "#B2B2B2",
      gridRect: true,
    },
    clickable: {},
    toggleable: {},
  };
}

export { createSeqGridEntity };
