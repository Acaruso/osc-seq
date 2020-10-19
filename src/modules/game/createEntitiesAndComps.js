import { createEcManager } from "../entityComponent";
import { createUserInput } from "../userInput";
import { createBallEntity } from "../ball";
import { createRectEntity } from "../rect";
import { createGridEntity } from '../grid';
import { createClockGridEntity } from "../clockGrid";

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
  game.state.ecManager.createComponentTable(
    "clock", 
    ["time"],
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
}

function createEntities(game) {
  createBallEntity(game.state.ecManager);

  createRectEntity(
    game.state.ecManager, 
    { x: 50, y: 50, w: 50, h: 50, color: "#1F5733", altColor: "#B2B2B2" }
  );

  createGridEntity(
    game.state.ecManager, 
    { numRows: 2, numCols: 4, cellWidth: 50, cellHeight: 50, x: 150, y: 150 }
  );

  createClockGridEntity(game.state.ecManager);
}

export { createEntitiesAndComps };