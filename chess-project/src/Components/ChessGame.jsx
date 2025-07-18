import { useCallback, useState } from 'react';
import { Chess } from 'chess.js'; // Import the chess.js library
import ChessBoard from './Board';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initialize a new Chess game
  const [moveLog, setMoveLog] = useState([]); // State to keep track of the move log
  const [selectedSquare, setSelectedSquare] = useState(null); // Track selected square

  // Returns the current status of the chess game as a string
  const getGameStatus = () => {
    if (game.game_over()) {
      if (game.in_checkmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.in_stalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.in_check()) return "Check!";
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
  };

  // Reset the game to a new instance
  const resetGame = () => {
    setGame(new Chess());
    setMoveLog([]);
    setSelectedSquare(null);
  };

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
};

export default ChessGame;