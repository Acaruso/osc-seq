import { createGridEntity } from './grid';

function createClockGrid(ecManager) {
  createGridEntity(
    ecManager, 
    { numRows: 1, numCols: 4, cellWidth: 50, cellHeight: 20, x: 350, y: 350 }
  );
}

export { createClockGrid };