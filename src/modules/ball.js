import { addEntity } from "./entity";
import { addComponent, join } from "./component";

function getBall(canvas) {
  return {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    getDrawMessage: (key, state) => {
      const ball = state.objects[key];
      return { type: "draw ball", data: ball };
    },
    getUpdateMessage: (key, state) => {
      return getUpdateBallMessage(selector(key, state));
    },
  };
}

function drawBall(ball, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function selector(key, state) {
  return {
    key: key,
    ball: state.objects[key],
    keyboard: state.keyboard,
  };
}

function getUpdateBallMessage({ key, ball, keyboard }) {
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
    return [];
  }

  return { type: "update state", key, data: newBall };
}

function createUpdateBallPositionMessage(row) {
  let newPosition = {};
  newPosition.x = row.x;
  newPosition.y = row.y;

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

export { getBall, drawBall, createBallEntity, createUpdateBallPositionMessage };
