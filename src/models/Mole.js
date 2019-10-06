import { GenerateUUID } from './GenerateUUID';

export class Mole extends GenerateUUID {

  constructor() {
    super()
    this.isVisible = false;
    this.live = LIVE.MOLE;
    this.name =`Mole ${this.id}`;
    this.peepOutMax = 1200;
    this.peepOutMin = 200;
    this.points = 10;
    this.type = 'normal';
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