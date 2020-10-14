import { Client } from 'node-osc';
import { createBallEntity, createUpdateBallPositionMessage } from "./ball";
import {
  createUserInput,
  addKeyboardHandlers,
  addMouseHandler,
} from "./userInput";
import { MessageQueue } from "./messageQueue";
import { Logger } from "./logger";
import { getRootMessageTable } from "./message-handlers/rootMessageTable";
import { getGrid } from './grid';
import { createRectEntity, createUpdateRectMessage } from "./rect";
import { getTimeDivisions } from './time';
import { createComponentTable, join } from "./entityComponent";
import { createUserInputMessageTable } from './message-handlers/userInputMessageTable';

function getGame(options = {}) {
  let game = {};

  let { logging } = options;
  game.logger = logging ? new Logger("log.txt") : {};

  game.state = {};

  game.state.oscClient = new Client('127.0.0.1', 3333);
  game.state.canvas = document.getElementById("myCanvas");
  game.state.clock = 0;

  game.state.entities = [];

  game.state.components = {
    position: createComponentTable(),
    ball: createComponentTable(),
    rect: createComponentTable(),
    drawable: createComponentTable(),
    controllable: createComponentTable(),
    clickable: createComponentTable(),
    userInput: createUserInput(),
  };

  createBallEntity(game.state);
  createRectEntity(game.state, { x: 50, y: 50, w: 50, h: 50, color: "#000000" });

  // console.log(game.state)

  // let drawableBalls = join(
  //   "ball",
  //   ["position", "drawable"],
  //   game.state.components,
  // );

  // console.log(drawableBalls)

  // let drawableRects = join(
  //   "rect",
  //   ["position", "drawable"],
  //   game.state.components,
  // );

  // console.log(drawableRects)

  game.inputQueue = new MessageQueue();
  game.queue = new MessageQueue();

  game.state.time = getTimeDivisions(120);

  addKeyboardHandlers(game.inputQueue);
  addMouseHandler(game.state, game.inputQueue);

  game.messageTable = getRootMessageTable(game.state);

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
    // controlSystem(game.state),
    drawSystem(game.state),
    { type: "update clock" },
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

function drawSystem(state) {
  let out = [];

  let drawBallsMsgs = drawBallsSystem(state);
  out = out.concat(drawBallsMsgs);

  let drawRectsMsgs = drawRectsSystem(state);
  out = out.concat(drawRectsMsgs);

  return out;
}

function drawBallsSystem(state) {
  let out = [];
  
  // join(primaryCompName, siblingCompNames, compTables)
  
  let drawableBalls = join(
    "ball",
    ["position", "drawable"],
    state.components,
  );
  
  // console.log(drawableBalls)

  // let drawableBalls = join(
  //   ["position", "ball", "drawable"],
  //   state.entities,
  //   state.components
  // );

  for (const ball of drawableBalls) {
    out.push({ type: "draw ball", data: ball });
  }

  return out;
}

function drawRectsSystem(state) {
  let out = [];
  
  let drawableRects = join(
    "rect",
    ["position", "drawable"],
    state.components,
  );

  // let drawableRects = join(
  //   ["position", "rect", "drawable"], 
  //   state.entities, 
  //   state.components
  // );

  for (const rect of drawableRects) {
    out.push({ type: "draw rect", data: rect });
  }

  return out;
}

function controlSystem(state) {
  let out = [];

  let controllableBalls = join(
    ["position", "ball", "controllable"], 
    state.entities, 
    state.components
  );

  for (const ball of controllableBalls) {
    const msg = createUpdateBallPositionMessage(ball, state.components.userInput);
    msg ? out.push(msg) : null;
  }

  let clickableRects = join(
    ["position", "rect", "clickable"], 
    state.entities, 
    state.components
  );

  for (const rect of clickableRects) {
    const msg = createUpdateRectMessage(rect, state.components.userInput);
    msg ? out.push(msg) : null;
  }
  
  // unset userInput.click
  out.push({
    type: "update component",
    component: "userInput",
    entityId: -1,
    data: { ...state.components.userInput, click: false },
  })

  return out;
}

export { getGame, startGameLoop };
