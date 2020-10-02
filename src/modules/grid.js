import { strokeRect } from "./util";

function getGrid(numRows, numCols) {
  let grid = {};
  
  grid.numRows = numRows;
  grid.numCols = numCols;
  grid.cellWidth = 50;
  grid.cellHeight = 50;
  grid.x = 4;
  grid.y = 4;
  grid.width = grid.numCols * grid.cellWidth;
  grid.height = grid.numRows * grid.cellHeight;

  grid.data = new Array(numRows);
  
  for (let i = 0; i < numRows; i++) {
    grid.data[i] = new Array(numCols).fill(0);
  }

  return grid;
}

function drawGrid(grid, canvas) {
  for (let row = 0; row < grid.numRows; row++) {
    for (let col = 0; col < grid.numCols; col++) {

      const x = (grid.cellHeight * col) + grid.x;
      const y = (grid.cellWidth * row) + grid.y;

      strokeRect(
        { x: x, y: y, width: grid.cellWidth, height: grid.cellHeight }, 
        canvas
      );
    }
  }
}

export { getGrid, drawGrid }
