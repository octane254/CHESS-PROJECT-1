import { useCallback, useState } from 'react';
import { Chess } from 'chess.js';

const useChessGame = () => {
  const [game] = useState(() => new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fen, setFen] = useState(game.fen());

  // Get current game status
  const getGameStatus = useCallback(() => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.inCheck()) return "Check!";
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
  }, [game]);

  // Reset game to initial state
  const resetGame = useCallback(() => {
    game.reset();
    setMoveLog([]);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setFen(game.fen());
  }, [game]);

  // Make a move on the board
  const makeMove = useCallback((move) => {
    try {
      const result = game.move(move);
      if (result) {
        setMoveLog(prev => [...prev, result]);
        setFen(game.fen());
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }, [game]);

  // Handle square clicks
  const handleSquareClick = useCallback((square) => {
    // Clicking the same square again deselects it
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    const piece = game.get(square);

    // If a square is already selected, try to move
    if (selectedSquare) {
      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q' // Always promote to queen for simplicity
      };

      if (makeMove(move)) {
        // Successful move
        setSelectedSquare(null);
        setPossibleMoves([]);
      } else {
        // Failed move - select new piece if it's the current player's
        if (piece && piece.color === game.turn()) {
          setSelectedSquare(square);
          setPossibleMoves(
            game.moves({ 
              square, 
              verbose: true 
            }).map(m => m.to)
          );
        } else {
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      }
    } 
    // If no square selected yet, select if it's the current player's piece
    else if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      setPossibleMoves(
        game.moves({ 
          square, 
          verbose: true 
        }).map(m => m.to)
      );
    }
  }, [game, selectedSquare, makeMove]);

  return {
    fen,
    moveLog,
    selectedSquare,
    possibleMoves,
    gameStatus: getGameStatus(),
    handleSquareClick,
    resetGame,
    makeMove,
    isGameOver: game.isGameOver(),
    turn: game.turn(),
    getGameStatus // Added this in case you need it separately
  };
};

export default useChessGame;