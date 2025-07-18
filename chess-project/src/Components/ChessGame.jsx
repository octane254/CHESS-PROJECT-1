import { useCallback, useState } from 'react';
import { Chess } from 'chess.js'; // Import the chess.js library
import ChessBoard from './Board';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initialize a new Chess game
}

export default ChessGame;