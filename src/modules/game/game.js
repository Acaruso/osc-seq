import { Client } from 'node-osc';
import { addKeyboardHandlers, addMouseHandler } from "../entities/userInput";
import { MessageQueue } from "../messageQueue";
import { Logger } from "../logger";
import { createRootMessageTable } from "../message-handlers/rootMessageTable";
import { createUserInputMessageTable } from '../message-handlers/userInputMessageTable';
import { createTimeDivisions } from '../time';
import { createEntitiesAndComps } from "./createEntitiesAndComps";
import { updateSystem } from "./../systems/updateSystem";
import { drawSystem } from "./../systems/drawSystem";
import { controlSystem } from "./../systems/controlSystem";

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

  game.state.timeDivisions = createTimeDivisions(120);

  addKeyboardHandlers(game.inputQueue);
  addMouseHandler(game.state, game.inputQueue);

  game.messageTable = createRootMessageTable(game.state);

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

export { createGame, startGameLoop };
