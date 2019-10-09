import React from 'react';
import { gameController } from './../../controllers/GameController';
import { scoreController } from './../../controllers/ScoreController';
import { Mole } from './../Mole';

import './styles.css'

export const Hole = ({ mole }) => (
  <div 
    className='Hole' 
    onClick={(event) => {
      if( event.target.className === 'Hole') {
        scoreController.failShot();
        gameController.continueInGame();
      } 
    }}>
    <Mole mole={mole}/>
  </div>
);