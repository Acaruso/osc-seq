import { createRectEntity } from "./rect";

const defaultOptions = {
  clickable: false,
  clockable: false,
};

function createGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };
  const { numRows, numCols, cellWidth, cellHeight, x, y } = options;

  const rectOptions = { 
    clickable: options.clickable,
    gridRect: true,
    color: "#FF5733",
    altColor: "#B2B2B2",
  };

  const gridId = ecManager.addEntity();

  ecManager.addComponent({ numRows, numCols }, "grid", gridId);
  ecManager.addComponent({ x, y }, "position", gridId);
  if (options.clockable) {
    ecManager.addComponent({}, "clockable", gridId);
  }

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const data = getRectForGrid(row, col, cellWidth, cellHeight, x, y, gridId, rectOptions);
      createRectEntity(ecManager, data);
    }
  }

  return gridId;
}

function getRectForGrid(row, col, cellWidth, cellHeight, gridX, gridY, gridId, rectOptions) {
  return {
    ...rectOptions,
    x: (cellWidth * col) + gridX,
    y: (cellHeight * row) + gridY,
    w: cellWidth,
    h: cellHeight,
    gridId,
    row,
    col,
  };
}

export { createGridEntity }
