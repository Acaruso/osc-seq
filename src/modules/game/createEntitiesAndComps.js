import { createEcManager } from "../entityComponent";
import { createUserInput } from "../entities/userInput";
import { createSeqGridEntity } from "../entities/seqGrid";
import { createTimeDivision } from "../entities/timeDivision";
import { createBpmDisplay } from "../entities/bpmDisplay";
import { createClock } from "../entities/clock";

function createEntitiesAndComps(game) {
  game.state.ecManager = createEcManager();

  createComponentTables(game);
  createSingletonComponents(game);
  createEntities(game);
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
  game.state.ecManager.createComponentTable("image", ["name"]);
  game.state.ecManager.createComponentTable("text", ["name"]);

  game.state.ecManager.createComponentTable("clock", 
    ["time", "bpm"],
    { isSingleton: true }
  );
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
  const defaultBpm = 120;

  game.state.ecManager.addComponent(createUserInput(), "userInput");
  // game.state.ecManager.addComponent(createClock(120), "clock");
  game.state.ecManager.addComponent({ time: 0, bpm: defaultBpm }, "clock");
  game.state.ecManager.addComponent(createTimeDivision(defaultBpm), "timeDivision");
}

function createEntities(game) {
  createBpmDisplay(game.state.ecManager);
  
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
}

export { createEntitiesAndComps };
