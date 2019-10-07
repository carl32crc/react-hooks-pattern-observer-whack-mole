import React, { useState, useEffect } from 'react';

import { ScoreBoard } from './components/scoreboard';
import { gameController } from './controllers/GameController';
import { randomIntFromInterval } from './utils/randomIntFromInterval';

import { Hole } from './components/Hole';
import { STATE } from './models/state';

import './App.css';

function App() {
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

  useEffect(() => {
    if(state === STATE.IN_GAME) {
      const randomTimer = randomIntFromInterval(400, 1200);
      const interval = setInterval(() => {
        gameController.showRandomMole();
      }, randomTimer);
      return () => clearInterval(interval);
    }
  }, [state]);

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
