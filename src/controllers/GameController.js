import { Game } from './../models/Game';
import { scoreController } from './ScoreController';
import { Subject } from './../subject';

class GameController extends Subject {

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

  showRandomMole() {
    this.game.showRandomMole();
    this.publish(this);
  }

  hideMole(mole) {
    this.game.hideMole(mole);
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