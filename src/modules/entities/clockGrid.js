import { createGridEntity } from './grid';

const defaultOptions = {
  x: 0,
  y: 0,
  numCols: 4,
  cellWidth: 50,
  cellHeight: 20,
};

function createClockGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };
  
  const id = createGridEntity(
    ecManager, 
    { 
      numRows: 1,
      numCols: options.numCols,
      cellWidth: options.cellWidth,
      cellHeight: options.cellHeight,
      x: options.x,
      y: options.y,
      clickable: false,
      clockable: true,
    }
  );

  return id;
}

export { createClockGridEntity };