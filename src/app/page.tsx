'use client';

import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (board: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <button
      key={index}
      className="square"
      onClick={() => handleClick(index)}
      disabled={board[index] || winner}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => renderSquare(index))}
      </div>
      {winner && (
        <div className="winner">
          <h2>{`Player ${winner} Wins!`}</h2>
        </div>
      )}
      <button className="restart-button" onClick={handleRestart}>
        Restart Game
      </button>
      <div className="status">
        <h2>{`Next Player: ${isXNext ? 'X' : 'O'}`}</h2>
      </div>
    </div>
  );
}
