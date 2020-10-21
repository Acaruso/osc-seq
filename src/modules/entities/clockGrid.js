import { createGridEntity } from './grid';

const defaultOptions = {
  parentId: -1,
  x: 0,
  y: 0,
  numRows: 1,
  numCols: 4,
  cellWidth: 50,
  cellHeight: 20,
  clickable: false,
  clockable: true,
};

function createClockGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };
  
  const id = createGridEntity(ecManager, options);

  return id;
}

export { createClockGridEntity };