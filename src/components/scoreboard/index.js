import React, { useState, useEffect } from 'react';
import { scoreController } from '../../controllers/ScoreController';

function ScoreBoard() {

  const [ score , setScore ] = useState(scoreController.score);

  function onScoreUpdated(newState) {
    const { shots, hits, score } = newState.score;
    setScore({ shots, hits, score })
  }

  useEffect(() => {
    scoreController.attach(onScoreUpdated);

    return () => scoreController.detach(onScoreUpdated);
  },[])

  return (
    <div>
      <h1>Whack a mole</h1>
      <h2>Shots: {score.shots}</h2>
      <h2>Hits: {score.hits}</h2>
      <h2>Score: {score.score}</h2>
    </div>
  );
};

export default ScoreBoard;