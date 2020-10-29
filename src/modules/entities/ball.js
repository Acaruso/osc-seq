function createUpdateBallPositionMessage(position, userInput) {
  let newPosition = { ...position };

  if (userInput.right) {
    newPosition.x += 2;
  }
  else if (userInput.left) {
    newPosition.x -= 2;
  }
  else if (userInput.up) {
    newPosition.y -= 2;
  }
  else if (userInput.down) {
    newPosition.y += 2;
  } else {
    return [];
  }

  return {
    type: "update component",
    component: "position",
    data: newPosition
  };
}

export { createUpdateBallPositionMessage };
