function getKeyboard() {
  return {
    right: false,
    left: false,
    up: false,
    down: false,
    enter: false,
    click: false,
    clickCoord: { x: 0, y: 0 },
  };
}

function addKeyboardHandlers(queue) {
  function keyHandler(e) {
    queue.push({ type: `${e.key}:${e.type}` });
  }

  document.addEventListener("keydown", keyHandler, false);
  document.addEventListener("keyup", keyHandler, false);
}

function addMouseHandler(state, queue) {
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
    x: event.x - canvas.offsetLeft,
    y: event.y - canvas.offsetTop,
  };
}

export { getKeyboard, addKeyboardHandlers, addMouseHandler };
