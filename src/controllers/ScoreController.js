import { Score } from './../models/Score';
import { Subject } from './../subject'

class ScoreController extends Subject {
  
  constructor(Score) {
    super()
    this.score = new Score();
  }

  restartScore() {
    this.score.initScore();
    this.publish(this);
  }

  failShot() {
    this.score.failShot();
    this.publish(this);
  }

  updateScore(mole) {
    this.score.incrementScore(mole);
    this.publish(this)
  }
}

const scoreController = new ScoreController(Score);

export {
  scoreController
}