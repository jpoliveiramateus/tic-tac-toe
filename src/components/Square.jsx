import React, { useContext, useEffect, useState } from 'react';
import TicTacToeContext from '../context/Context';

function Square({ index, square, handleClick, lineWin }) {
  const [ isGrey, setIsGrey ] = useState(false);
  const { winner, endGame } = useContext(TicTacToeContext);

  useEffect(() => {
    setIsGrey(false);

    if (winner || endGame) {
      const indexPossibleWaysToWin = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
      ];
  
      indexPossibleWaysToWin.forEach((possible, i) => {
        if (lineWin === i) {
          possible.forEach((square) => {
            if (square === index) {
              setIsGrey(true);
            }
          });
        }
      });
    }
  }, [winner, endGame, lineWin, index]);

  return (
    <div
      className={ `square ${index} ${square ? 'not-allowed' : 'pointer'} ${(winner || endGame) && 'pointer'}` }
      onClick={ () => handleClick(index, square) }
      data-testid={ `square ${index}` }
      style={ (!isGrey && (endGame || winner)) ? { color: 'gray' } : { color: 'white' } }
      role={square ? 'full' : 'empty' }
    >
      {square}
    </div>
  );
}

export default Square;