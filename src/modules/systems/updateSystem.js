function updateSystem(state) {
  let out = [];
  const clock = state.ecManager.getComponent("clock");
  const timeDivision = state.ecManager.getComponent("timeDivision");

  let newClock = { ...clock };
  newClock.time = (newClock.time + 1) % 4096;

  out.push({
    type: "update component",
    component: "clock",
    data: newClock,
  });

  const seqLength = 4;
  const n4Clock = Math.floor(clock.time / timeDivision.n4) % seqLength;
  const prevN4Clock = Math.floor((clock.time - 1) / timeDivision.n4) % seqLength;
  
  if (n4Clock !== prevN4Clock) {
    const clockableGridRows = state.ecManager.join2(["grid", "clockable"]);

    for (const { grid } of clockableGridRows) {
      const rectRows = state.ecManager
        .join2(["rect", "drawable", "toggleable", "rectToGrid"])
        .filter(({ rectToGrid }) => rectToGrid.gridId === grid.entityId);

      const res = updateClockableGridRectsSystem(rectRows, n4Clock);
      out.push(res);
    }
  }

  return out;
}

function updateClockableGridRectsSystem(rows, clock) {
  let out = [];

  // unset toggleable for all
  for (const { toggleable } of rows) {
    let newToggleable = { ...toggleable };
    newToggleable.isToggled = false;

    out.push({
      type: "update component",
      component: "toggleable",
      data: newToggleable,
    });
  }

  // set toggleable for one
  for (const { toggleable, rectToGrid } of rows) {
    if (clock === rectToGrid.col) {
      let newToggleable = { ...toggleable };
      newToggleable.isToggled = true;

      out.push({
        type: "update component",
        component: "toggleable",
        data: newToggleable,
      });
    }
  }

  return out;
}

export { updateSystem };
