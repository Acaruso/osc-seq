import { strokeRect } from "./util";

function getGrid(options = {}) {
  let { numRows, numCols, cellWidth, cellHeight, x, y } = options;

  let grid = {};
  
  grid.drawMessage = "draw grid";
  grid.numRows = numRows || 2;
  grid.numCols = numCols || 4;
  grid.cellWidth = cellWidth || 50;
  grid.cellHeight = cellHeight || 50;
  grid.x = x || 0;
  grid.y = y || 0;
  grid.width = grid.numCols * grid.cellWidth;
  grid.height = grid.numRows * grid.cellHeight;
  grid.data = getGridData(grid);
  grid.getUpdate = (data) => { return []; };

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
      const x = (grid.cellWidth * col) + grid.x;
      const y = (grid.cellHeight * row) + grid.y;
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
