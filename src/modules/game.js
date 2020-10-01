import { Client } from 'node-osc';
import { getBall } from "./ball";
import { getKeyboard, addKeyboardHandlers, handleKeyboardEvents } from "./keyboard";
import { MessageBus } from "./messageBus";
import { Logger } from "./logger";

class Game {
  constructor(options = {}) {
    let { logging } = options;

    this.logger = logging ? new Logger("log.txt") : {};

    this.state = {};

    this.state.oscClient = new Client('127.0.0.1', 3333);
    this.state.canvas = document.getElementById("myCanvas");
    this.state.ball = getBall(this.state.canvas);
    this.state.keyboard = getKeyboard();
    this.state.status = "in progress";
    this.state.debugText = "";
    this.state.clock = 0;

    this.messageBus = new MessageBus(this.state, {
      logging: logging,
      logger: this.logger,
    });

    addKeyboardHandlers(this.messageBus);
  }

  draw() {
    let messages = [
      { type: "clear screen" },
      { type: "osc trigger 1" },
      { type: "osc trigger 2" },
      // { type: "handle keyboard events" },
      handleKeyboardEvents(this.state),
      { type: "draw ball" },
      { type: "draw debug dialog" },
      { type: "update clock" },
      { type: "end of draw loop" },
    ];

    this.messageBus.push(messages);
    this.messageBus.handleMessages();
  }

  startGameLoop() {
    this.state.interval = setInterval(() => this.draw(), 10);
  }
}

export { Game };
