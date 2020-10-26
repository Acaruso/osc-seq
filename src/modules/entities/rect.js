import { isCoordInsideRect } from "../util";

function createUpdateRectMessage(rect, position, toggleable, userInput) {
  const coord = { x: userInput.cx, y: userInput.cy };

  if (userInput.click && isCoordInsideRect(coord, rect, position)) {
    let newToggleable = { ...toggleable };
    newToggleable.isToggled = !newToggleable.isToggled;

    return {
      type: "update component",
      component: "toggleable",
      data: newToggleable,
    };
  } else {
    return [];
  }
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

export {
  createUpdateRectMessage,
  drawRect,
};
