import React, { useEffect, useState } from 'react';

import Box from '../Box/Box.tsx';
import './Board.css';

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
    setGameMessage(`Player ${currentPlayer} starts`);
  };

  const restartGame = () => {
    makeBoard();
    setIsGameFinished(false);
    setCombo([]);
    setGameMessage(`Player ${currentPlayer} starts`);
  };

  const selectOpponent = (e: any) => {
    setPlayAgainst(e.target.value);
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

        setGame(newGameValue);
        setCurrentPlayer('O');
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

  const selectGridSize = (e: any) => {
    setGrid(+e.target.value);
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
    if (!game.includes('') && combo.length === 0) {
      setGameMessage("It's a draw");
    }
  }, [combo]);
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
        <div className="grid_size_container">
          <span>Choose the grid size</span>
          <select value={grid} onChange={selectGridSize}>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <span>Select your opponent</span>
          <div className="select_opponent" onChange={selectOpponent}>
            <input
              checked={playAgainst === 'CPU'}
              type="radio"
              value="CPU"
              name="opponent"
            />
            CPU
            <input
              checked={playAgainst === '2nd player'}
              type="radio"
              value="2nd player"
              name="opponent"
            />
            2nd player
          </div>
        </div>
      </div>
      <div
        style={{ height: `${grid * 40}px`, width: `${grid * 40}px` }}
        className="board"
      >
        {game.map((item, index) => {
          return (
            <Box
              {...{ index, item, combo, grid }}
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
