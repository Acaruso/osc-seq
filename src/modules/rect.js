import { isCoordInsideRect } from "./util";

const defaultOptions = {
  drawable: true, 
  clickable: true, 
  toggleable: true,
  gridRect: false,
};

function createRectEntity(ecManager, options = {}) {
  options = { ...defaultOptions, ...options };
  const { 
    x, y, w, h, color, altColor, drawable, 
    clickable, toggleable, gridRect 
  } = options;

  const newEntityId = ecManager.addEntity();

  ecManager.addComponent({ x, y }, "position", newEntityId);
  ecManager.addComponent({ w, h, color, altColor, gridRect }, "rect", newEntityId);

  if (drawable) {
    ecManager.addComponent({}, "drawable", newEntityId);
  }
  if (clickable) {
    ecManager.addComponent({}, "clickable", newEntityId);
  }
  if (toggleable) {
    ecManager.addComponent({ isToggled: false }, "toggleable", newEntityId);
  }

  return newEntityId;
}

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
  }
}

export { createRectEntity, createUpdateRectMessage };
