function getKeyboard() {
  return {
    right: false,
    left: false,
    up: false,
    down: false,
    enter: false,
  };
}

function addKeyboardHandlers(messages) {
  function keyHandler(e) {
    messages.push({ type: `${e.key}:${e.type}` });
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
  }

  // if (keyboard.enter) {
  //   messages.push({ type: "osc trigger" });
  // }

  messages.push({ type: "update ball", data: { ball: newBall } });
  return messages;
}

export { getKeyboard, addKeyboardHandlers, handleKeyboardEvents };
