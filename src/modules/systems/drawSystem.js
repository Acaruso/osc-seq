function drawSystem(state) {
  let out = [];

  let drawBallsMsgs = drawBallsSystem(state);
  out = out.concat(drawBallsMsgs);

  let drawRectsMsgs = drawRectsSystem(state);
  out = out.concat(drawRectsMsgs);

  return out;
}

function drawBallsSystem(state) {
  let out = [];

  let rows = state.ecManager.join2(["ball", "position", "drawable"]);

  for (const { ball, position } of rows) {
    out.push({ type: "draw ball", data: { ball, position } });
  }

  return out;
}

function drawRectsSystem(state) {
  let out = [];

  let rows = state.ecManager.join2(["rect", "position", "drawable", "toggleable"]);

  for (const { rect, position, toggleable } of rows) {
    rect.color = toggleable.isToggled ? rect.altColor : rect.color;
    out.push({ type: "draw rect", data: { rect, position } });
  }

  return out;
}

export { drawSystem };
