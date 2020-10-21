import { createEcManager } from "../entityComponent";
import { createUserInput } from "../entities/userInput";
import { createBallEntity } from "../entities/ball";
import { createRectEntity } from "../entities/rect";
import { createGridEntity } from '../entities/grid';
import { createClockGridEntity } from "../entities/clockGrid";
import { createSeqGridEntity } from "../entities/seqGrid";
import { createTimeDivision } from "../entities/timeDivision";

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
  game.state.ecManager.createComponentTable("rectToGrid", ["gridId", "row", "col"]);
  game.state.ecManager.createComponentTable(
    "gridRowToChannel",
    ["gridId", "row", "channel"]
  );
  game.state.ecManager.createComponentTable(
    "clock", 
    ["time"],
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
  game.state.ecManager.addComponent(createUserInput(), "userInput");
  game.state.ecManager.addComponent({ time: 0 }, "clock");
  game.state.ecManager.addComponent(createTimeDivision(120), "timeDivision");
}

function createEntities(game) {
  createSeqGridEntity(
    game.state.ecManager, 
    {
      x: 100,
      y: 100,
      numRows: 2,
      numCols: 8,
      rowsToChannels: [
        { row: 0, channel: 0 },
        { row: 1, channel: 1 },
      ],
    }
  );

  createSeqGridEntity(
    game.state.ecManager, 
    {
      x: 300,
      y: 300,
      numRows: 1,
      numCols: 3,
      rowsToChannels: [
        { row: 0, channel: 2 },
      ],
    }
  );

  createBallEntity(game.state.ecManager);

  // createRectEntity(
  //   game.state.ecManager, 
  //   { x: 50, y: 50, w: 50, h: 50, color: "#1F5733", altColor: "#B2B2B2" }
  // );

  // createGridEntity(
  //   game.state.ecManager, 
  //   { 
  //     numRows: 2, 
  //     numCols: 4, 
  //     cellWidth: 50, 
  //     cellHeight: 50, 
  //     x: 150, 
  //     y: 150,
  //     clickable: true,
  //   }
  // );

  // createClockGridEntity(
  //   game.state.ecManager,
  //   {
  //     numCols: 4,
  //     x: 40,
  //     y: 40,
  //   }
  // );
}

export { createEntitiesAndComps };