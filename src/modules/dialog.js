function drawDialog(text, pixels, x, y, canvas) {
  let ctx = canvas.getContext('2d');
  ctx.font = `${pixels}px sans-serif`;
  ctx.fillText(text, x, y);
}

function drawDebugDialog(text, canvas) {
  const pixels = 32;
  const x = 0;
  const y = canvas.height / 2;
  drawDialog(text, pixels, x, y, canvas);
}

function updateDebugText(text) {
  return {
    type: "update debug text",
    data: {
      newDebugText: text,
    },
  };
}

export { drawDebugDialog, updateDebugText };
