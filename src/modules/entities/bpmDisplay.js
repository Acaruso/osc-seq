const defaultOptions = {
  position: { x: 0, y: 0 },
}

function createBpmDisplay(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };

  ecManager.createEC({
    image: { name: "upArrow" },
    position: { x: options.position.x, y: options.position.y },
    drawable: {},
  });

  ecManager.createEC({
    image: { name: "downArrow" },
    position: { x: options.position.x, y: options.position.y + 20 },
    drawable: {},
  });
}

export { createBpmDisplay }
