function getRect(options = {}) {
  const { x, y, width, height, color } = options;
  
  return {
    drawMessage: "draw rect",
    x,
    y,
    width,
    height,
    color,
    getUpdate: (data) => { return []; },
  };
}

export { getRect };
