const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// let's create a function to initilized the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){

    let answer = "";

    winningPosition.forEach((position) =>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[0]] === gameGrid[position[2]])){
                //check if winner is X
                if(gameGrid[position[0]] === "X"){
                    answer= "X";
                }
                else{
                    answer = "O"
                }

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }

    });
    

    // if ans is non empty
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return ;
    }

    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        gameInfo.innerText = `Match Tied`;
        newGameBtn.classList.add("active");
        return ;
    }


    
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = "none";
        //swap karo 
        swapTurn();

        // check anyone win
        checkGameOver();

    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);