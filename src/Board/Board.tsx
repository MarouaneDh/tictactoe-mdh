import React, { useEffect, useState } from 'react';

import Box from '../Box/Box.tsx';
import './Board.css';

const Board = () => {
  const [game, setGame] = useState(['', '', '', '', '', '', '', '', '']);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scorePlayerX, setScorePlayerX] = useState(0);
  const [scorePlayerO, setScorePlayerO] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameMessage, setGameMessage] = useState('Player X starts');
  const [combo, setCombo] = useState('');

  const winningCombo = ['012', '345', '678', '036', '147', '258', '048', '246'];

  const resetGame = () => {
    setGame(['', '', '', '', '', '', '', '', '']);
    setScorePlayerO(0);
    setScorePlayerX(0);
    setIsGameFinished(false);
    setCombo('');
    setGameMessage(`Player ${currentPlayer} starts`);
  };

  const restartGame = () => {
    setGame(['', '', '', '', '', '', '', '', '']);
    setIsGameFinished(false);
    setCombo('');
    setGameMessage(`Player ${currentPlayer} starts`);
  };

  const boxClickHandler = (event: any) => {
    if (isGameFinished) {
      return;
    }
    setGameMessage('');
    const boxIndex = +event.target.getAttribute('box-index');

    const currentBoxValue = game[boxIndex];
    if (currentBoxValue) {
      return;
    }

    const newGameValue = [...game];
    newGameValue[boxIndex] = currentPlayer;

    setGame(newGameValue);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkIfWin = () => {
    for (let i = 0; i < winningCombo.length; i++) {
      if (
        game[+winningCombo[i][0]] === 'X' &&
        game[+winningCombo[i][1]] === 'X' &&
        game[+winningCombo[i][2]] === 'X'
      ) {
        setScorePlayerX((prevState) => prevState + 1);
        setGameMessage('Player X won');
        setIsGameFinished(true);
        setCombo(winningCombo[i]);
      } else if (
        game[+winningCombo[i][0]] === 'O' &&
        game[+winningCombo[i][1]] === 'O' &&
        game[+winningCombo[i][2]] === 'O'
      ) {
        setScorePlayerO((prevState) => prevState + 1);
        setGameMessage('Player O won');
        setIsGameFinished(true);
        setCombo(winningCombo[i]);
      } else if (!game.includes('')) {
        setIsGameFinished(true);
      }
    }
  };

  /* eslint-disable */
  useEffect(() => {
    checkIfWin();
  }, [game]);

  useEffect(() => {
    if (
      !game.includes('') &&
      gameMessage !== 'Player O won' &&
      gameMessage !== 'Player X won'
    ) {
      setGameMessage("It's a draw");
    }
  }, [game]);
  /* eslint-enable */

  return (
    <div className="game_container">
      <div className="scores">
        {(scorePlayerO !== 0 || scorePlayerX !== 0) && (
          <button onClick={resetGame}>Reset scores</button>
        )}
        <h1>Scores</h1>
        <span>
          Player X : <strong>{scorePlayerX}</strong>
        </span>
        <span>
          Player O : <strong>{scorePlayerO}</strong>
        </span>
        <h2>{gameMessage}</h2>
      </div>
      <div className="board">
        {game.map((item, index) => {
          return (
            <Box
              {...{ index, item, combo }}
              key={index}
              onClick={boxClickHandler}
            />
          );
        })}
      </div>
      <button onClick={restartGame}>Restart game</button>
    </div>
  );
};

export default Board;
