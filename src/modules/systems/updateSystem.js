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

  const clockableGridRows = state.ecManager.join2(["grid", "clockable"]);

  for (const { grid } of clockableGridRows) {
    const rectRows = state.ecManager
      .join2(["rect", "drawable", "toggleable", "rectToGrid"])
      .filter(({ rectToGrid }) => rectToGrid.gridId === grid.entityId);

    const res = updateClockableGridRectsSystem(rectRows, clock);
    out.push(res);
  }

  return out;
}

function updateClockableGridRectsSystem(rows, clock) {
  let out = [];

  // unset toggleable for all 
  // for (const { toggleable } of rows) {
  //   let newToggleable = { ...toggleable };
  //   newToggleable.isToggled = false;

  //   out.push({
  //     type: "update component",
  //     component: "toggleable",
  //     data: newToggleable,
  //   });
  // }

  // set toggleable for one
  for (const { toggleable, rectToGrid } of rows) {
    const innerClock = (clock.time / 16) % 4;
    if (innerClock === rectToGrid.col) {
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
