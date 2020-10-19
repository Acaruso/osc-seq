function drawRect({ rect, position }, canvas) {
  if (rect.gridRect) {
    drawOutlinedRect({ rect, position }, canvas);
  } else {
    drawFilledRect({ rect, position }, canvas);
  }
}

function drawFilledRect({ rect, position }, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(position.x, position.y, rect.w, rect.h);
  ctx.fillStyle = rect.color;
  ctx.fill();
  ctx.closePath();
}

function drawOutlinedRect({ rect, position }, canvas) {
  const lineWidth = 2;
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(position.x, position.y, rect.w, rect.h);
  
  let innerRect = {};
  let innerPos = {};
  innerPos.x = position.x + (lineWidth / 2);
  innerPos.y = position.y + (lineWidth / 2);
  innerRect.w = rect.w - lineWidth;
  innerRect.h = rect.h - lineWidth;
  innerRect.color = rect.color;
  drawFilledRect({ rect: innerRect, position: innerPos }, canvas);
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

function isCoordInsideRect(coord, rect, position) {
  const { x, y } = coord;
  let res = (
    x >= position.x && 
    y >= position.y && 
    x <= position.x + rect.w &&
    y <= position.y + rect.h
  );
  return res;
}

function log(s = "") {
  console.log(s);
}

export { 
  drawRect,
  detectRectCollision,
  getSquareFromCircle,
  isCoordInsideRect,
  log,
};
