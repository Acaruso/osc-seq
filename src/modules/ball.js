function getBall(canvas) {
  return {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
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

export { getBall, drawBall };
