import { Score } from './../models/Score';
import { Subject } from './../subject'

class ScoreController {
  
  constructor(Score, Subject) {
    this.score = Score;
    this.subject = Subject;
  }

  restartScore() {
    this.score.initScore();
    this.subject.publish(this);
  }

  failShot() {
    this.score.failShot();
    this.subject.publish(this);
  }

  updateScore(mole) {
    this.score.incrementScore(mole);
    this.subject.publish(this)
  }
}

const scoreController = new ScoreController(new Score(), new Subject());

export {
  scoreController
}