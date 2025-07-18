import whitePawn from '../assets/wp (1).png';
import whiteKnight from '../assets/wn (1).png';
import whiteQueen from '../assets/wq (1).png';
import whiteBishop from '../assets/wb (1).png';
import whiteRook from '../assets/wr (1).png';
import whiteKing from '../assets/wk (1).png';
import bluePawn from '../assets/bp (1).png';
import blueKnight from "../assets/bn (1).png";
import blueQueen from '../assets/bq (1).png';
import blueBishop from '../assets/bb (1).png';
import blueRook from '../assets/br (1).png';
import blueKing from '../assets/bk (1).png';


// Adding pieces as a prop
function ChessPieces ({piece}){

    // store all the images in an object 

    const pieceImages={
        "white-pawn": whitePawn,
        "white-knight": whiteKnight,
        "white-queen":whiteQueen,
        "white-bishop":whiteBishop,
        "white-rook":whiteRook,
        "white-king":whiteKing ,
        "blue-pawn":bluePawn,
        "blue-knight":blueKnight,
        "blue-queen":blueQueen,
        "blue-bishop":blueBishop,
        "blue-rook":blueRook,
        "blue-king":blueKing ,

    }

    return (

        piece && <img

        src={pieceImages[piece]}
        alt={piece} 
        
        />
    )


}

export default ChessPieces