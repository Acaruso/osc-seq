import { strokeRect, isCoordInsideRect } from "./util";
import { getRect, createRectForGrid } from "./rect";

function createGrid(state) {
  const grid = createGridData({ numRows: 2, numCols: 4, x: 5, y: 5 });
  const gridId = state.objects
    .find((table) => table.name === "Grids")
    .push(grid);

  const rectsForGrid = createRectsForGrid(gridId, grid, state);
  const rectsTable = state.objects.find((table) => table.name === "Rects");
  rectsForGrid.forEach((rect) => rectsTable.push(rect));
}

function createGridData(options = {}) {
  let { numRows, numCols, cellWidth, cellHeight, x, y } = options;

  let grid = {};
  
  grid.numRows = numRows || 2;
  grid.numCols = numCols || 4;
  grid.cellWidth = cellWidth || 50;
  grid.cellHeight = cellHeight || 50;
  grid.x = x || 0;
  grid.y = y || 0;
  grid.width = grid.numCols * grid.cellWidth;
  grid.height = grid.numRows * grid.cellHeight;

  // grid itself doesn't actually need to be drawn
  // just rects for grid need to be drawn
  // grid.getDrawMessage = (key, state) => {
  //   return {};
  // };
  grid.detectClick = (key, coord, state) => {
    return false;
  };
  grid.onClick = (key, coord, state) => {
    return [];
  };

  return grid;
}

function createRectsForGrid(gridId, grid) {
  let rects = [];
  const color = "#FF5733";

  for (let row = 0; row < grid.numRows; row++) {
    for (let col = 0; col < grid.numCols; col++) {
      const x = (grid.cellWidth * col) + grid.x;
      const y = (grid.cellHeight * row) + grid.y;
      const width = grid.cellWidth;
      const height = grid.cellHeight;

      const rect = createRectForGrid({ 
        x, y, width, height, color, 
        row, col, fill: true, gridId
      });

      rects.push(rect);
    }
  }

  return rects;
}

// function createGridData(options = {}) {
//   let { numRows, numCols, cellWidth, cellHeight, x, y } = options;

//   let grid = {};
  
//   grid.numRows = numRows || 2;
//   grid.numCols = numCols || 4;
//   grid.cellWidth = cellWidth || 50;
//   grid.cellHeight = cellHeight || 50;
//   grid.x = x || 0;
//   grid.y = y || 0;
//   grid.width = grid.numCols * grid.cellWidth;
//   grid.height = grid.numRows * grid.cellHeight;
//   grid.data = getGridData(grid);

//   grid.getDrawMessage = (key, state) => {
//     const grid = state.objects[key];
//     return { type: "draw grid", data: grid };
//   };
//   grid.detectClick = (key, coord, state) => {
//     const rect = state.objects[key];
//     return isCoordInsideRect(coord, rect);
//   };
//   grid.onClick = (key, coord, state) => {
//     let out = [];
//     const grid = state.objects[key];

//     for (let row = 0; row < grid.numRows; row++) {
//       for (let col = 0; col < grid.numCols; col++) {
//         let cell = grid.data[row][col];

//         if (isCoordInsideRect(coord, cell)) {
//           let newCell = { ...cell };
//           newCell.fill = !cell.fill;
//           out.push({
//             type: "update state w/ selector",
//             data: newCell,
//             selector: (state) => {
//               return (newVal) => {
//                 state.objects[key].data[row][col] = newVal;
//               }
//             },
//           });
//         }
//       }
//     }

//     return out;
//   };

//   return grid;
// }

function getGridData(grid) {
  const color = "#FF5733";

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

      data[row][col] = getRect({ x, y, width, height, color });
      data[row][col].fill = true;

      // data[row][col].rect = getRect({ x, y, width, height, color });
      // data[row][col].fill = true;

      // data[row][col] = { x, y, width, height, ...cell };
    }
  }

  return data;
}

function drawGrid(grid, canvas) {
  grid.data.flat().forEach((x) => strokeRect(x, canvas));
}

export { createGrid, drawGrid }
