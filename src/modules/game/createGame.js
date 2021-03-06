import { Client } from 'node-osc';
import { addKeyboardHandlers, addMouseHandlers } from "../entities/userInput";
import { MessageQueue } from "../messageQueue";
import { Logger } from "../logger";
import { createRootMessageTable } from "../message-handlers/rootMessageTable";
import { createEntitiesAndComps } from "./createEntitiesAndComps";
import { createImage } from "./../util";

function createGame(options = {}) {
  let { logging } = options;

  let game = {
    state: {
      oscClient: new Client('127.0.0.1', 3333),
      canvas: document.getElementById("myCanvas"),
      images: {
        upArrow: createImage("./../images/up-arrow-alpha.png"),
        downArrow: createImage("./../images/down-arrow-alpha.png"),
      },  
    },
    queue: new MessageQueue(),
    inputQueue: new MessageQueue(),
    logger: logging ? new Logger("log.txt") : {},
  };

  addKeyboardHandlers(game.inputQueue);
  addMouseHandlers(game.inputQueue, game.state.canvas);

  game.messageTable = createRootMessageTable(game.state);

  createEntitiesAndComps(game);

  return game;
}

export { createGame };
