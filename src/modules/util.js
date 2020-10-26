function selectOptions(arr, options) {
  let out = {};
  for (const s of arr) {
    if (options.hasOwnProperty(s)) {
      out[s] = options[s];
    }
  }
  return out;
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
  selectOptions,
  detectRectCollision,
  getSquareFromCircle,
  isCoordInsideRect,
  log,
};
