import React from 'react';

type ScoreSectionProps = {
  scorePlayerO: number;
  scorePlayerX: number;
  resetGame(): void;
  gameMessage: string;
  grid: number;
  playAgainst: string;
  setGrid(grid: number): void;
  setPlayAgainst(opponent: string): void;
};

const ScoreSection = ({
  scorePlayerO,
  scorePlayerX,
  resetGame,
  gameMessage,
  grid,
  playAgainst,
  setGrid,
  setPlayAgainst,
}: ScoreSectionProps) => {
  const selectGridSize = (e: any) => {
    setGrid(+e.target.value);
    resetGame();
  };

  const changeOpponent = (opponent: string) => {
    setPlayAgainst(opponent);
    resetGame();
  };
  return (
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
        <div className="select_opponent">
          <input
            checked={playAgainst === 'CPU'}
            onChange={() => changeOpponent('CPU')}
            type="radio"
            value="CPU"
            name="opponent"
          />
          CPU
          <input
            checked={playAgainst === '2nd player'}
            onChange={() => changeOpponent('2nd player')}
            type="radio"
            value="2nd player"
            name="opponent"
          />
          2nd player
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;
