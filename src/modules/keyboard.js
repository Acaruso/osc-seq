function getKeyboard() {
  return {
    right: false,
    left: false,
    up: false,
    down: false,
    enter: false,
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
      const messages = handleMouseClick(event, state);
      queue.push(messages);
    },
    false
  );
}

function handleMouseClick(event, state) {
  let out = [];
  const coord = getMouseCoord(event, state.canvas);

  for (let i = 0; i < state.objects.length; i++) {
    const object = state.objects[i];
    if (object.detectClick) {
      const isClicked = object.detectClick(i, coord, state);
      if (isClicked && object.onClick) {
        const res = object.onClick(i, coord, state);
        out.push(res);
      }
    }
  }

  return out;
}

function getMouseCoord(event, canvas) {
  return {
    x: event.x - canvas.offsetLeft,
    y: event.y - canvas.offsetTop,
  };
}

export { getKeyboard, addKeyboardHandlers, addMouseHandler };
