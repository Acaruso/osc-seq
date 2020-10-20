import { createGridEntity } from './grid';

function createClockGridEntity(ecManager) {
  const id = createGridEntity(
    ecManager, 
    { numRows: 1, numCols: 4, cellWidth: 50, cellHeight: 20, x: 350, y: 350, clickable:false }
  );
}

export { createClockGridEntity };