function drawText({ text, position }, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = "hanging";
  ctx.fillStyle = "#000000";
  ctx.font = text.font;
  ctx.fillText(text.value, position.x, position.y);
}

export { drawText };
