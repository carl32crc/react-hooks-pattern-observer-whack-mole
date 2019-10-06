

export class Score {

  constructor(){
    this.initScore();
  }

  initScore() {
    this.score = 0;
    this.shots = 0;
    this.hits = 0;
  }

  incrementScore(mole) {
    this.score = this.score + mole.points;
    this.shots++;
    this.hits++;
  }

  failShot() {
    this.hits++;
  }
}