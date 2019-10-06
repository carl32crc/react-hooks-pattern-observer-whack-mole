import { Game } from './../models/Game';
import { scoreController } from './ScoreController';
import { Subject } from './../subject';

class GameController extends Subject {
  
  game = null;

  constructor(Game) {
    super()
    this.game = new Game();
  }

  setGameState(gameState){
    this.game.setState(gameState);
    this.publish(this);
  }

  kickedMole(mole) {
    this.game.kickedMole(mole, scoreController);
    this.publish(this);
  }

  reorderMoles() {
    this.game.randomReorderMoles();
    this.publish(this);
  }

  reset() {
    this.game.restartGame(scoreController);
    this.publish(this);
  }

}

const gameController = new GameController(Game);

export {
  gameController
}