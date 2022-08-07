import React, { useState } from 'react';
import TicTacToeContext from './Context';

function Provider({ children }) {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const [pointsP1, setPointsP1] = useState(0);
  const [pointsP2, setPointsP2] = useState(0);
  const [tie, setTie] = useState(0);

  const state = {
    currentPlayer,
    setCurrentPlayer,
    winner,
    setWinner,
    endGame,
    setEndGame,
    pointsP1,
    setPointsP1,
    pointsP2,
    setPointsP2,
    tie,
    setTie,
  }

  return (
    <TicTacToeContext.Provider value={state}>
      {children}
    </TicTacToeContext.Provider>
  );
}

export default Provider;
