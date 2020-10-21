function createUserInput() {
  return {
    right: false,
    left: false,
    up: false,
    down: false,
    enter: false,
    click: false,
    cx: 0,
    cy: 0,
  };
}

function addKeyboardHandlers(queue) {
  function keyHandler(e) {
    queue.push({ type: `${e.key}:${e.type}` });
  }

  document.addEventListener("keydown", keyHandler, false);
  document.addEventListener("keyup", keyHandler, false);
}

function addMouseHandlers(state, queue) {
  document.addEventListener(
    "mousedown", 
    (event) => {
      const coord = getMouseCoord(event, state.canvas);
      queue.push({ type: "mouse click", data: coord })
    },
    false
  );
}

function getMouseCoord(event, canvas) {
  return {
    cx: event.x - canvas.offsetLeft,
    cy: event.y - canvas.offsetTop,
  };
}

export { createUserInput, addKeyboardHandlers, addMouseHandlers };
