import { Game } from './models/Game';

const GAME = {
  score: 0,
  shots: 0,
  hits: 0,
  holes: {},
  moles: {},
};


const HOLE = {
  id: null,
  mole: null,
};

const MOLE = {
  id: null,
  name: null,
  life: null,
  isOut: false,
  isMoving: false,
  peepOutMin: 500,
  peepOutMax: 1200,
};


const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export const createNewGame = () => {
  return {
    ...GAME,
  };
};

export const createNewHole = ({ id }) => {
  return {
    ...HOLE,
    id,
  };
};

export const createNewMole = ({ id, name, life }) => {
  return {
    ...MOLE,
    id,
    name,
    life,
  };
};


export const initializeGame = ({game, holes=6, moles}) => {

  const gameController = new Game();

  console.log('1-gameController',gameController)

  gameController.randomReorderMoles();

  console.log('2-gameController', gameController.board)

  gameController.randomReorderMoles();

  console.log('3-gameController', gameController.board)

  // const _holes = {};
  // const _moles = {};

  // Array(holes).fill('').map((_item, _i) => {  // prepare an array for 'map' all the holes
  //   const _hole = createNewHole({ 
  //     id: `${_i}`,
  //   });

  //   _holes[_hole.id] = _hole;
  // });

  // const numOfMoles = moles || holes;
  // Array(numOfMoles).fill('').map((_item, _i) => {  // prepare an array for 'map' all the moles
  //   const _mole = createNewMole({ 
  //     id: `${_i}`,
  //     name: `Mole n${_i+1}`,
  //     life: 1,
  //   });

  //   _moles[_mole.id] = _mole;
  // });
  
  
  // game.holes = _holes;
  // game.moles = _moles;

  // console.log('GameCore -> initializeGame', game);  // TODO: REMOVE DEBUG LOG
};


const chooseRandomHole = ({ holes }) => {
  const _holesArray = Object.values(holes);
  const _index = randomIntFromInterval(0, _holesArray.length - 1);
  const _hole = _holesArray[_index];
  
  if (_hole.mole !== null) {
    return chooseRandomHole ({ holes });
  }

  return _hole;
};


export const molesMovement = ({ game }) => {
  const _movedMoles = [];
  const {moles, holes} = game;

  Object.values(holes).forEach(_hole => {  // reset holes
    _hole.mole = null;
  });

  Object.values(moles).forEach(_mole => { // Move the moles into the different holes
    const _selectedHole = chooseRandomHole({ holes });
    _selectedHole.mole = _mole.id;
  });

};


export const findMole = ({ game, id }) => {
  const {holes} = game;
  return holes.find(_hole => _hole.mole === id)
};

export const getMolePeepTime = ({ mole }) => {
  return randomIntFromInterval(mole.peepOutMin, mole.peepOutMax);
};

export const playGame = ({ game }) => {
  // console.log('GameCore -> playGame', game); // TODO: REMOVE DEBUG LOG ✴️️️️✴️️️️✴️

  const _aliveMoles = Object.values(game.moles).filter(_mole => _mole.life > 0);  // Only the moles that are alive
  if (_aliveMoles.length === 0) {
    return {  // Exit the function
      game,
      state: 'end',
    };
  }

  const _iddleMoles = _aliveMoles.filter(_mole => _mole.isMoving === false);
  if (_iddleMoles.length === 0) {
    return {
      game,
      state: 'play',
      alive: _aliveMoles.length,
      iddle: _iddleMoles,
    };
  }
  const _index = randomIntFromInterval(0, _iddleMoles.length - 1);
  const mole = _iddleMoles[_index];
  mole.isMoving = true; // this mole is moving since now.

  return {
    game,
    state: 'play',
    mole,
    alive: _aliveMoles.length,
    iddle: _iddleMoles.length -1,
  };

};

/*
const _gameControl = ({ game }) => {
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
*/

/*
const _gameInit = () => {
  const _game = createNewGame();
  initializeGame({ game: _game, holes: props.holes });
  props.onUpdateScore({ game: _game });
  molesMovement({ game: _game });
  setGame( _game );
};
*/


const _Lib = {
  createNewGame,
  createNewHole,
  createNewMole,
  molesMovement,
  getMolePeepTime,
  playGame,
  initializeGame,
  CONSTANTS: {
    GAME,
    HOLE,
    MOLE,
  },
};
export default _Lib;