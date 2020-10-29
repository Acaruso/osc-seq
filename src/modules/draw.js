function drawBall({ ball, position }, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(position.x, position.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

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

function drawImage({ position }, imageElt, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.drawImage(imageElt, position.x, position.y);
}

function drawText({ text, position }, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = "hanging";
  ctx.fillStyle = "#000000";
  ctx.font = text.font;
  ctx.fillText(text.value, position.x, position.y);
}

export { drawBall, drawRect, drawImage, drawText };
