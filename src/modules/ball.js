function getBall(canvas) {
  return {
    drawMessage: "draw ball",
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    getUpdate: (key, state) => {
      const { ball, keyboard } = selector(key, state);
      return getUpdatedBall(key, ball, keyboard);
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
  const ball = state.objects[key];
  const { keyboard } = state;
  return { ball, keyboard };
}

function getUpdatedBall(key, ball, keyboard) {
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
