import { addEntity } from "./entity";
import { addComponent } from "./component";

function drawBall(ball, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function createUpdateBallPositionMessage(row) {
  let newPosition = {
    x: row.x,
    y: row.y,
  };

  if (row.right) {
    newPosition.x += 2;
  }
  else if (row.left) {
    newPosition.x -= 2;
  }
  else if (row.up) {
    newPosition.y -= 2;
  }
  else if (row.down) {
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

function createBallEntity(state) {
  const newEntityId = addEntity(state.entities, { name: "ball" });

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

export { drawBall, createBallEntity, createUpdateBallPositionMessage };
