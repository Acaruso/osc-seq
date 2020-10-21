import { Client } from 'node-osc';
import { addKeyboardHandlers, addMouseHandlers } from "../entities/userInput";
import { MessageQueue } from "../messageQueue";
import { Logger } from "../logger";
import { createRootMessageTable } from "../message-handlers/rootMessageTable";
import { createEntitiesAndComps } from "./createEntitiesAndComps";

function createGame(options = {}) {
  let game = {};
  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};
  game.state = {};
  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");

  createEntitiesAndComps(game);

  game.inputQueue = new MessageQueue();
  game.queue = new MessageQueue();

  addKeyboardHandlers(game.inputQueue);
  addMouseHandlers(game.state, game.inputQueue);

  game.messageTable = createRootMessageTable(game.state);

  return game;
}

export { createGame };
