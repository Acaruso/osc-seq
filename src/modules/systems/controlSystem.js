import { createUpdateBallPositionMessage } from "../entities/ball";
import { createUpdateRectMessage } from "../entities/rect";

function controlSystem(state) {
  let out = [];

  const userInput = state.ecManager.getComponent("userInput");

  let ballRows = state.ecManager.join2(["ball", "position", "controllable"]);
  
  for (const { position } of ballRows) {
    const msg = createUpdateBallPositionMessage(position, userInput);
    out.push(msg);
  }

  let rectRows = state.ecManager.join2(["rect", "position", "clickable", "toggleable"]);

  for (const { rect, position, toggleable } of rectRows) {
    const msg = createUpdateRectMessage(rect, position, toggleable, userInput);
    out.push(msg);
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
