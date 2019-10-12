import { GenerateUUID } from './GenerateUUID';


export class Hole {
  constructor(GoldenMole, Mole, index, randomNumber) {
    this.id = new GenerateUUID().id
    this.mole = index === randomNumber ? new GoldenMole() : new Mole();
  }
}