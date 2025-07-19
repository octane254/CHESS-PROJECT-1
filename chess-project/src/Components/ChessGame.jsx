import { useCallback, useState } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './Board';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.inCheck()) return "Check!";
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveLog([]);
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  const handleSquareClick = useCallback(
    (square) => {
      if (selectedSquare === square) {
        // Deselect if clicking the same square
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      const piece = game.get(square);

      if (selectedSquare) {
        // Try to make the move
        const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
        if (move) {
          setGame(new Chess(game.fen()));
          setMoveLog([...moveLog, move]);
          setSelectedSquare(null);
          setPossibleMoves([]);
        } else {
          // Invalid move, select new square if it has a piece of current turn
          if (piece && piece.color === game.turn()) {
            setSelectedSquare(square);
            setPossibleMoves(game.moves({ square, verbose: true }).map(m => m.to));
          } else {
            setSelectedSquare(null);
            setPossibleMoves([]);
          }
        }
      } else {
        // Select the square if it has a piece of the current turn
        if (piece && piece.color === game.turn()) {
          setSelectedSquare(square);
          setPossibleMoves(game.moves({ square, verbose: true }).map(m => m.to));
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
        possibleMoves={possibleMoves}
        lastMove={moveLog.length > 0 ? moveLog[moveLog.length - 1] : null}
      />
      <div>{getGameStatus()}</div>
      <button
        onClick={resetGame}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          margin: '12px 0',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Reset Game
      </button>
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