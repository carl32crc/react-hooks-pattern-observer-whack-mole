import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';


import { createNewMole, initializeGame, createNewGame, molesMovement, playGame, getMolePeepTime } from '../GameCore.js';

import { Context as GameContext } from '../context.game';


const TerrainWrapper = (props) => {
  const { game, setGame } = useContext(GameContext);  // Game or only terrain data?


  const _game = createNewGame();
  initializeGame({ game: _game, holes: props.holes });
  props.onUpdateScore({ game: _game });
  molesMovement({ game: _game });
  setGame( _game );

  const [isPlaying, setIsPlaying] = useState(false);
  const [holes, setHoles] = useState(game.holes);
  const [moles, setMoles] = useState(game.moles);

  const _onWackMole = (_data) => {
    console.log('Terrain -> _onWackMole');  // TODO: REMOVE DEBUG LOG
    console.log(_data);  // TODO: REMOVE DEBUG LOG
    game.shots++;
    game.score++;
    props.onUpdateScore({ game });
  };

  const _gameControl = () => {
    const _playstep = playGame({ game });

    if (_playstep.state === 'play' && _playstep.mole) {
      const _hiddenTime = getMolePeepTime({ mole: _playstep.mole });
      _playstep.mole.isOut = true;
      setTimeout(()=> { // Hide the mole
        _playstep.mole.isOut = false;
        _playstep.mole.isMoving = false;
        setMoles({ 
          ..._playstep.game.moles,
          [_playstep.mole.id]: _playstep.mole,
         });
      }, _hiddenTime);
    }

    setHoles( {..._playstep.game.holes} );
    setMoles( {..._playstep.game.moles} );

    if (_playstep.state !== 'end') {
      setTimeout( _gameControl, 500);
    }
  };

  if (!isPlaying) {
    setIsPlaying(true);
    setTimeout( _gameControl, 500 );  // Start game control after half a second
  }
  
  return (
    <h1>hola</h1>
  );

};


TerrainWrapper.propTypes = {
  holes: PropTypes.number,
  onUpdateScore: PropTypes.func,
};

TerrainWrapper.defaultProps = {
  holes: null,
  onUpdateScore: null,
};


export default TerrainWrapper;