import { createRectEntity } from "./rect";


const defaultOptions = {
  grid: { numRows: 2, numCols: 3 },
  position: { x: 300, y: 300 },
  rect: { w: 50, h: 50, color: "#FF5733", altColor: "#B2B2B2", gridRect: true },
};

function selectOptions(arr, options) {
  let out = {};
  for (const s of arr) {
    if (options.hasOwnProperty(s)) {
      out[s] = options[s];
    }
  }
  return out;
}

function createGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };

  const gridOptions = selectOptions(["grid", "position", "clockable"], options);
  const gridId = ecManager.createEC2(gridOptions);

  const rectOptions = selectOptions(["rect"], options);
  console.log(rectOptions)

  for (let row = 0; row < options.grid.numRows; row++) {
    for (let col = 0; col < options.grid.numCols; col++) {
      const data = getRectForGrid(
        row, 
        col, 
        options.position.x, 
        options.position.y, 
        gridId, 
        rectOptions
      );
      const rectId = ecManager.createEC2(data);
    }
  }

  return gridId;
}

function getRectForGrid(row, col, gridX, gridY, gridId, rectOptions) {
  const { rect } = rectOptions;
  const x = (rect.w * col) + gridX;
  const y = (rect.h * row) + gridY;
  return {
    rect: rect,
    position: { x, y },
    rectToGrid: { gridId, row, col },
    drawable: { },
    clickable: { },
    toggleable: { },
  };
}




// const defaultOptions = {
//   parentId: -1,
//   x: 0,
//   y: 0,
//   numRows: 2,
//   numCols: 4,
//   cellWidth: 50,
//   cellHeight: 50,
//   clickable: false,
//   clockable: false,
// };

// function createGridEntity(ecManager, options = {}) {
//   options = { ...defaultOptions, ...options };
//   const { numRows, numCols, cellWidth, cellHeight, x, y } = options;

//   const gridId = ecManager.addEntity({ parentId: options.parentId });

//   ecManager.addComponent({ numRows, numCols }, "grid", gridId);
//   ecManager.addComponent({ x, y }, "position", gridId);
//   if (options.clockable) {
//     ecManager.addComponent({}, "clockable", gridId);
//   }

//   const rectOptions = { 
//     clickable: options.clickable,
//     gridRect: true,
//     color: "#FF5733",
//     altColor: "#B2B2B2",
//   };

//   for (let row = 0; row < numRows; row++) {
//     for (let col = 0; col < numCols; col++) {
//       const data = getRectForGrid(row, col, cellWidth, cellHeight, x, y, gridId, rectOptions);
//       createRectEntity(ecManager, data);
//     }
//   }

//   return gridId;
// }

// function getRectForGrid(row, col, cellWidth, cellHeight, gridX, gridY, gridId, rectOptions) {
//   return {
//     ...rectOptions,
//     x: (cellWidth * col) + gridX,
//     y: (cellHeight * row) + gridY,
//     w: cellWidth,
//     h: cellHeight,
//     gridId,
//     row,
//     col,
//   };
// }

export { createGridEntity }
