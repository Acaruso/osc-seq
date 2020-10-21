import { createGame } from "./modules/game/createGame";
import { startGameLoop } from "./modules/game/gameLoop";

const game = createGame();

startGameLoop(game);
