import { shuffle } from './../utils/shuffle';
import { Hole } from './Hole';
import { GoldenMole , Mole, LIVE } from './Mole';
import { STATE } from './state';
import { MESSAGE } from './message';


export class Game {
  state = '';
  board = [];
  messageEndGame = '';
  HOLES_NUMBER = 6;

  constructor(CUSTOM_HOLES_NUMBER) {
    this.state = STATE.START;
    this._setBoard(CUSTOM_HOLES_NUMBER);
  }

  setState(state) {
    this.state = state;
  }

  setMessage(message) {
    this.messageEndGame = message;
  }

  _setBoard(CUSTOM_HOLES_NUMBER) {
    const randomNumber = Math.floor(Math.random() * (CUSTOM_HOLES_NUMBER || this.HOLES_NUMBER));
    this.board = Array(CUSTOM_HOLES_NUMBER || this.HOLES_NUMBER).fill('')
      .map((_, index) => ({ ...new Hole(GoldenMole, Mole, randomNumber, index)}))
  }

  kickedMole(moleKicked, scoreController) {
    if(moleKicked) {
      this.board = this.board.map(({ id, mole }) => {
        return { id, mole: { ...mole.id === moleKicked.id ? {...mole, live: mole.live - 1 } : mole  } }
      })
    }
    this.checkPlayerLose(scoreController);
    this.checkPlayerWin();
  }

  checkPlayerLose(scoreController) {
    let hitsNeededToKillAllMoles = ((this.board.length - 1) * LIVE.MOLE) + LIVE.GOLDEN_MOLE;
    if(scoreController.score.hits === hitsNeededToKillAllMoles * 2) {
      this.setMessage(MESSAGE.LOSER);
      this.setState(STATE.FINAL);
    }
  }

  checkPlayerWin() {
    const molesAlife = this.board.filter(({ mole }) => mole.live > 0);
    if(molesAlife.length === 0) {
      this.setMessage(MESSAGE.WINNER);
      this.setState(STATE.FINAL);
    }
  }

  restartGame(scoreController, CUSTOM_HOLES_NUMBER) {
    scoreController.restartScore();
    this._setBoard(CUSTOM_HOLES_NUMBER);
  }

  randomReorderMoles() {
    this.board = this.shuffleMolesInHoles();
  }

  shuffleMolesInHoles() {
    const copy = this.board.map((element) => element);
    const randomValue = shuffle(copy);
    
    const arrayReorder = this.board.map(element => {
      const value = randomValue.next().value;
      return {
        ...element,
        mole: value.mole
      }
    }) 
    return arrayReorder;
  }
}