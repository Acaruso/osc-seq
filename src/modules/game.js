import { Client } from 'node-osc';
import { createBallEntity, createUpdateBallPositionMessage } from "./ball";
import {
  createUserInput,
  addKeyboardHandlers,
  addMouseHandler,
} from "./userInput";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";
import { createGridEntity } from './grid';
import { createRectEntity, createUpdateRectMessage } from "./rect";
import { getTimeDivisions } from './time';
import { createEcManager } from "./entityComponent";
import { createUserInputMessageTable } from './message-handlers/userInputMessageTable';
import { createClockGrid } from "./clockGrid";

function getGame(options = {}) {
  let game = {};

  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};

  game.state = {};

  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");
  // game.state.clock = 0;

  game.state.ecManager = createEcManager();

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

  game.state.ecManager.addComponent(createUserInput(), "userInput");
  game.state.ecManager.addComponent({ time: 0 }, "clock");

  createBallEntity(game.state.ecManager);
  createRectEntity(
    game.state.ecManager, 
    { x: 50, y: 50, w: 50, h: 50, color: "#1F5733", altColor: "#b2b2b2" }
  );
  createGridEntity(
    game.state.ecManager, 
    { numRows: 2, numCols: 4, cellWidth: 50, cellHeight: 50, x: 150, y: 150 }
  );

  createClockGrid(game.state.ecManager);

  game.inputQueue = new MessageQueue();
  game.queue = new MessageQueue();

  game.state.timeDivisions = getTimeDivisions(120);

  addKeyboardHandlers(game.inputQueue);
  addMouseHandler(game.state, game.inputQueue);

  game.messageTable = getRootMessageTable(game.state);

  game.userInputMessageTable = createUserInputMessageTable(game.state);

  return game;
}

function startGameLoop(game) {
  game.state.interval = setInterval(() => gameLoop(game), 10);
}

function gameLoop(game) {
  // handle input messages  
  handleMessages(
    game.inputQueue,
    game.userInputMessageTable,
    game.logger,
    game.logging
  );
  
  game.queue.push([
    { type: "clear screen" },
    { type: "osc trigger 1" },
    { type: "osc trigger 2" },
    controlSystem(game.state),
    updateSystem(game.state),
    drawSystem(game.state),
    { type: "end of draw loop" },
  ]);

  handleMessages(
    game.queue, 
    game.messageTable, 
    game.logger, 
    game.logging
  );
}

function handleMessages(queue, messageTable, logger, logging) {
  let message = null;
  while (message = queue.messages.shift()) {
    if (messageTable[message.type]) {
      messageTable[message.type](message);
      if (logging) {
        logger.log(JSON.stringify(message));
      }
    }
  }
}

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

function drawSystem(state) {
  let out = [];

  let drawBallsMsgs = drawBallsSystem(state);
  out = out.concat(drawBallsMsgs);

  let drawRectsMsgs = drawRectsSystem(state);
  out = out.concat(drawRectsMsgs);

  return out;
}

function drawBallsSystem(state) {
  let out = [];
    
  let rows = state.ecManager.join2(["ball", "position", "drawable"]);
  
  for (const { ball, position } of rows) {
    out.push({ type: "draw ball", data: { ball, position } });
  }

  return out;
}

function drawRectsSystem(state) {
  let out = [];
  
  let rows = state.ecManager.join2(["rect", "position", "drawable", "toggleable"]);

  for (const { rect, position, toggleable } of rows) {
    rect.color = toggleable.isToggled ? rect.altColor : rect.color;
    out.push({ type: "draw rect", data: { rect, position } });
  }

  return out;
}

function controlSystem(state) {
  let out = [];

  const userInput = state.ecManager.getComponent("userInput");

  let ballRows = state.ecManager.join2(["ball", "position", "controllable"]);
  
  for (const { position } of ballRows) {
    const msg = createUpdateBallPositionMessage(position, userInput);
    msg ? out.push(msg) : null;
  }

  let rectRows = state.ecManager.join2(["rect", "position", "clickable", "toggleable"]);

  for (const { rect, position, toggleable } of rectRows) {
    const msg = createUpdateRectMessage(rect, position, toggleable, userInput);
    msg ? out.push(msg) : null;
  }
  
  // unset userInput.click
  out.push({
    type: "update component",
    component: "userInput",
    data: { ...userInput, click: false },
  });

  return out;
}

export { getGame, startGameLoop };
