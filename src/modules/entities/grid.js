import { createRectEntity } from "./rect";

const defaultOptions = {
  clickable: true,
};

function createGridEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };
  const { numRows, numCols, cellWidth, cellHeight, x, y } = options;
  const rectOptions = { clickable: options.clickable };
  const newEntityId = ecManager.addEntity();

  ecManager.addComponent({ numRows, numCols }, "grid", newEntityId);
  ecManager.addComponent({ x, y }, "position", newEntityId);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const data = getRectForGrid(row, col, cellWidth, cellHeight, x, y, rectOptions);
      createRectEntity(ecManager, data);
    }
  }

  return newEntityId;
}

function getRectForGrid(row, col, cellWidth, cellHeight, gridX, gridY, rectOptions) {
  return {
    ...rectOptions,
    color: "#FF5733",
    altColor: "#b2b2b2",
    x: (cellWidth * col) + gridX,
    y: (cellHeight * row) + gridY,
    w: cellWidth,
    h: cellHeight,
    gridRect: true,
  };
}

export { createGridEntity }
