import { isCoordInsideRect } from "../util";

function imGuiSystem(state) {
  let out = [];

  const imGuiMsgs = drawImGuiSystem(state);
  out.push(imGuiMsgs);

  return out;
}

function drawImGuiSystem(state) {
  const userInput = state.ecManager.getComponent("userInput");
  const bpm = state.ecManager.getComponent("bpm");
  let out = [];

  doBpmDisplay({ x: 0, y: 0 }, bpm, userInput, out);

  return out;
}

function doBpmDisplay(position, bpm, userInput, out) {
  if (doImageButton(
    { x: position.x, y: position.y },
    { name: "upArrow", w: 25, h: 13 },
    userInput,
    out
  )) {
    let newBpm = { ...bpm };
    newBpm.value += 1;
    out.push({
      type: "update component",
      component: "bpm",
      data: newBpm,
    });
  }

  if (doImageButton(
    { x: position.x, y: position.y + 20 },
    { name: "downArrow", w: 25, h: 13 },
    userInput,
    out
  )) {
    let newBpm = { ...bpm };
    newBpm.value -= 1;
    out.push({
      type: "update component",
      component: "bpm",
      data: newBpm,
    });
  }

  doText(
    { x: position.x + 30, y: position.y + 10 },
    { value: bpm.value, font: "20px \"Lucida Console\", Monaco, monospace" },
    out
  );

  // doesn't work because toggle gets set to true each time
  // need to put toggle state outside of loop
  let toggle = true;
  if(doRectButton(
    { x: 300, y: 300 },
    {
      w: 20,
      h: 20,
      color: toggle ? "#66ffcc" : "#9999ff",
      altColor: "#9999ff",
      gridRect: false
    },
    userInput,
    out
  )) {
    toggle = !toggle;
    console.log(toggle)
  };
}

function doImageButton(position, image, userInput, out) {
  out.push({
    type: "draw image",
    data: {
      image,
      position,
    }
  });

  const coord = { x: userInput.cx, y: userInput.cy };

  if (userInput.click && isCoordInsideRect(coord, image, position)) {
    return true;
  } else {
    return false;
  }
}

function doRectButton(position, rect, userInput, out) {
  out.push({ type: "draw rect", data: { rect, position } });

  const coord = { x: userInput.cx, y: userInput.cy };

  if (userInput.click && isCoordInsideRect(coord, rect, position)) {
    return true;
  } else {
    return false;
  }
}

function doText(position, text, out) {
  out.push({
    type: "draw text",
    data: {
      text,
      position,
    }
  });
}

export { imGuiSystem };
