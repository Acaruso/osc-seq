function createBallEntity(ecManager) {
  const newEntityId = ecManager.addEntity();

  ecManager.addComponent({ x: 0, y: 0 }, "position", newEntityId);
  ecManager.addComponent({ radius: 10 }, "ball", newEntityId);
  ecManager.addComponent({ }, "drawable", newEntityId);
  ecManager.addComponent({ }, "controllable", newEntityId);

  return newEntityId;
}

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

function drawBall({ ball, position }, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(position.x, position.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

export { drawBall, createBallEntity, createUpdateBallPositionMessage };
