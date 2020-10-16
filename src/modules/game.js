import { Client } from 'node-osc';
import { log } from "./util";
import { createBallEntity, createUpdateBallPositionMessage } from "./ball";
import {
  createUserInput,
  addKeyboardHandlers,
  addMouseHandler,
} from "./userInput";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";
import { getGrid } from './grid';
import { createRectEntity, createUpdateRectMessage } from "./rect";
import { getTimeDivisions } from './time';
import {
  createEcManager,
  createComponentTable,
  addComponent,
  getComponent,
  join,
} from "./entityComponent";
import { createUserInputMessageTable } from './message-handlers/userInputMessageTable';

function getGame(options = {}) {
  let game = {};

  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};

  game.state = {};

  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");
  game.state.clock = 0;

  game.state.ecManager = createEcManager();

  game.state.ecManager.createComponentTable("position", ["x", "y"]);
  game.state.ecManager.createComponentTable("ball", ["radius"]);
  game.state.ecManager.createComponentTable("rect", ["w", "h", "color"]);
  game.state.ecManager.createComponentTable("drawable", []);
  game.state.ecManager.createComponentTable("controllable", []);
  game.state.ecManager.createComponentTable("clickable", []);
  game.state.ecManager.createComponentTable(
    "userInput", 
    ["right", "left", "up", "down", "enter", "click", "cx", "cy"], 
    { isSingleton: true }
  );

  game.state.ecManager.addComponent(createUserInput(), "userInput");

  createBallEntity(game.state.ecManager);
  createRectEntity(game.state.ecManager, { x: 50, y: 50, w: 50, h: 50, color: "#000000" });
    
  game.inputQueue = new MessageQueue();
  game.queue = new MessageQueue();

  game.state.time = getTimeDivisions(120);

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
    drawSystem(game.state),
    { type: "update clock" },
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
    
  let drawableBalls = state.ecManager.join(["ball", "position", "drawable"]);
  
  for (const ball of drawableBalls) {
    out.push({ type: "draw ball", data: ball });
  }

  return out;
}

function drawRectsSystem(state) {
  let out = [];
  
  let drawableRects = state.ecManager.join(["rect", "position", "drawable"]);

  for (const rect of drawableRects) {
    out.push({ type: "draw rect", data: rect });
  }

  return out;
}

function controlSystem(state) {
  let out = [];

  let controllableBalls = state.ecManager.join(["ball", "position", "controllable"]);
  
  const userInput = state.ecManager.getComponent("userInput");

  for (const ball of controllableBalls) {
    const msg = createUpdateBallPositionMessage(ball, userInput);
    msg ? out.push(msg) : null;
  }

  let clickableRects = state.ecManager.join(["rect", "position", "clickable"]);

  for (const clickableRect of clickableRects) {
    const msg = createUpdateRectMessage(clickableRect, userInput, state.ecManager);
    msg ? out.push(msg) : null;
  }
  
  // unset userInput.click
  const newUserInput = { 
    ...userInput,
    click: false,
  };

  out.push({
    type: "update component",
    component: "userInput",
    data: newUserInput,
  })

  return out;
}

export { getGame, startGameLoop };
