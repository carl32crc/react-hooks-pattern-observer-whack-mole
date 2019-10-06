import React, { useEffect } from 'react';
import { scoreController } from './../../controllers/ScoreController';
import { gameController } from './../../controllers/GameController';

import './styles.css';

const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Mole = ({mole}) => {
  
  useEffect(() => {
    if(mole.isVisible) {
      const randomTime = randomIntFromInterval(mole.peepOutMin, mole.peepOutMax);
      const interval = setInterval(() => {
        gameController.hideMole(mole);
      }, randomTime);
      return () => clearInterval(interval);
    } 
  }, [mole])
  
  return(
  mole.live > 0 && mole.isVisible &&
    <div 
      className='Mole'
      style={{ backgroundColor: mole.type === 'golden' && 'yellow' }} 
      onClick={() => {
        scoreController.updateScore(mole);
        gameController.kickedMole(mole);
      }}
    >
  </div>
)
};