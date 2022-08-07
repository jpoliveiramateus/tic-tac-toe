import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import TicTacToeContext from '../context/Context';
import Square from './Square';

function TicTacToe() {
  const [game, setGame] = useState(Array(9).fill(''));
  const [lineWin, setLineWin] = useState(null);

  const { currentPlayer, setCurrentPlayer, winner, setWinner,
    endGame, setEndGame, setPointsP1, setPointsP2, setTie } = useContext(TicTacToeContext);

  useEffect(() => {
    const checkWinner = () => {
      const possibleWaysToWin = [
        [game[0], game[1], game[2]],
        [game[3], game[4], game[5]],
        [game[6], game[7], game[8]],
  
        [game[0], game[3], game[6]],
        [game[1], game[4], game[7]],
        [game[2], game[5], game[8]],
  
        [game[0], game[4], game[8]],
        [game[2], game[4], game[6]],
      ];
      
      let win = false;
      possibleWaysToWin.forEach((possible, index) => {
        if (possible.every((square) => square === 'X') || possible.every((square) => square === 'O')) {
          setWinner(true);
          win = true;
          setLineWin(index);
        };
      });

      // checkDraw
      if (game.every((square) => square) && !win) {
        setTie((prevState) => prevState + 1);
        setEndGame(true);
        setLineWin(false);
      }
    }
    checkWinner();
  }, [game, setEndGame, setTie, setWinner]);

  useEffect(() => {
    const setPoints = () => {
      if (winner) {
        if (currentPlayer === 'O') {
          setPointsP1((prevState) => prevState + 1);
        } else {
          setPointsP2((prevState) => prevState + 1);
        }
      }
    }
    setPoints();
  }, [winner, currentPlayer, setPointsP1, setPointsP2]);

  const handleClick = (index, cell) => {
    if (!cell && !winner) {
      setGame(game.map((square, squareIndex) => squareIndex === index ? currentPlayer : square));
      setCurrentPlayer((prevState) => prevState === 'X' ? 'O' : 'X');
    }

    if (winner || endGame) {
      setGame(Array(9).fill(''));
      setWinner(false);
      setEndGame(false);
    }
  }

  return(
    <main className="game">
      {game.map((square, index) => {
        return (
          <Square
            key={ `square ${index}` }
            index={ index }
            square={ square }
            handleClick={ handleClick }
            lineWin={ lineWin }
          />
        );
      })}
    </main>
  )
}

export default TicTacToe;