import { isCoordInsideRect } from "./util";
import { addEntity, addComponent } from "./entityComponent";

function createRectEntity(state, options = {}) {
  const { x, y, w, h, color } = options;

  const newEntityId = addEntity(state.entities);

  addComponent(
    { x, y }, 
    state.components.position,
    newEntityId,
  );
  addComponent(
    { w, h, color }, 
    state.components.rect,
    newEntityId,
  );
  addComponent(
    { }, 
    state.components.drawable,
    newEntityId,
  );
  addComponent(
    { }, 
    state.components.clickable,
    newEntityId,
  );

  return newEntityId;
}

function createUpdateRectMessage(rect, userInput) {
  if (userInput.click && isCoordInsideRect(userInput.clickCoord, rect)) {
    let newRect = { ...rect };

    if (rect.color === "#FF5733") {
      newRect.color = "#000000";
    } else {
      newRect.color = "#FF5733";
    }

    return { 
      type: "update component", 
      component: "rect", 
      entityId: newRect.entityId,
      data: { w: newRect.w, h: newRect.h, color: newRect.color },
    };
  }
}

export { createRectEntity, createUpdateRectMessage };
