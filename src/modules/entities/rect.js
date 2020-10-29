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

export { createUpdateRectMessage };
