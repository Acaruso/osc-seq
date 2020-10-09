function getBall(canvas) {
  return {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    getDrawMessage: (keys, state) => {
      const [ tableId, objectId ] = keys;
      const ball = state.objects.get(tableId).get(objectId);
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

export { getBall, drawBall };
