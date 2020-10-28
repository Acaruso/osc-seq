import { createTimeDivision } from "../entities/timeDivision";

function updateSystem(state) {
  let out = [];
  const clock = state.ecManager.getComponent("clock");
  const timeDivision = state.ecManager.getComponent("timeDivision");

  const stepLen = timeDivision.n4;  // quarter notes
  const maxSeqLen = stepLen * 8;    // max seq len is 8 quarter notes

  let newClock = { ...clock };
  newClock.time = (newClock.time + 1) % maxSeqLen;

  out.push({
    type: "update component",
    component: "clock",
    data: newClock,
  });

  const cgRows = state.ecManager.join4(
    "rect",
    [
      ["rect", "drawable"],
      ["rect", "toggleable"],
      ["rect", "rectToGrid"],
      ["rectToGrid", "gridId", "grid", "entityId"],
      ["grid", "clockable"]
    ]
  );
  const cgMsgs = clockableGridsSystem(cgRows, clock, stepLen);
  out.push(cgMsgs);

  const oscRows = state.ecManager.join4(
    "rect",
    [
      ["rect", "triggerable"],
      ["rect", "toggleable"],
      ["rect", "rectToGrid"],
      ["rectToGrid", "gridId", "grid", "entityId"],
    ]
  );
  const oscMsgs = sendOscSystem(oscRows, clock, stepLen);
  out.push(oscMsgs);

  // const bpm = state.ecManager.getComponent("bpm");
  // const newTimeDivision = createTimeDivision(bpm.value);

  // out.push({
  //   type: "update component",
  //   component: "timeDivision",
  //   data: newTimeDivision,
  // });

  return out;
}

function clockableGridsSystem(rows, clock, stepLen) {
  let out = [];

  for (const { grid, toggleable, rectToGrid } of rows) {
    const [tick, prevTick] = getTicks(clock.time, stepLen, grid.numCols);
    if (tick !== prevTick) {
      if (tick === rectToGrid.col) {
        let newToggleable = { ...toggleable };
        newToggleable.isToggled = true;

        out.push({
          type: "update component",
          component: "toggleable",
          data: newToggleable,
        });
      } else {
        let newToggleable = { ...toggleable };
        newToggleable.isToggled = false;

        out.push({
          type: "update component",
          component: "toggleable",
          data: newToggleable,
        });
      }
    }
  }

  return out;
}

function sendOscSystem(rows, clock, stepLen) {
  let out = [];

  for (const { grid, rectToGrid, triggerable, toggleable } of rows) {
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

  return out;
}

function getTicks(time, timeDivision, seqLength) {
  const tick = Math.floor(time / timeDivision) % seqLength;
  const prevTick = Math.floor((time - 1) / timeDivision) % seqLength;
  return [tick, prevTick];
}

export { updateSystem };
