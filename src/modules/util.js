function drawRect(rect, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fillStyle = "#FF5733";
  ctx.fill();
  ctx.closePath();
}

function strokeRect(rect, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function detectRectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function getSquareFromCircle(circle) {
  let square = {};
  square.x = circle.x - circle.radius;
  square.y = circle.y - circle.radius;
  square.width = circle.radius * 2;
  square.height = circle.radius * 2;
  return square;
}

export { drawRect, strokeRect, detectRectCollision, getSquareFromCircle };
