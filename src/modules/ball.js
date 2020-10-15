import { addEntity, addComponent } from "./entityComponent";

function createBallEntity(state) {
  const newEntityId = addEntity(state.entities);

  addComponent(
    { x: 0, y: 0 }, 
    state.components.position,
    newEntityId,
  );
  addComponent(
    { radius: 10 }, 
    state.components.ball,
    newEntityId,
  );
  addComponent(
    { }, 
    state.components.drawable,
    newEntityId,
  );
  addComponent(
    { }, 
    state.components.controllable,
    newEntityId,
  );

  return newEntityId;
}

function drawBall(ball, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function createUpdateBallPositionMessage(row, userInput) {
  let newPosition = {
    x: row.x,
    y: row.y,
  };

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
    entityId: row.entityId,
    data: newPosition
  };
}

export { drawBall, createBallEntity, createUpdateBallPositionMessage };
