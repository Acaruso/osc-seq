import { createUpdateBallPositionMessage } from "../entities/ball";
import { createUpdateRectMessage } from "../entities/rect";
import { isCoordInsideRect } from "../util";

function controlSystem(state) {
  let out = [];
  const ecm = state.ecManager;

  const userInput = ecm.getComponent("userInput");

  const ballRows = ecm.join2(["ball", "position", "controllable"]);

  for (const { position } of ballRows) {
    const msg = createUpdateBallPositionMessage(position, userInput);
    out.push(msg);
  }

  const rectRows = ecm.join2(["rect", "position", "clickable", "toggleable"]);

  for (const { rect, position, toggleable } of rectRows) {
    const msg = createUpdateRectMessage(rect, position, toggleable, userInput);
    out.push(msg);
  }

  const incRows = ecm.join2(["image", "position", "clickable", "incrementer"]);

  for (const { image, position, incrementer } of incRows) {
    const coord = { x: userInput.cx, y: userInput.cy };
    const rect = { w: image.w, h: image.h };

    if (userInput.click && isCoordInsideRect(coord, rect, position)) {
      const data = ecm.getComponent(incrementer.tableName);
      let newData = { ...data };
      newData[incrementer.colName] += 10;
      out.push({
        type: "update component",
        component: incrementer.tableName,
        data: newData,
      });
    }
  }

  const decRows = ecm.join2(["image", "position", "clickable", "decrementer"]);

  for (const { image, position, decrementer } of decRows) {
    const coord = { x: userInput.cx, y: userInput.cy };
    const rect = { w: image.w, h: image.h };

    if (userInput.click && isCoordInsideRect(coord, rect, position)) {
      const data = ecm.getComponent(decrementer.tableName);
      let newData = { ...data };
      newData[decrementer.colName] -= 10;
      out.push({
        type: "update component",
        component: decrementer.tableName,
        data: newData,
      });
    }
  }

  // unset userInput.click
  out.push({
    type: "update component",
    component: "userInput",
    data: { ...userInput, click: false },
  });

  return out;
}

export { controlSystem };
