import { createEcManager } from "../entityComponent";
import { createUserInput } from "../entities/userInput";
import { createSeqGridEntity } from "../entities/seqGrid";
import { createTimeDivision } from "../entities/timeDivision";

function createEntitiesAndComps(game) {
  game.state.ecManager = createEcManager();

  createComponentTables(game);
  createSingletonComponents(game);
  createEntities(game);

  // const res = game.state.ecManager.join3(
  //   "rect",
  //   [
  //     { table1: "rect", table2: "rectToGrid", col1: "entityId", col2: "entityId" },
  //     { table1: "rectToGrid", table2: "grid", col1: "gridId", col2: "entityId" },
  //   ]
  // );

  // console.log(res);

  // const res = game.state.ecManager.join4(
  //   "rect",
  //   [
  //     ["rect", "entityId", "rectToGrid", "entityId"],
  //     ["rectToGrid", "gridId", "grid", "entityId"],
  //   ]
  // );

  const res = game.state.ecManager.join4(
    "grid",
    [
      ["grid", "entityId", "rectToGrid", "gridId"],
      ["rectToGrid", "entityId", "rect", "entityId"],
    ]
  );

  console.log(res);
}

function createComponentTables(game) {
  game.state.ecManager.createComponentTable("position", ["x", "y"]);
  game.state.ecManager.createComponentTable("ball", ["radius"]);
  game.state.ecManager.createComponentTable(
    "rect",
    ["w", "h", "color", "altColor", "gridRect"]
  );
  game.state.ecManager.createComponentTable("grid", ["numRows", "numCols"]);
  game.state.ecManager.createComponentTable("drawable", []);
  game.state.ecManager.createComponentTable("controllable", []);
  game.state.ecManager.createComponentTable("clickable", []);
  game.state.ecManager.createComponentTable("toggleable", ["isToggled"]);
  game.state.ecManager.createComponentTable("clockable", []);
  game.state.ecManager.createComponentTable(
    "rectToGrid",
    ["gridId", "row", "col"],
    { colsToIndex: ["gridId"] },
  );
  game.state.ecManager.createComponentTable("triggerable", ["channel"]);
  game.state.ecManager.createComponentTable("clock", ["time"], {
    isSingleton: true,
  });
  game.state.ecManager.createComponentTable(
    "timeDivision",
    ["n1", "n2", "n4", "n8", "n16"],
    { isSingleton: true }
  );
  game.state.ecManager.createComponentTable(
    "userInput",
    ["right", "left", "up", "down", "enter", "click", "cx", "cy"],
    { isSingleton: true }
  );
}

function createSingletonComponents(game) {
  game.state.ecManager.addComponent(createUserInput(), "userInput");
  game.state.ecManager.addComponent({ time: 0 }, "clock");
  game.state.ecManager.addComponent(createTimeDivision(120), "timeDivision");
}

function createEntities(game) {
  game.state.ecManager.createEC({
    ball: { radius: 10 },
    position: { x: 0, y: 0 },
    drawable: {},
    controllable: {},
  });

  createSeqGridEntity(
    game.state.ecManager,
    {
      position: { x: 50, y: 50 },
      grid: { numRows: 2, numCols: 4 },
      rowToChannel: { "0": 0, "1": 1},
    }
  );

  game.state.ecManager.createEC({
    rect: { w: 50, h: 50, color: "#FF5733", altColor: "#B2B2B2", gridRect: true} ,
    position: { x: 200, y: 200 },
    drawable: {},
    clickable: {},
    toggleable: { isToggled: false },
  });


  // eid 2 currently mapped to gridId 1
  // want to also map to gid 6

  // game.state.ecManager.addComponent(
  //   { gridId: 6, row: 1, col: 1 },
  //   "rectToGrid",
  //   2
  // );
}

export { createEntitiesAndComps };
