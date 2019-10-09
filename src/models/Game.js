import { shuffle } from './../utils/shuffle';
import { Hole } from './Hole';
import { GoldenMole , Mole, LIVE } from './Mole';
import { STATE } from './state';
import { MESSAGE } from './message';

const generateRandomNumber = (CUSTOM_HOLES_NUMBER, HOLES_NUMBER) => Math.floor(Math.random() * (CUSTOM_HOLES_NUMBER || HOLES_NUMBER));

export class Game {
  state = '';
  board = [];
  messageEndGame = '';
  HOLES_NUMBER = 6;
  CUSTOM_HOLES_NUMBER = null;

  constructor(CUSTOM_HOLES_NUMBER = null) {
    this.state = STATE.START;
    this.CUSTOM_HOLES_NUMBER = CUSTOM_HOLES_NUMBER;
    this._setBoard();
  }

  setState(state) {
    this.state = state;
  }

  setMessage(message) {
    this.messageEndGame = message;
  }

  _setBoard() {
    const randomNumber = generateRandomNumber(this.CUSTOM_HOLES_NUMBER, this.HOLES_NUMBER);
    this.board = Array(this.CUSTOM_HOLES_NUMBER || this.HOLES_NUMBER).fill('')
      .map((_, index) => ({ ...new Hole(GoldenMole, Mole, randomNumber, index)}))
  }

  showRandomMole() {
    const randomNumber = generateRandomNumber(this.CUSTOM_HOLES_NUMBER, this.HOLES_NUMBER);
    this.board[randomNumber].mole.isVisible = true;
  }

  hideMole(moleToHide) {
    this.board = this.board.map(({ id, mole }) => {
      return { id, mole: { ...mole.id === moleToHide.id ? {...mole, isVisible: false } : mole  } }
    })
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
    if(scoreController.score.shots === hitsNeededToKillAllMoles * 2) {
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

  restartGame(scoreController) {
    scoreController.restartScore();
    this._setBoard();
  }

  randomReorderMoles() {
    this.board = this._shuffleMolesInHoles();
  }

  _shuffleMolesInHoles() {
    const copy = this.board.map((element) => element);
    const random = shuffle(copy);
    
    const molesReorder = this.board.map(element => {
      const value = random.next().value;
      return {
        ...element,
        mole: value.mole
      }
    }) 
    return molesReorder;
  }
}