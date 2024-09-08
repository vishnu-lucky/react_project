import { useState } from 'react';


function Cell({ symbol, onClickCell }) {
  return (
    <button className="cell" onClick={onClickCell}>
      {symbol}
    </button>
  );
}

function GameBoard({ isXNext, grid, handlePlay }) {
  function handleCellClick(index) {
    if (checkWinner(grid) || grid[index]) {
      return;
    }
    const updatedGrid = grid.slice();
    updatedGrid[index] = isXNext ? 'X' : 'O';
    handlePlay(updatedGrid);
  }

  const winner = checkWinner(grid);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Cell symbol={grid[0]} onClickCell={() => handleCellClick(0)} />
        <Cell symbol={grid[1]} onClickCell={() => handleCellClick(1)} />
        <Cell symbol={grid[2]} onClickCell={() => handleCellClick(2)} />
      </div>
      <div className="board-row">
        <Cell symbol={grid[3]} onClickCell={() => handleCellClick(3)} />
        <Cell symbol={grid[4]} onClickCell={() => handleCellClick(4)} />
        <Cell symbol={grid[5]} onClickCell={() => handleCellClick(5)} />
      </div>
      <div className="board-row">
        <Cell symbol={grid[6]} onClickCell={() => handleCellClick(6)} />
        <Cell symbol={grid[7]} onClickCell={() => handleCellClick(7)} />
        <Cell symbol={grid[8]} onClickCell={() => handleCellClick(8)} />
      </div>
    </>
  );
}

export default function GameContainer() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const isXNext = stepNumber % 2 === 0;
  const currentGrid = history[stepNumber];

  function handleGamePlay(updatedGrid) {
    const updatedHistory = [...history.slice(0, stepNumber + 1), updatedGrid];
    setHistory(updatedHistory);
    setStepNumber(updatedHistory.length - 1);
  }

  function goToMove(move) {
    setStepNumber(move);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
  }

  const moves = history.map((grid, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={() => goToMove(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game-container">
      <div className="game-board">
        <GameBoard isXNext={isXNext} grid={currentGrid} handlePlay={handleGamePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

function checkWinner(grid) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a];
    }
  }
  return null;
}
