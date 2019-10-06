import { GenerateUUID } from './GenerateUUID';


export class Hole extends GenerateUUID {
  constructor(GoldenMole, Mole, index, randomNumber) {
    super()
    this.mole = index === randomNumber ? new GoldenMole() : new Mole();
  }
}