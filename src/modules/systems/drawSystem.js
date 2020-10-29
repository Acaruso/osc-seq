import { isCoordInsideRect } from "../util";

function drawSystem(state) {
  let out = [];

  const drawBallsMsgs = drawBallsSystem(state);
  out.push(drawBallsMsgs);

  const drawRectsMsgs = drawRectsSystem(state);
  out.push(drawRectsMsgs);

  const imageMsgs = drawImagesSystem(state);
  out.push(imageMsgs);

  const textMsgs = drawTextSystem(state);
  out.push(textMsgs);

  const imGuiMsgs = drawImGuiSystem(state);
  out.push(imGuiMsgs);

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

function drawImagesSystem(state) {
  let out = [];

  let rows = state.ecManager.join2(["image", "position", "drawable"]);

  for (const { image, position } of rows) {
    out.push({ type: "draw image", data: { image, position } });
  }

  return out;
}

function drawTextSystem(state) {
  let out = [];

  let rows = state.ecManager.join2(["text", "position", "drawable"]);

  for (const { text, position } of rows) {
    out.push({
      type: "draw text",
      data: { text, position }
    });
  }

  return out;
}

function drawImGuiSystem(state) {
  const userInput = state.ecManager.getComponent("userInput");

  let out = [];

  if (drawIncrementer(100, 200, userInput, out)) {
    console.log('yep')
  }

  return out;
}

function drawIncrementer(x, y, userInput, out) {
  const image = { name: "upArrow", w: 25, h: 13 };
  const position = { x, y };

  out.push({
    type: "draw image",
    data: {
      image,
      position,
    }
  });

  const coord = { x: userInput.cx, y: userInput.cy };
  const rect = { w: image.w, h: image.h };

  if (userInput.click && isCoordInsideRect(coord, rect, position)) {
    return true;
  } else {
    return false;
  }
}

export { drawSystem };
