/* const obsticle = {
        
    width: 10,
    height: 10,
    x: 140,
    y: 140
}; */

let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

const player = StartGame();


function drawBackground() {

    let gradient = context.createLinearGradient(0, 0, 0, 150);

    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "white");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(player) {

    context.fillStyle = "blue";
    context.fillRect(player.x, player.y,
         player.width, player.height); 
}

function writeStartGameInstructions() {

    context.fillStyle = "red";
    context.font = "12px David";
    context.fillText("Press ENTER to start the game",
                     canvas.width / 4, canvas.height / 3);

}

function createPlayer() {

    const player = {
        
        width: 10,
        height: 10,
        x: 0,
        y: 140
    };

    drawPlayer(player);

    return player;

}

// TODO: finish the function,
// it doesnt actually makes the game movement.
function StartGame() {
    
    let player;

    drawBackground();
    writeStartGameInstructions();
    
    // if space key got pressed then start game;
    window.addEventListener('keyup', event => {
        if (event.code === 'Space')  
        {
            event.preventDefault();
            context.clearRect(0, 0, canvas.width, canvas.height)
            player = setStartingCanvas();
        }
    })

    return player;
}

function setStartingCanvas() {

    drawBackground();
    const player = createPlayer();

    return player;
}


