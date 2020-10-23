import { createGridEntity } from "./grid";

const defaultOptions = {
  x: 0,
  y: 0,
  numRows: 2,
  numCols: 4,
};

function createSeqGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };

  createGridEntity(
    ecManager,
    {
      grid: { numRows: 1, numCols: options.numCols },
      position: { x: options.x, y: options.y },
      clockable: {},
    },
    {
      rect: {
        w: 50,
        h: 20,
        color: "#FF5733",
        altColor: "#B2B2B2",
        gridRect: true,
      },
      toggleable: {},
    }
  );

  createGridEntity(
    ecManager,
    {
      grid: { numRows: options.numRows, numCols: options.numCols },
      position: { x: options.x, y: options.y + 20 },
    },
    {
      rect: {
        w: 50,
        h: 50,
        color: "#FF5733",
        altColor: "#B2B2B2",
        gridRect: true,
      },
      clickable: {},
      toggleable: {},
    }
  );
}

export { createSeqGridEntity };
