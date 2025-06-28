"use client";

import { useState } from "react";

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
    newBoard[index] = isXNext ? "X" : "O";
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
      className="w-24 h-24 text-2xl font-semibold flex justify-center items-center bg-gray-200 border border-gray-400 rounded-md cursor-pointer disabled:bg-gray-300"
      onClick={() => handleClick(index)}
      disabled={board[index] || winner}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {Array(9)
          .fill(null)
          .map((_, index) => renderSquare(index))}
      </div>
      {winner && (
        <div className="mt-4 text-xl font-semibold text-green-500">
          {`Player ${winner} Wins!`}
        </div>
      )}
      <button
        className="mt-6 py-2 px-4 text-lg bg-green-500 text-white font-semibold rounded-md hover:bg-green-400"
        onClick={handleRestart}
      >
        Restart Game
      </button>
      <div className="mt-4 text-xl">
        {`Next Player: ${isXNext ? "X" : "O"}`}
      </div>
    </div>
  );
}
