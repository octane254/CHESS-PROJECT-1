import { useState,useEffect } from "react"
import "../Css/board.css"

function ChessBoard (){
    
    // Arrays for the files and ranks in chess
    
    const rows = [8,7,6,5,4,3,2,1]

    const columns =["a","b","c","d","e","f","g","h"]

    const [pieces, setPieces] =useState({}) // initial state is an empty object 

    // for positioning the the pieces in the board 

    useEffect(()=>{

        // an empty object to store the pieces

        const initialPieces = {}
        const backRow=["rook","knight","bishop","queen","king","bishop", "knight","rook"]  // An array to organise the 8th and 1st ranks


        // create a loop to place blue pieces in their required tiles  

        columns.forEach((col,i) => {

            initialPieces[`${col}8`] = `blue-${backRow[i]}`
            initialPieces[`${col}7`] = `blue-pawn`


        })
        
            // create a loop to place white pieces in their required tiles  

        columns.forEach((col,i) => {

            initialPieces[`${col}1`] = `white-${backRow[i]}`
            initialPieces[`${col}2`] = `white-pawn`


        })     
        
        setPieces(initialPieces)

    },[])

    // tiles are going to be added in the empty Array 

    let board = []

    // Loop to generate the tiles
    
    for (let i=0; i<rows.length; i++){
        for(let j=0; j<columns.length; j++){

            
            const tilecolors = (i+j)%2
            const position = `${columns[j]}${rows[i]}`
            
            // store tileclass variable as undifined to allow the tiles to be looped in different colors in the board 

            let tileclass;

            if(tilecolors === 0){

                tileclass = "white-color"  // To Add the class in css to display a white tile 
            }
            else{

                tileclass = "blue-color" // To Add class in css to display a blue tile 
            }

            // Add Tiles to the board 

            board.push(

                <div

                key={position}
                className={`tile ${tileclass}`}

                >

                [{position}]

                </div>

            )

        }
    }

        return (

            <div className="chessBoard">
                {board}
            </div>
        )



}

export default ChessBoard