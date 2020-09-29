import { getBall } from "./ball";
import { getKeyboard, addKeyboardHandlers, handleKeyboardEvents } from "./keyboard";
import { MessageBus } from "./messageBus";
import { Logger } from "./logger";

class Game {
  constructor(options = {}) {
    let { logging } = options;

    this.logger = logging ? new Logger("log.txt") : {};

    this.state = {};
    this.state.canvas = document.getElementById("myCanvas");
    this.state.ball = getBall(this.state.canvas);
    this.state.keyboard = getKeyboard();
    this.state.status = "in progress";
    this.state.debugText = "";

    this.messageBus = new MessageBus(this.state, {
      logging: logging,
      logger: this.logger,
    });

    addKeyboardHandlers(this.messageBus);

    this.state.interval = setInterval(() => this.draw(), 10);
  }

  draw() {
    let messages = [
      { type: "clear screen" },
      handleKeyboardEvents(this.state),
      { type: "draw ball" },
      { type: "draw debug dialog" },
      { type: "end of draw loop" },
    ];

    this.messageBus.push(messages);
    this.messageBus.handleMessages();
  }
}

export { Game };
