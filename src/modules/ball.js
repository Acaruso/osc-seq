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
    getUpdateMessage: (keys, state) => {
      return getUpdateBallMessage(selector(keys, state));
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

function selector(keys, state) {
  return {
    keys: keys,
    ball: state.objects.get(tableId).get(objectId),
    keyboard: state.keyboard,
  };
}

function getUpdateBallMessage({ keys, ball, keyboard }) {
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

  return { type: "update state", keys, data: newBall };
}

export { getBall, drawBall };
