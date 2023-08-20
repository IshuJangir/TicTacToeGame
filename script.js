const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


let currentPlayer;
let gameGrid;



const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];    

// lets create a function to intiallize the game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";    
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`;

    // ui pr bhi khali kro
}

initGame();


boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})


function handleClick(index){
    if (gameGrid[index] ===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // now swap turn
        swapTurn();

        //check koi jeet to nhi gya

        checkGameOver();
    }

}
function swapTurn(){
    if (currentPlayer === 'X'){
        currentPlayer='O';
    }

    else{
        currentPlayer='X';
    }

    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

newGameBtn.addEventListener('click',initGame);


function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        // position are 8 and inside position we are talking about
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!== "" )&& (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            // disable pointer event after a successfull winner
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })


    if(answer!==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }


    // leta check for the tie

    let fillerCount = 0;

    gameGrid.forEach((box)=>{
        if(box !==""){
            fillerCount++;
        }
    });

    if(fillerCount=== 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}



