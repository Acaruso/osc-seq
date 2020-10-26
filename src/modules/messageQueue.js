class MessageQueue {
  constructor() {
    this.messages = [];
  }

  push(newMessage) {
    if (Array.isArray(newMessage)) {
      this.messages = this.messages.concat(newMessage.flat(4));
    } else {
      this.messages.push(newMessage);    
    }
  }
}

export { MessageQueue };
