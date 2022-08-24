/*const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// Responsible for making the background.
function drawBackground() {

    const gradient = context.createLinearGradient(0, 0, 0, 150);

    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "white");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(0, 120);
    context.lineTo(300, 120);
    context.strokeStyle = "black";
    context.stroke();
}

// Responsible for the pressing spagce to "swich pages" instruction. 
function writeStartGameInstructions() {


    context.fillStyle = "red";
    context.font = "12px David";
    context.fillText("Press   ENTER   key  to  start  the  game",
                     canvas.width / 5, canvas.height / 3);

}

function writeMainGameInstructions() {


    context.fillStyle = "red";
    context.font = "9px David";
    context.fillText("ESCAPE  -  PAUSE GAME                     LEFT SHIFT  -  CONTINUE GAME",
                     canvas.width / 30, canvas.height / 20);

}

function writeLostGameInstructions() {


    context.fillStyle = "black";
    context.font = "15px David";
    context.fillText("TYPE    `R`    TO  RESTART  THE  GAME",
                     canvas.width / 15, canvas.height / 3);

}

function writeScore() {
    context.font = "8px David";
    context.fillStyle = "red";
    context.fillText(score, canvas.width / 2, canvas.height / 6);
}

*/