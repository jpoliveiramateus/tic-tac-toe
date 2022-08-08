import React, { useContext } from "react";
import TicTacToeContext from "../context/Context";
import { FaUserAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

function Result() {
  const { currentPlayer, winner, endGame, pointsP1, pointsP2,
    tie, onePlayer, setOnePlayer } = useContext(TicTacToeContext);
  return (
    <footer>
      <div className={`${currentPlayer === 'X' && 'white'}  ${(winner || endGame) && 'white'}`}>
        <p>PLAYER1 (X)</p>
        <p data-testid='points-p1'>{pointsP1}</p>
      </div>
      <div className={`${(winner || endGame) && 'white'}`}>
        <p>TIE</p>
        <p data-testid='points-tie'>{tie}</p>
      </div>
      <div className={`${currentPlayer === 'O' && 'white'}  ${(winner || endGame) && 'white'}`}>
        {onePlayer ? <p>COMPUTER (O)</p> : <p>PLAYER2 (O)</p>}
        <p data-testid='points-p2'>{pointsP2}</p>
      </div>
      <section className="player" onClick={() => { onePlayer ? setOnePlayer(false) : setOnePlayer(true)}}>
        {onePlayer ? (
          <>
            <FaUserAlt className="icon-player" />
            <p>1P</p>
          </>
        ) : (
          <>
            <FaUserFriends className="icon-player" />
            <p>2P</p>
          </>
        )}
      </section>
    </footer>
  );
}

export default Result;
