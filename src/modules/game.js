import { Client } from 'node-osc';
import { getBall, createBallEntity, createUpdateBallPositionMessage } from "./ball";
import {
  getKeyboard,
  addKeyboardHandlers,
  addMouseHandler,
} from "./keyboard";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";
import { getGrid } from './grid';
import { getRect, createRectEntity, createUpdateRectMessage } from "./rect";
import { getTimeDivisions } from './time';
import { addEntity } from "./entity";
import { addComponent, join } from "./component";
import { createInputMessageTable } from './message-handlers/inputMessageTable';

function getGame(options = {}) {
  let game = {};

  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};

  game.state = {};

  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");
  game.state.keyboard = getKeyboard();
  game.state.clock = 0;

  game.maxEntities = 1024;

  game.state.entities = [];
  game.state.components = {
    position: new Array(game.maxEntities).fill(null),
    controllable: new Array(game.maxEntities).fill(null),
    ball: new Array(game.maxEntities).fill(null),
    rect: new Array(game.maxEntities).fill(null),
    drawable: new Array(game.maxEntities).fill(null),
    clickable: new Array(game.maxEntities).fill(null),
    userInput: getKeyboard(),
  };

  createBallEntity(game.state);
  createRectEntity(
    game.state,
    { x: 50, y: 50, w: 50, h: 50, color: "#000000" },
  );

  game.inputQueue = new MessageQueue();

  // game.state.objects = [
  //   getBall(game.state.canvas),
  //   getGrid({ numRows: 2, numCols: 4, x: 5, y: 5 }),
  //   getRect({
  //     x: 110,
  //     y: 110,
  //     width: 30,
  //     height: 30,
  //     color: "#FF5733",
  //   }),
  //   getGrid({
  //     numRows: 2,
  //     numCols: 4,
  //     cellWidth: 30,
  //     cellHeight: 20,
  //     x: 200,
  //     y: 200,
  //   }),
  // ];

  game.state.time = getTimeDivisions(120);

  game.queue = new MessageQueue();

  addKeyboardHandlers(game.inputQueue);
  addMouseHandler(game.state, game.inputQueue);

  game.messageTable = getRootMessageTable(game.state);

  game.inputMessageTable = createInputMessageTable(game.state);

  return game;
}

function startGameLoop(game) {
  game.state.interval = setInterval(() => gameLoop(game), 10);
}

function gameLoop(game) {
  // DOM event handlers (on click, on keydown/up) push events to input message queue
  // at beginning of every game loop, convert these into state update messages to update userInput component
  // then handle those messages to update userInput component
  // then use "systems" to get other state update messages, draw messages, etc
  // then handle those messages to do that stuff
  // is this over complicated?
  // probably yeah, probably want to rewrite input stuff to just update
  // userInput component directly
  // but what about mouse events?

  let resultsOfInputMessages = handleInputMessages(
    game.inputQueue,
    game.inputMessageTable,
    game.logger,
    game.logging
  );

  game.queue.push(resultsOfInputMessages);

  handleMessages(
    game.queue, 
    game.messageTable, 
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

function handleInputMessages(queue, messageTable, logger, logging) {
  let out = [];
  let message = null;
  while (message = queue.messages.shift()) {
    if (messageTable[message.type]) {
      let res = messageTable[message.type](message);
      out.push(res);
      if (logging) {
        logger.log(JSON.stringify(message));
      }
    }
  }
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
  
  let drawableBalls = join(
    ["position", "ball", "drawable", "controllable", "userInput"], 
    state.entities, 
    state.components
  );

  for (const ball of drawableBalls) {
    out.push({ type: "draw ball", data: ball });
  }

  return out;
}

function drawRectsSystem(state) {
  let out = [];
  
  let drawableRects = join(
    ["position", "rect", "drawable"], 
    state.entities, 
    state.components
  );

  for (const rect of drawableRects) {
    out.push({ type: "draw rect", data: rect });
  }

  return out;
}

function controlSystem(state) {
  let out = [];

  let controllableBalls = join(
    ["position", "ball", "controllable", "userInput"], 
    state.entities, 
    state.components
  );

  for (const ball of controllableBalls) {
    const msg = createUpdateBallPositionMessage(ball);
    msg ? out.push(msg) : null;
  }

  let clickableRects = join(
    ["position", "rect", "clickable"], 
    state.entities, 
    state.components
  );

  for (const rect of clickableRects) {
    const msg = createUpdateRectMessage(rect, state.components.userInput);
    msg ? out.push(msg) : null;
  }
  
  // unset userInput.click
  out.push({
    type: "update component",
    component: "userInput",
    entityId: -1,
    data: { ...state.components.userInput, click: false },
  })

  return out;
}

export { getGame, startGameLoop };
