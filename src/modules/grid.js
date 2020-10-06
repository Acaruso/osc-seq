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
  grid.data = getGridData(grid);

  return grid;
}

function getGridData(grid) {
  const cell = {
    fill: true,
    color: "#FF5733",
  };

  let data = new Array(grid.numRows);
  
  for (let i = 0; i < grid.numRows; i++) {
    data[i] = new Array(grid.numCols).fill({});
  }

  for (let row = 0; row < grid.numRows; row++) {
    for (let col = 0; col < grid.numCols; col++) {
      const x = (grid.cellHeight * col) + grid.x;
      const y = (grid.cellWidth * row) + grid.y;
      const width = grid.cellWidth;
      const height = grid.cellHeight;

      data[row][col] = { x, y, width, height, ...cell };
    }
  }

  return data;
}

function drawGrid(grid, canvas) {
  grid.data.flat().forEach((x) => strokeRect(x, canvas));
}

export { getGrid, drawGrid }
