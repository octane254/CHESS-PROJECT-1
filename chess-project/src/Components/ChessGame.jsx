import { useCallback, useState } from 'react';
import { Chess } from 'chess.js'; // Import the chess.js library
import ChessBoard from './Board';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initialize a new Chess game
  const [moveLog, setMoveLog] = useState([]); // State to keep track of the move log
}


// Returns the current status of the chess game as a string
const getGameStatus = () => {
  // If the game is over, determine the reason
  if (game.isGameOver()) {
    // If it's checkmate
    if (game.isCheckmate()) {
      return "Checkmate!";
    }
    // If it's a draw
    if (game.isDraw()) {
      return "Draw!";
    }
    // If it's stalemate
    if (game.isStalemate()) {
      return "Stalemate!";
    }
    // Generic game over
    return "Game Over!";
  }
  // If the current player is in check
  if (game.inCheck()) {
    return "Check!";
  }
  // Otherwise, indicate whose turn it is
  return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
};

const resetGame = () => {
  setGame(new Chess()); // Reset the game to a new instance
  setMoveLog([]); // Clear the move log
};


const [selectedSquare, setSelectedSquare] = useState(null);

// Handles when a square is clicked
const handleSquareClick = useCallback(
  (square) => {
    if (selectedSquare) {
      // Try to make the move
      const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
      if (move) {
        setGame(new Chess(game.fen())); // Update game state
        setMoveLog([...moveLog, move]);
        setSelectedSquare(null);
      } else {
        // Invalid move, reset selection or select new square
        setSelectedSquare(game.get(square) ? square : null);
      }
    } else {
      // Select the square if it has a piece of the current turn
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    }
  },
  [game, selectedSquare, moveLog]
);

return (
  <div>
    <ChessBoard
      position={game.fen()}
      onSquareClick={handleSquareClick}
      selectedSquare={selectedSquare}
      lastMove={moveLog.length > 0 ? moveLog[moveLog.length - 1] : null}
    />
    <div>{getGameStatus()}</div>
    <button onClick={resetGame}>Reset Game</button>
    <div>
      <h4>Move Log</h4>
      <ol>
        {moveLog.map((move, idx) => (
          <li key={idx}>{move.san}</li>
        ))}
      </ol>
    </div>
  </div>
);


export default ChessGame;