import { GenerateUUID } from './GenerateUUID';

export class Mole {

  constructor() {
    this.id = new GenerateUUID().id;
    this.isVisible = false;
    this.live = LIVE.MOLE;
    this.name =`Mole ${this.id}`;
    this.peepOutMax = 1200;
    this.peepOutMin = 200;
    this.points = 10;
    this.type = 'normal';
    this.hide = this.hide;
    this.decrementLive = this.decrementLive;
  }

  hide() {
    this.isVisible = false;
  }

  decrementLive() {
    if(this.live > 0) {
      this.live--;
    }
  }
}

export class GoldenMole extends Mole {
  constructor() {
    super()
    this.live = LIVE.GOLDEN_MOLE;
    this.peepOutMax = 500;
    this.peepOutMin = 200;
    this.points = 150;
    this.type = 'golden';
  }
}

export const LIVE = {
  MOLE: 5,
  GOLDEN_MOLE: 2 
}