import React, { useContext } from "react";
import TicTacToeContext from "../context/Context";

function Result() {
  const { currentPlayer, winner, endGame, pointsP1, pointsP2, tie } = useContext(TicTacToeContext);
  return (
    <footer>
      <div className={`${currentPlayer === 'X' && 'white'}  ${(winner || endGame) && 'white'}`}>
        <p>PLAYER1 (X)</p>
        <p>{pointsP1}</p>
      </div>
      <div className={`${(winner || endGame) && 'white'}`}>
        <p>TIE</p>
        <p>{tie}</p>
      </div>
      <div className={`${currentPlayer === 'O' && 'white'}  ${(winner || endGame) && 'white'}`}>
        <p>PLAYER2 (O)</p>
        <p>{pointsP2}</p>
      </div>
    </footer>
  );
}

export default Result;
