import { Client } from 'node-osc';
import { getBall } from "./ball";
import { getKeyboard, addKeyboardHandlers, handleKeyboardEvents } from "./keyboard";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";

function getGame(options = {}) {
  let game = {};

  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};

  game.state = {};

  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");
  game.state.ball = getBall(game.state.canvas);
  game.state.keyboard = getKeyboard();
  game.state.status = "in progress";
  game.state.debugText = "";
  game.state.clock = 0;

  game.messageQueue = new MessageQueue();

  addKeyboardHandlers(game.messageQueue);

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
    // { type: "handle keyboard events" },
    handleKeyboardEvents(game.state),
    { type: "draw ball" },
    { type: "draw debug dialog" },
    { type: "update clock" },
    { type: "end of draw loop" },
  ];

  game.messageQueue.push(messages);

  handleMessages(
    game.messageQueue, 
    game.messageTable, 
    game.logger, 
    game.logging
  );
}

function handleMessages(messageQueue, messageTable, logger, logging) {
  let message = null;
  while (message = messageQueue.messages.shift()) {
    if (messageTable[message.type]) {
      messageTable[message.type](message);
      if (logging) {
        logger.log(JSON.stringify(message));
      }
    }
  }
}

export { getGame, startGameLoop };
