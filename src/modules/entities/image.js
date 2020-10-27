function drawImage({ position }, imageElt, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.drawImage(imageElt, position.x, position.y);
}

export { drawImage };
