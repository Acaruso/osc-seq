import { isCoordInsideRect } from "./util";
import { addEntity, addComponent } from "./entityComponent";

function createRectEntity(ecManager, options = {}) {
  const { x, y, w, h, color } = options;

  const newEntityId = ecManager.addEntity();

  ecManager.addComponent({ x, y }, "position", newEntityId);
  ecManager.addComponent({ w, h, color }, "rect", newEntityId);
  ecManager.addComponent({ }, "drawable", newEntityId);
  ecManager.addComponent({ }, "clickable", newEntityId);

  return newEntityId;
}

function createUpdateRectMessage(clickableRect, userInput, ecManager) {
  const coord = { x: userInput.cx, y: userInput.cy };
  if (userInput.click && isCoordInsideRect(coord, clickableRect)) {
    let newRect = ecManager.project(clickableRect, "rect");

    if (newRect.color === "#FF5733") {
      newRect.color = "#000000";
    } else {
      newRect.color = "#FF5733";
    }

    let res = { 
      type: "update component", 
      component: "rect", 
      entityId: newRect.entityId,
      data: newRect,
    };

    return res;
  }
}

export { createRectEntity, createUpdateRectMessage };
