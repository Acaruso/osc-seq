import { isCoordInsideRect } from "./util";

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

function handleKeyboardEvents(state) {
  let { keyboard, ball } = state;
  let messages = [];

  let newBall = { ...ball };

  if (keyboard.right) {
    newBall.x += 2;
  }
  else if (keyboard.left) {
    newBall.x -= 2;
  }
  else if (keyboard.up) {
    newBall.y -= 2;
  }
  else if (keyboard.down) {
    newBall.y += 2;
  } else {
    return messages;
  }

  messages.push({ type: "update ball", data: { ball: newBall } });
  return messages;
}

function addMouseHandler(state, queue) {
  document.addEventListener(
    "mousedown", 
    (event) => handleMouseClick(event, state, queue), 
    false
  );
}

function handleMouseClick(event, state, queue) {
  const coord = getMouseCoord(event, state.canvas);

  if (isCoordInsideRect(coord, state.rect)) {
    let newRect = { ...state.rect };

    if (state.rect.color === "#FF5733") {
      newRect.color = "#000000";
      queue.push({ type: "update rect", data: { rect: newRect } });
    } else {
      newRect.color = "#FF5733";
      queue.push({ type: "update rect", data: { rect: newRect } });
    }
  }

  if (isCoordInsideRect(coord, state.grid)) {
    for (let row = 0; row < state.grid.numRows; row++) {
      for (let col = 0; col < state.grid.numCols; col++) {
        let cell = state.grid.data[row][col];

        if (isCoordInsideRect(coord, cell)) {
          let newCell = { ...cell };
          newCell.fill = !cell.fill;
          queue.push({ 
            type: "update grid", 
            data: { row, col, cell: newCell } 
          });
        }
      }
    }
  }
}

function getMouseCoord(event, canvas) {
  return {
    x: event.x - canvas.offsetLeft,
    y: event.y - canvas.offsetTop,
  };
}

export { getKeyboard, addKeyboardHandlers, addMouseHandler, handleKeyboardEvents };
