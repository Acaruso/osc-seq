import { createUpdateBallPositionMessage } from "../ball";
import { createUpdateRectMessage } from "../rect";

function controlSystem(state) {
  let out = [];

  const userInput = state.ecManager.getComponent("userInput");

  let ballRows = state.ecManager.join2(["ball", "position", "controllable"]);
  
  for (const { position } of ballRows) {
    const msg = createUpdateBallPositionMessage(position, userInput);
    msg ? out.push(msg) : null;
  }

  let rectRows = state.ecManager.join2(["rect", "position", "clickable", "toggleable"]);

  for (const { rect, position, toggleable } of rectRows) {
    const msg = createUpdateRectMessage(rect, position, toggleable, userInput);
    msg ? out.push(msg) : null;
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
