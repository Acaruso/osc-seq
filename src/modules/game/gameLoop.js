import { updateSystem } from "./../systems/updateSystem";
import { drawSystem } from "./../systems/drawSystem";
import { controlSystem } from "./../systems/controlSystem";
import { imGuiSystem } from "./../systems/imGuiSystem";

function startGameLoop(game) {
  game.state.interval = setInterval(() => gameLoop(game), 10);
}

function gameLoop(game) {
  // handle input messages
  handleMessages(
    game.inputQueue,
    game.messageTable,
    game.logger,
    game.logging
  );

  game.queue.push([
    { type: "clear screen" },
    controlSystem(game.state),
    updateSystem(game.state),
    drawSystem(game.state),
    imGuiSystem(game.state),
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

export { startGameLoop };
