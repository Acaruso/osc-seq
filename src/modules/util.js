function drawRect(rect, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = rect.color;
  ctx.fill();
  ctx.closePath();
}

function strokeRect(rect, canvas) {
  const lineWidth = 2;
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  
  if (rect.fill) {
    let inner = {};
    inner.x = rect.x + (lineWidth / 2);
    inner.y = rect.y + (lineWidth / 2);
    inner.w = rect.w - lineWidth;
    inner.h = rect.h - lineWidth;
    inner.color = rect.color;
    drawRect(inner, canvas);
  }
}

function detectRectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

function getSquareFromCircle(circle) {
  let square = {};
  square.x = circle.x - circle.radius;
  square.y = circle.y - circle.radius;
  square.w = circle.radius * 2;
  square.h = circle.radius * 2;
  return square;
}

function isCoordInsideRect(coord, rect) {
  const { x, y } = coord;
  let res = (
    x >= rect.x && 
    y >= rect.y && 
    x <= rect.x + rect.w &&
    y <= rect.y + rect.h
  );
  return res;
}

function log(s = "") {
  console.log(s);
}

export { 
  drawRect,
  strokeRect,
  detectRectCollision,
  getSquareFromCircle,
  isCoordInsideRect,
  log,
};
