import { Client } from 'node-osc';
import { getBall, createBallEntity } from "./ball";
import {
  getKeyboard,
  addKeyboardHandlers,
  addMouseHandler,
} from "./keyboard";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";
import { getGrid } from './grid';
import { getRect } from "./rect";
import { getTimeDivisions } from './time';
import { addEntity } from "./entity";
import { addComponent, join } from "./component";

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
    drawable: new Array(game.maxEntities).fill(null),
    userInput: new Array(game.maxEntities).fill(null),
  };

  createBallEntity(game.state);

  // addEntity({ name: "ball" }, game.state.entities);
  // addComponent(
  //   { x: 0, y: 0 }, 
  //   game.state.components.position,
  //   "ball",
  //   game.state.entities, 
  // );
  // addComponent(
  //   { radius: 10 }, 
  //   game.state.components.ball,
  //   "ball",
  //   game.state.entities, 
  // );
  // addComponent(
  //   { }, 
  //   game.state.components.controllable,
  //   "ball",
  //   game.state.entities, 
  // );
  // addComponent(
  //   { }, 
  //   game.state.components.drawable,
  //   "ball",
  //   game.state.entities, 
  // );

  game.state.objects = [
    getBall(game.state.canvas),
    getGrid({ numRows: 2, numCols: 4, x: 5, y: 5 }),
    getRect({
      x: 110,
      y: 110,
      width: 30,
      height: 30,
      color: "#FF5733",
    }),
    getGrid({
      numRows: 2,
      numCols: 4,
      cellWidth: 30,
      cellHeight: 20,
      x: 200,
      y: 200,
    }),
  ];

  game.state.time = getTimeDivisions(120);

  game.queue = new MessageQueue();

  addKeyboardHandlers(game.queue);
  addMouseHandler(game.state, game.queue);

  game.messageTable = getRootMessageTable(game.state);

  return game;
}

function startGameLoop(game) {
  game.state.interval = setInterval(() => gameLoop(game), 10);
}

function gameLoop(game) {
  let messages = [
    { type: "clear screen" },
    { type: "osc trigger 1" },
    { type: "osc trigger 2" },
    drawSystem(game.state),
    // getDrawMessages(game.state),
    // getUpdateMessages(game.state),
    { type: "update clock" },
    { type: "end of draw loop" },
  ];

  game.queue.push(messages);

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
  
  let drawableBalls = join(
    state.entities, 
    ["position", "ball", "drawable"], 
    state.components
  );

  for (const ball of drawableBalls) {
    out.push({ type: "draw ball", data: ball });
  }

  return out;
}

function getDrawMessages(state) {
  let out = [];

  for (let i = 0; i < state.objects.length; i++) {
    const object = state.objects[i];
    if (object.getDrawMessage) {
      out.push(object.getDrawMessage(i, state));
    }
  }

  return out;
}

function getUpdateMessages(state) {
  let out = [];

  for (let i = 0; i < state.objects.length; i++) {
    const object = state.objects[i];
    if (object.getUpdateMessage) {
      out.push(object.getUpdateMessage(i, state));
    }
  }

  return out;
}

export { getGame, startGameLoop };
