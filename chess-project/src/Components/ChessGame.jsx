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

export default ChessGame;