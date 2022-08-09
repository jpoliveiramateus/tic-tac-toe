import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import TicTacToeContext from '../context/Context';
import Square from './Square';

function TicTacToe() {
  const [game, setGame] = useState(Array(9).fill(''));
  const [lineWin, setLineWin] = useState(null);
  const [resetGame, setResetGame] = useState(null);

  const { currentPlayer, setCurrentPlayer, winner, setWinner,
  endGame, setEndGame, setPointsP1, setPointsP2, setTie, onePlayer } = useContext(TicTacToeContext);
  
  // switch players
  useEffect(() => {
    const resetGame = (player, mode) => {
      setPointsP1(0);
      setPointsP2(0);
      setTie(0);
      setGame(Array(9).fill(''));
      setWinner(false);
      setEndGame(false);
      setCurrentPlayer(player);
      setResetGame(mode);
    }

    if (onePlayer) {
      resetGame('O', '1p');
    } else {
      resetGame('X', '2p');
    }
  }, [onePlayer, setCurrentPlayer, setEndGame, setPointsP1, setPointsP2, setTie, setWinner]);

  useEffect(() => {
    // clickBot
    const handleClickBot = (index) => {
      setGame(game.map((square, squareIndex) => squareIndex === index ? currentPlayer : square));
      setCurrentPlayer((prevState) => prevState === 'X' ? 'O' : 'X');
    }

    // checkWinner
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
    possibleWaysToWin.forEach((possible) => {
      if (possible.every((square) => square === 'X') || possible.every((square) => square === 'O')) {
        win = true;
      };
    });
  
    if (resetGame === '1p' && currentPlayer === 'O' && !win) {
      const freePossibles = [];
      for (let index in game) {
        if (!game[index]) {
          freePossibles.push(index);
        }
      }
      const randomIndex = Math.floor(Math.random() * freePossibles.length);
      const randomPossible = Number(freePossibles[randomIndex]);
      setTimeout(() => handleClickBot(randomPossible), 500);
    }
  }, [resetGame, currentPlayer, game, setWinner, winner, endGame, setCurrentPlayer, setEndGame]);

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
    if (!onePlayer || currentPlayer === 'X') {
      if (!cell && !winner) {
        setGame(game.map((square, squareIndex) => squareIndex === index ? currentPlayer : square));
        setCurrentPlayer((prevState) => prevState === 'X' ? 'O' : 'X');
      }
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