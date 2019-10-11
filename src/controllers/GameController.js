import { Game } from './../models/Game';
import { scoreController } from './ScoreController';
import { Subject } from './../subject';

class GameController {

  constructor(Game, Subject) {
    this.game = Game;
    this.subject = Subject;
  }

  setGameState(gameState){
    this.game.setState(gameState);
    this.subject.publish(this);
  }

  continueInGame() {
    this.game.continueInGame(scoreController);
    this.subject.publish(this);
  }

  kickedMole(mole) {
    this.game.kickedMole(mole, scoreController);
    this.subject.publish(this);
  }

  showRandomMole() {
    this.game.showRandomMole();
    this.subject.publish(this);
  }

  hideMole(mole) {
    this.game.hideMole(mole);
    this.subject.publish(this);
  }

  reorderMoles() {
    this.game.randomReorderMoles();
    this.subject.publish(this);
  }

  reset() {
    this.game.restartGame(scoreController);
    this.subject.publish(this);
  }

}

const gameController = new GameController(new Game(), new Subject());

export {
  gameController
}