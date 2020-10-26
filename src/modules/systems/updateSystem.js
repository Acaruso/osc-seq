function updateSystem(state) {
  let out = [];
  const clock = state.ecManager.getComponent("clock");
  const timeDivision = state.ecManager.getComponent("timeDivision");

  const stepLen = timeDivision.n4;
  const maxSeqLen = stepLen * 8; // max seq len is 8 quarter notes

  let newClock = { ...clock };
  newClock.time = (newClock.time + 1) % maxSeqLen;

  out.push({
    type: "update component",
    component: "clock",
    data: newClock,
  });

  // update clock grids
  const clockableGridsMsgs = updateClockableGridsSystem(
    state.ecManager,
    clock,
    stepLen,
  );
  out.push(clockableGridsMsgs);


  // send osc messages

  const rectRows = state.ecManager.join4(
    "rect",
    [
      ["rect", "entityId", "triggerable", "entityId"],
      ["rect", "entityId", "toggleable", "entityId"],
      ["rect", "entityId", "rectToGrid", "entityId"],
      ["rectToGrid", "gridId", "grid", "entityId"],
    ]
  );

  for (const { grid, rectToGrid, triggerable, toggleable } of rectRows) {
    const [tick, prevTick] = getTicks(clock.time, stepLen, grid.numCols);
    if (tick !== prevTick) {
      if (tick === rectToGrid.col && toggleable.isToggled) {
        out.push({
          type: "send osc",
          data: { channel: triggerable.channel }
        });
      }
    }
  }

  // const grids = state.ecManager.join2(["grid"]);
  // for (const { grid } of grids) {
  //   const [tick, prevTick] = getTicks(clock.time, stepLen, grid.numCols);
  //   if (tick !== prevTick) {
  //     const trigRects = state.ecManager
  //       .join2(["rectToGrid", "triggerable", "toggleable"])
  //       .filter(({ rectToGrid }) => rectToGrid.gridId === grid.entityId);

  //     for (const { rectToGrid, triggerable, toggleable } of trigRects) {
  //       const col = rectToGrid.col;
  //       if (tick === col && toggleable.isToggled) {
  //         const channel = triggerable.channel;
  //         out.push({
  //           type: "send osc",
  //           data: { channel }
  //         });
  //       }
  //     }
  //   }
  // }

  return out;
}

function updateClockableGridsSystem(ecManager, clock, stepLen) {
  // for each clockable grid, get cur and prev tick and compare
  // if different: get rects for grid,
  // use these + current tick to update toggleable for rects

  let out = [];

  // new stuff:
  const res = ecManager.join4(
    "rect",
    [
      ["rect", "entityId", "drawable", "entityId"],
      ["rect", "entityId", "toggleable", "entityId"],
      ["rect", "entityId", "rectToGrid", "entityId"],
      ["rectToGrid", "gridId", "grid", "entityId"],
      ["grid", "entityId", "clockable", "entityId"]
    ]
  );

  // old stuff:
  const clockableGridRows = ecManager.join2(["grid", "clockable"]);

  for (const { grid } of clockableGridRows) {
    const [tick, prevTick] = getTicks(clock.time, stepLen, grid.numCols);

    if (tick !== prevTick) {
      // ecManager
      // .join2(["rect", "drawable", "toggleable", "rectToGrid"])
      // .filter(({ rectToGrid }) => rectToGrid.gridId === gridId);
      const rectRows = getRectsForGrid(grid.entityId, ecManager);
      const rectsMsgs = updateClockableGridRectsSystem(rectRows, tick);
      out.push(rectsMsgs);
    }
  }

  return out;
}

// function updateClockableGridsSystem(ecManager, clock, stepLen) {
//   // for each clockable grid, get cur and prev tick and compare
//   // if different: get rects for grid,
//   // use these + current tick to update toggleable for rects

//   let out = [];

//   const clockableGridRows = ecManager.join2(["grid", "clockable"]);

//   for (const { grid } of clockableGridRows) {
//     const [tick, prevTick] = getTicks(clock.time, stepLen, grid.numCols);

//     if (tick !== prevTick) {
//       const rectRows = getRectsForGrid(grid.entityId, ecManager);
//       const rectsMsgs = updateClockableGridRectsSystem(rectRows, tick);
//       out.push(rectsMsgs);
//     }
//   }

//   return out;
// }

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
