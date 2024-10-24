import React, { useEffect, useState } from 'react';

import Box from '../Box/Box.tsx';
import './Board.css';
import ScoreSection from '../ScoreSection/ScoreSection.tsx';

const Board = () => {
  const [grid, setGrid] = useState(3);
  const [game, setGame] = useState(['', '', '', '', '', '', '', '', '']);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scorePlayerX, setScorePlayerX] = useState(0);
  const [scorePlayerO, setScorePlayerO] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameMessage, setGameMessage] = useState('Player X starts');
  const [combo, setCombo] = useState<number[]>([]);
  const [playAgainst, setPlayAgainst] = useState('2nd player');
  const [xPlayed, setXPlayed] = useState(false);

  const [winningCombos, setWinningCombos] = useState<number[][]>([]);

  const makeBoard = () => {
    const arr = new Array(grid * grid).fill('');
    setGame(arr);
  };

  const generateWinningCombos = () => {
    const gridSize = grid;
    const combos: number[][] = [];

    for (let i = 0; i < gridSize; i++) {
      const row = Array.from({ length: gridSize }, (_, j) => i * gridSize + j);
      combos.push(row);
    }

    for (let i = 0; i < gridSize; i++) {
      const col = Array.from({ length: gridSize }, (_, j) => j * gridSize + i);
      combos.push(col);
    }

    const diag1 = Array.from(
      { length: gridSize },
      (_, i) => i * (gridSize + 1)
    );
    combos.push(diag1);

    const diag2 = Array.from(
      { length: gridSize },
      (_, i) => (i + 1) * (gridSize - 1)
    );
    combos.push(diag2);

    setWinningCombos(combos);
  };

  const resetGame = () => {
    makeBoard();
    setScorePlayerO(0);
    setScorePlayerX(0);
    setIsGameFinished(false);
    setCombo([]);
    setCurrentPlayer('X');
    setXPlayed(false);
    setGameMessage(`Player X starts`);
  };

  const restartGame = () => {
    makeBoard();
    setIsGameFinished(false);
    setCombo([]);
    if (playAgainst === 'CPU') {
      setGameMessage(`Player X starts`);
      setCurrentPlayer('X');
      setXPlayed(false);
    } else {
      setGameMessage(`Player ${currentPlayer} starts`);
    }
  };

  const boxClickHandler = (event: any) => {
    if (isGameFinished) {
      return;
    }
    setGameMessage('');
    if (playAgainst === '2nd player') {
      const boxIndex = +event.target.getAttribute('box-index');

      const currentBoxValue = game[boxIndex];
      if (currentBoxValue) {
        return;
      }

      const newGameValue = [...game];
      newGameValue[boxIndex] = currentPlayer;

      setGame(newGameValue);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
    if (playAgainst === 'CPU') {
      if (currentPlayer === 'X') {
        const boxIndex = +event.target.getAttribute('box-index');

        const currentBoxValue = game[boxIndex];
        if (currentBoxValue) {
          return;
        }

        const newGameValue = [...game];
        newGameValue[boxIndex] = currentPlayer;

        setXPlayed(true);
        setGame(newGameValue);
      }
      if (currentPlayer === 'O') {
        setTimeout(() => {
          const availableMoves = game
            .map((value, index) => (value === '' ? index : ''))
            .filter((index) => index !== '');

          const randomMove =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];

          const newGameValue = [...game];
          newGameValue[randomMove] = currentPlayer;

          setGame(newGameValue);
          setCurrentPlayer('X');
          setXPlayed(false);
        }, 1000);
      }
    }
  };

  const checkIfWin = () => {
    for (let i = 0; i < winningCombos.length; i++) {
      const combo = winningCombos[i];

      if (combo.every((index: number) => game[index] === 'X')) {
        setScorePlayerX((prevState) => prevState + 1);
        setGameMessage('Player X won');
        setIsGameFinished(true);
        setCombo(combo);
      } else if (combo.every((index: number) => game[index] === 'O')) {
        setScorePlayerO((prevState) => prevState + 1);
        setGameMessage('Player O won');
        setIsGameFinished(true);
        setCombo(combo);
      }
    }

    if (!game.includes('')) {
      setIsGameFinished(true);
      setGameMessage("It's a draw");
    }
  };

  /* eslint-disable */
  useEffect(() => {
    makeBoard();
    generateWinningCombos();
  }, [grid]);

  useEffect(() => {
    checkIfWin();
  }, [game]);

  useEffect(() => {
    if (currentPlayer === 'O' && playAgainst === 'CPU') {
      boxClickHandler('');
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (
      currentPlayer === 'X' &&
      playAgainst === 'CPU' &&
      combo.length === 0 &&
      xPlayed
    ) {
      setCurrentPlayer('O');
    }
  }, [xPlayed]);

  useEffect(() => {
    if (!game.includes('') && combo.length === 0) {
      setGameMessage("It's a draw");
    }
  }, [combo]);
  /* eslint-enable */

  return (
    <div className="game_container">
      <ScoreSection
        {...{
          scorePlayerO,
          scorePlayerX,
          resetGame,
          grid,
          gameMessage,
          setGrid,
          playAgainst,
          setPlayAgainst,
        }}
      />
      <div
        style={{ height: `${grid * 40}px`, width: `${grid * 40}px` }}
        className="board"
      >
        {game.map((item, index) => {
          return (
            <Box
              {...{ index, item, combo, grid, currentPlayer, playAgainst }}
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
