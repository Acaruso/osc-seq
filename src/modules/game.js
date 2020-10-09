import { Client } from 'node-osc';
import { getKeyboard, addKeyboardHandlers, addMouseHandler } from "./keyboard";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";
import { getTimeDivisions } from './time';
import { Table } from "./table";
import { createBall } from './ball';
import { createGrid } from "./grid";

function getGame(options = {}) {
  let game = {};

  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};

  game.state = {};

  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");
  game.state.keyboard = getKeyboard();
  game.state.clock = 0;

  game.state.objects = new Table("Tables");
  game.state.objects.push(new Table("Balls"));
  game.state.objects.push(new Table("Rects"));
  game.state.objects.push(new Table("Grids"));

  createObjects(game);
  console.log('objects ----------------------')
  console.log(game.state.objects);

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

  addKeyboardHandlers(game.queue);
  addMouseHandler(game.state, game.queue);

  game.messageTable = getRootMessageTable(game.state);

  return game;
}

function createObjects(game) {
  game.state.objects = new Table("Tables");
  game.state.objects.push(new Table("Balls"));
  game.state.objects.push(new Table("Rects"));
  game.state.objects.push(new Table("Grids"));

  createBall(game.state);
  createGrid(game.state);
}

function startGameLoop(game) {
  game.state.interval = setInterval(() => gameLoop(game), 10);
}

function gameLoop(game) {
  let messages = [
    { type: "clear screen" },
    { type: "osc trigger 1" },
    { type: "osc trigger 2" },
    getDrawMessages(game.state),
    getUpdateMessages(game.state),
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

function getDrawMessages(state) {
  let out = [];

  for (const tableId of state.objects.ids) {
    const table = state.objects.rows[tableId];
    for (const objectId of table.ids) {
      const obj = table.rows[objectId];
      if (obj.getDrawMessage) {
        out.push(obj.getDrawMessage([tableId, objectId], state));
      }
    }
  }

  return out;
}

function getUpdateMessages(state) {
  let out = [];

  for (const tableId of state.objects.ids) {
    const table = state.objects.rows[tableId];
    for (const objectId of table.ids) {
      const obj = table.rows[objectId];
      if (obj.getUpdateMessage) {
        out.push(obj.getUpdateMessage([tableId, objectId], state));
      }
    }
  }

  return out;
}

export { getGame, startGameLoop };
