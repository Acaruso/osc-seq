function updateSystem(state) {
  let out = [];
  const clock = state.ecManager.getComponent("clock");

  let newClock = { ...clock };
  newClock.time = (newClock.time + 1) % 4096;

  out.push({
    type: "update component",
    component: "clock",
    data: newClock,
  });

  return out;
}

export { updateSystem };
