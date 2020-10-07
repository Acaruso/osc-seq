function getBall(canvas) {
  const ball = {
    drawMessage: "draw ball",
    updateMessage: "get updated ball",
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    getUpdate: function (i, state) {
      const ball = state.objects[i];
      const res = getUpdatedBall(ball, i, state);
      return res;
    },
  };

  console.log(ball)
  return ball;
}

function drawBall(ball, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function getUpdatedBall(ball, i, state) {
  const { keyboard } = state;
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

  // messages.push({ type: "update ball", data: { ball: newBall } });
  // return messages;

  return { type: "update ball", index: i, data: { ball: newBall } };
}


export { getBall, drawBall, getUpdatedBall };
