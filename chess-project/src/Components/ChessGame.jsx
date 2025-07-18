import { useCallback, useState } from 'react';
import { Chess } from 'chess.js'; // Import the chess.js library
import ChessBoard from './Board';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initialize a new Chess game
  const [moveLog, setMoveLog] = useState([]); // State to keep track of the move log
}

export default ChessGame;