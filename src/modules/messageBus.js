import { getRootMessageTable } from "./message-handlers/rootMessageTable";

class MessageBus {
  constructor(state, options = {}) {
    this.state = state;
    this.messages = [];

    this.logging = options.logging;
    this.logger = options.logger;

    this.messageTable = getRootMessageTable(this.state);
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
