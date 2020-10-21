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

  const clockableGridsMsgs = updateClockableGridsSystem(
    state.ecManager, 
    clock, 
    timeDivision
  );

  out.push(clockableGridsMsgs);
  
  return out;
}

function updateClockableGridsSystem(ecManager, clock, timeDivision) {
  // for each clockable grid, get cur and prev tick and compare
  // if different: get rects for grid, use these + current tick to update rects
  
  let out = [];

  const clockableGridRows = ecManager.join2(["grid", "clockable"]);

  for (const { grid } of clockableGridRows) {
    const [tick, prevTick] = getTicks(clock.time, timeDivision.n4, grid.numCols);
    if (tick !== prevTick) {
      const rectRows = getRectsForGrid(grid.entityId, ecManager);
      const rectsMsgs = updateClockableGridRectsSystem(rectRows, tick);
      out.push(rectsMsgs);
    }
  }
  
  return out;
}

function updateClockableGridRectsSystem(rows, tick) {
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
    if (tick === rectToGrid.col) {
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

function getTicks(time, timeDivision, seqLength) {
  const tick = Math.floor(time / timeDivision) % seqLength;
  const prevTick = Math.floor((time - 1) / timeDivision) % seqLength;
  return [tick, prevTick];
}

function getRectsForGrid(gridId, ecManager) {
  return ecManager
    .join2(["rect", "drawable", "toggleable", "rectToGrid"])
    .filter(({ rectToGrid }) => rectToGrid.gridId === gridId);
}

export { updateSystem };
