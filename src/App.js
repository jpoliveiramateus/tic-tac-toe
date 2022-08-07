import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [game, setGame] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const [winner, setWinner] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const [pointsP1, setPointsP1] = useState(0);
  const [pointsP2, setPointsP2] = useState(0);
  const [tie, setTie] = useState(0);

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
      possibleWaysToWin.forEach((possible) => {
        if (possible.every((square) => square === 'X') || possible.every((square) => square === 'O')) {
          setWinner(true);
          win = true;
        };
      });

      if (game.every((square) => square) && !win) {
        setTie((prevState) => prevState + 1);
        setEndGame(true);
      }
    }
    checkWinner();
  }, [game]);

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
  }, [winner, currentPlayer]);

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

  return (
    <div className="App">
      <main className="game">
        {game.map((square, index) => {
          return (
            <div
              key={ `square ${index}` }
              className={ `square ${index}` }
              onClick={ () => handleClick(index, square) }
            >
              {square}
            </div>
          );
        })}
      </main>
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
    </div>
  );
}

export default App;
