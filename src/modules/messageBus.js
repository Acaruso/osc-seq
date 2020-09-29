import { drawBall } from "./ball";
import { drawDebugDialog } from "./dialog";

class MessageBus {
  constructor(state, options = {}) {
    this.state = state;
    this.messages = [];

    this.logging = options.logging;
    this.logger = options.logger;

    this.messageTable = {
      "clear screen": (message) => {
        let ctx = this.state.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
      },
      "update ball": (message) => {
        this.state.ball = message.data.ball;
      },
      "update debug text": (message) => {
        this.state.debugText = message.data.newDebugText;
      },
      "draw ball": (message) => {
        drawBall(this.state.ball, this.state.canvas);
      },
      "draw debug dialog": (message) => {
        drawDebugDialog(this.state.debugText, this.state.canvas);
      },
      "osc trigger": (message) => {
        console.log('osc trigger');
        // this.state.oscClient.send('/oscAddress', 200);
        this.state.oscClient.send(
          '/oscAddress',
          JSON.stringify({ data: "my data" })
        );
        // this.state.oscClient.send('/oscAddress', "data" );
      },
      "ArrowRight:keydown": (message) => {
        this.state.keyboard.right = true;
      },
      "ArrowRight:keyup": (message) => {
        this.state.keyboard.right = false;
      },
      "ArrowLeft:keydown": (message) => {
        this.state.keyboard.left = true;
      },
      "ArrowLeft:keyup": (message) => {
        this.state.keyboard.left = false;
      },
      "ArrowUp:keydown": (message) => {
        this.state.keyboard.up = true;
      },
      "ArrowUp:keyup": (message) => {
        this.state.keyboard.up = false;
      },
      "ArrowDown:keydown": (message) => {
        this.state.keyboard.down = true;
      },
      "ArrowDown:keyup": (message) => {
        this.state.keyboard.down = false;
      },
      "Enter:keydown": (message) => {
        this.state.keyboard.enter = true;
        this.messages.push({ type: "osc trigger" });
      },
      "Enter:keyup": (message) => {
        this.state.keyboard.enter = false;
      },
      "end of draw loop": (message) => { },
    };
  }

  push(newMessage) {
    if (Array.isArray(newMessage)) {
      this.messages = this.messages.concat(newMessage.flat());
    } else {
      this.messages.push(newMessage);    
    }
  }

  handleMessages() {
    let message = null;
    while (message = this.messages.shift()) {
      if (this.messageTable[message.type]) {
        this.messageTable[message.type](message);
        if (this.logging) {
          this.logger.log(JSON.stringify(message));
        }
      }
    }
  }
}

export { MessageBus };
