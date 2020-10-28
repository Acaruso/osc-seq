const defaultOptions = {
  position: { x: 0, y: 0 },
}

function createBpmDisplay(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };

  // const parentId = ecManager.createEC({
  //   parent: { type: "bpm display" },
  //   position: { x: options.position.x, y: options.position.y },
  // });

  const upArrowId = ecManager.createEC({
    image: { name: "upArrow", w: 25, h: 13 },
    position: { x: options.position.x, y: options.position.y },
    incrementer: { tableName: "bpm", colName: "value" },
    drawable: {},
    clickable: {},
  });

  const downArrowId = ecManager.createEC({
    image: { name: "downArrow", w: 25, h: 13 },
    position: { x: options.position.x, y: options.position.y + 20 },
    decrementer: { tableName: "bpm", colName: "value" },
    drawable: {},
    clickable: {},
  });

  ecManager.createEC({
    text: { font: "12px serif", tableName: "bpm", colName: "value" },
    position: { x: options.position.x + 40, y: options.position.y },
    drawable: {},
  })

  // ecManager.createEC({
  //   parentToChild: { parentId, childId: upArrowId },
  // });

  // ecManager.createEC({
  //   parentToChild: { parentId, childId: downArrowId },
  // });
}

export { createBpmDisplay }
