import React from 'react';
import { scoreController } from './../../controllers/ScoreController';
import { gameController } from './../../controllers/GameController';

import './styles.css';

export const Mole = ({mole}) => (
  mole.live > 0 && 
  <div 
    className='Mole'
    style={{ backgroundColor: mole.type === 'golden' && 'yellow' }} 
    onClick={() => {
      scoreController.updateScore(mole);
      gameController.kickedMole(mole);
    }}
  >
  </div>
);