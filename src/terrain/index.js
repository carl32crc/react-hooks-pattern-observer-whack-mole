import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { Context as GameContext } from '../context.game';


const TerrainWrapper = (props) => {
  const { game, setGame } = useContext(GameContext);  // Game or only terrain data?
  
  const _onWhackMole = (_data) => {
    console.log('Terrain -> _onWhackMole');  // TODO: REMOVE DEBUG LOG
    console.log(_data);  // TODO: REMOVE DEBUG LOG
    console.log(game);  // TODO: REMOVE DEBUG LOG
    props.onUpdateScore({
      shots: game.shots + 1,
      hits: game.hits + 1,
      score: game.score + 1,
    });
  };

  return (
    <h1>Terrain</h1>
  );

};


TerrainWrapper.propTypes = {
  holes: PropTypes.object,
  moles: PropTypes.object,
  onUpdateScore: PropTypes.func,
};

TerrainWrapper.defaultProps = {
  holes: null,
  moles: null,
  onUpdateScore: null,
};


export default TerrainWrapper;