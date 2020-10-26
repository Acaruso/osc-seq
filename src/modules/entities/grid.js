const defaultGridOptions = {
  grid: { numRows: 2, numCols: 2 },
  position: { x: 0, y: 0 },
};

const defaultRectOptions = {
  rect: { w: 50, h: 50, color: "#FF5733", altColor: "#B2B2B2", gridRect: true },
};

function createGridEntity(ecManager, gridOptions = {}, rectOptions = {}) {
  gridOptions = { ...defaultGridOptions, ...gridOptions };
  rectOptions = { ...defaultRectOptions, ...rectOptions };

  const gridId = ecManager.createEC(gridOptions);

  for (let row = 0; row < gridOptions.grid.numRows; row++) {
    for (let col = 0; col < gridOptions.grid.numCols; col++) {
      const newRectOpts = {
        ...rectOptions,
        position: {
          x: (rectOptions.rect.w * col) + gridOptions.position.x,
          y: (rectOptions.rect.h * row) + gridOptions.position.y,
        },
        rectToGrid: { gridId, row, col },
        drawable: {},
        toggleable: { isToggled: false },
      };

      const rectId = ecManager.createEC(newRectOpts);
    }
  }

  return gridId;
}

export { createGridEntity }
