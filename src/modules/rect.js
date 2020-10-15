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
  const coord = { x: userInput.cx, y: userInput.cy };
  if (userInput.click && isCoordInsideRect(coord, rect)) {
    let newRect = { ...rect };

    if (rect.color === "#FF5733") {
      newRect.color = "#000000";
    } else {
      newRect.color = "#FF5733";
    }

    let res = { 
      type: "update component", 
      component: "rect", 
      entityId: newRect.entityId,
      data: { w: newRect.w, h: newRect.h, color: newRect.color, entityId: newRect.entityId },
    };

    return res;
  }
}

export { createRectEntity, createUpdateRectMessage };
