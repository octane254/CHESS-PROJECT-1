function ChessBoard (){
    
    // Arrays for the files and ranks in chess
    
    const rows = [1,2,3,4,5,6,7,8]

    const columns =["a","b","c","d","e","f","g","h"]

    // tiles are going to be added in the empty Array 

    let board = []

    // Loop to generate the tiles
    
    for (let i=0; i<rows.length; i++){
        for(let j=0; j<columns.length; j++){

            
            const tilecolors = (i+j)%2
            const position = `${columns[j]} ${rows[i]}`
            
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

                [{columns[j]}{rows[i]}]

                </div>

            )

        }
    }

        return (

            <div>
                {board}
            </div>
        )



}

export default ChessBoard