import React, { useState, useEffect, useRef } from 'react';

import './App.css';

import { Provider as GameProvider } from './context.game';
import gameReducer, { initialState as gameInitialState, ACTIONS } from './reducer.game';
import GameCore from './GameCore.js';

import ScoreBoard from './components/scoreboard';

import { scoreController } from './controllers/ScoreController';
import { gameController } from './controllers/GameController';

import { Hole } from './components/Hole';
import { STATE } from './models/state';


// Experiment for provide a 'common' reducer mapping
const _reduxMapping = {
  _rootData: null,
  _dispatch: null,
  init: ({ use }) => {
    // [_reduxMapping._rootData, _reduxMapping._dispatch] = useReducer(gameReducer, gameInitialState);
    [_reduxMapping._rootData, _reduxMapping._dispatch] = use;
  },
  setGame: (game) => _reduxMapping._dispatch({
    type: ACTIONS.SET_GAME,
    game,
  })
};

// React and games
// https://github.com/honmanyau/circlet
// https://www.npmjs.com/package/react-native-game-engine
// https://codeburst.io/reactjs-build-a-drunken-snake-game-using-hooks-642cf31ef95e
// https://css-tricks.com/using-requestanimationframe-with-react-hooks/
const useTimeout = (_fn, _timeout) => {
  const interval = setTimeout(_fn.bind(null), _timeout);
  return interval;
}

/* Thanks Dan Abramov for useInterval hook
 https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function App() {
  // const [game, setGame] = useState({});
  // _reduxMapping.init({ use: useReducer(gameReducer, gameInitialState) });
  // console.log(_reduxMapping);  // TODO: REMOVE DEBUG LOG
  ///const [isPlaying, setIsPlaying] = useState(false);

  const [board, setBoard] = useState(gameController.game.board);
  const [state, setState] = useState(gameController.game.state);
  const [messageEndGame, setMessageEndGame] = useState(gameController.game.messageEndGame)

  function onBoardUpdated(newState) {
    const { board, state, messageEndGame } = newState.game;
    setBoard(board);
    setState(state);
    setMessageEndGame(messageEndGame);
  }

  useEffect(() => {
    gameController.attach(onBoardUpdated);

    return () => gameController.detach(onBoardUpdated);
  },[])

  useEffect(() => {
    if(state === STATE.IN_GAME) {
      const interval = setInterval(() => {
        gameController.reorderMoles();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state]);

  // const _gameInit = () => {
  //   const _game = GameCore.createNewGame();
  //   GameCore.initializeGame({ game: _game, holes: 6 });
  //   _onUpdateScore({ game: _game });
  //   GameCore.molesMovement({ game: _game });
  //   setGame( _game );
  //   console.log('App -> _gameInit', _game); // TODO: REMOVE DEBUG LOG ✴️️️️✴️️️️✴️
  //   return _game;
  // };

  // const _gameControl = ({ game }) => {
  //   const _playstep = GameCore.playGame({ game });
    // console.log('App -> _gameControl', _playstep); // TODO: REMOVE DEBUG LOG ✴️️️️✴️️️️✴️
    // if (_playstep.state === 'play' && _playstep.mole) {
    //   const _mole = _playstep.mole;
    //   const _hiddenTime = GameCore.getMolePeepTime({ mole: _mole });
    //   _mole.isOut = true;
    //   setTimeout(()=> { // Hide the mole
    //     _mole.isOut = false;
    //     _mole.isMoving = false;
    //     setMole({
    //       id: _mole.id,
    //       mole: _mole,
    //     });
    //   }, _hiddenTime);

      // useTimeout(() => {  // Hide the mole ???? no inside conditional ???
      //   _mole.isOut = false;
      //   _mole.isMoving = false;
      //   setMole({
      //     id: _mole.id,
      //     mole: _mole,
      //   });
      // },   );

      // if (_mole.id) {
      //   setMole({
      //     id: _mole.id,
      //     mole: _mole,
      //   });
      // }

    // }
  
    // if (_playstep.state !== 'end') {
    //   // setTimeout( _gameControl({ game }), 1500);
    //   useTimeout( _gameControl({ game }), 500);
    // }

    // useTimeout(() => {
    //   if (_playstep.state !== 'end') {
    //     _gameControl({ game });
    //   }
    // }, 1500);

  // };

  return (
    <div className="App">
      
      {state === STATE.START &&
        <button onClick={() => gameController.setGameState(STATE.IN_GAME)}>START GAME</button>
      }

      {state === STATE.IN_GAME &&
        <React.Fragment>
          <ScoreBoard />
          <div className='Terrain'>
            {board.map(element => <Hole key={element.id} mole={element.mole} />)}
          </div>
        </React.Fragment>
      }

      {state === STATE.FINAL &&
        <React.Fragment>
          <div>{messageEndGame}</div>
          
          <button onClick={() => {
            gameController.reset();
            gameController.setGameState(STATE.IN_GAME);
          }}>New Game</button>

          <button onClick={() => {
            gameController.reset();
            gameController.setGameState(STATE.START);
            }}
          >Exit</button>
        </React.Fragment>
      }
    </div>
  );
}

export default App;
