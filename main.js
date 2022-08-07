const coneImage = new Image();
coneImage.src = 'images/cone.png';

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const arrayOfPlayerColors = ['blue', 'green', 'red', 'pink',
                            'yellow', 'purple', 'brown', 'magenta',
                            'lime', 'blanchedalmond'];

const colorChosen = chooseColor();

let globalID; 
let isFramePaused = false;

// let jumpVoice = new Audio("https://archive.org/download/jump_20210424/jump.wav");
let isOnIntroductionPage = true;
let presentTime = 1200;
let obsticleSpeed = 2;

arrayOfObsticles = [];

class Player{

    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color; // maybe put an option to set square color
        this.jumpHeight = 3; 
        this.shouldBeJumping = false;
        this.jumpCounter = 0;
        // 0 = no spin
        this.spin = 0
        // spin of 90 degrees in 32 frames
        // stroes the current rotation of the player
        this.spinIncrement = 90 / 32;
    }

    // rotate the square 
    rotation() {
        // square's center point x and y
        let xPossition = this.x + this.size / 2;
        let yPossition = this.y + this.size / 2;
        // moves the canvas origin to the square center to make it
        // spin around itself.
        context.translate(xPossition, yPossition);
        // dividion for from desrees to radians
        context.rotate(this.spin * Math.PI / 180);
        context.rotate(this.spinIncrement * Math.PI / 180);
        // moves the canvas origin back to normal
        context.translate(-xPossition, -yPossition);
        this.spin += this.spinIncrement;
    }

    // unrotate the square 
    rotateBack() {
        let xPossition = this.x + this.size / 2;
        let yPossition = this.y + this.size / 2;
        context.translate(xPossition, yPossition);
        // rotate the player back 
        context.rotate(-this.spin * Math.PI / 180);
        context.translate(-xPossition, -yPossition);
    }

    jump() {

        if(this.shouldBeJumping) {
            this.jumpCounter++;
    
            if(this.jumpCounter < 15) {
                this.y -= this.jumpHeight;
                // this.x += this.jumpHeight;
            }

            else if(this.jumpCounter > 14 && this.jumpCounter < 19) {
                this.y += 0;
            }

            else if(this.jumpCounter < 33) {
                this.y += this.jumpHeight;
            }

            this.rotation();

            if(this.jumpCounter >= 32) {

                // makes that when we would like to rotate the square 
                // another time, it woukd start the rorate calculations
                // from an unrotated posision as we started with.
                this.rotateBack();
                this.spin = 0;
                this.shouldBeJumping = false;
            }
        }
    }

    draw() {

        this.jump();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size); 

        if(this.shouldBeJumping)
            this.rotateBack();
    }

}

class Obsticle {
    constructor(size, speed)
    {
        this.x = canvas.width + size;
        this.y = canvas.height - 38;
        this.size = size;
        this. color = "black";
        this.speed = speed;
    }

    draw() {

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size); 
    }
    
    slide() {
        this.draw();
        this.x -= this.speed;
    }
}

function generateObsticles() {
    let timeBreak = randomBreakBetweenObsticles(presentTime);
    arrayOfObsticles.push(new Obsticle(7, obsticleSpeed));

    setTimeout(generateObsticles, timeBreak);
}

function collision(square, obsticle) {
    let dummySquare = Object.assign(Object.create(Object.getPrototypeOf(square)), square);
    let dummyObsticle = Object.assign(Object.create(Object.getPrototypeOf(obsticle)), obsticle);

    // for good visual collision rather than actual point to point
    dummyObsticle.size -= 10; 
    dummyObsticle.x += 10;
    dummyObsticle.y += 10;
 
    // s is right to o, "" "" "" left "" "", "" "" under o, "" "" above o
    return !(
            dummySquare.x > dummyObsticle.x + dummyObsticle.size ||
            dummySquare.x + dummySquare.size < dummyObsticle.x ||
            dummySquare.y > dummyObsticle.y + dummyObsticle.size ||
            dummySquare.y + dummySquare.size < dummyObsticle.y
        )
}

// Responsible for make the background.
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

// Responsible for the game movement.
function animateGame() {

    globalID =  requestAnimationFrame(animateGame);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    writeMainGameInstructions()
    player.draw();

    arrayOfObsticles.forEach((obsticle, index) => {
        obsticle.slide();

        if(collision(player, obsticle))
        {
            console.log("fsdfsdf");
            cancelAnimationFrame(globalID);
        }
        // delete obsticles that are'nt in the 
        if((obsticle.x + obsticle.size) <= 0)
        {
            setTimeout(() => {
                arrayOfObsticles.splice(index, 1);
            }, 0)
        }
    });
}

function chooseColor()
{
    const colorsArrayIndex = Math.floor(Math.random() * 10);

    const colorChosen = arrayOfPlayerColors[colorsArrayIndex];

    return colorChosen;
}

function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function randomBreakBetweenObsticles(breakTime) {
    let time = breakTime;
    if(Math.random() < 0.5)
    {
        time += generateNumber(presentTime / 3, presentTime * 1.5);
    }
    else 
    {
        time -= generateNumber(presentTime / 5, presentTime / 2);
    }
    
    return time;
}

// Creating the player object.
const player = new Player(20, canvas.height - 41, 10, colorChosen);

// Makes the starting page of the game.
drawBackground();
writeStartGameInstructions();


window.addEventListener('keyup', event => {

    if (event.code === 'Enter' && isOnIntroductionPage == true)  
    {
        isOnIntroductionPage = false;
        event.preventDefault();
        globalID = animateGame();
        setTimeout(() => {
            generateObsticles();
        }, randomBreakBetweenObsticles(presentTime));
    }

    if (event.code === 'Space' && isOnIntroductionPage == false)  
    {
        if(!player.shouldBeJumping) {
            // jumpVoice.play(); - add real music file (above)!!!
            player.jumpCounter = 0;
            player.shouldBeJumping = true;
        }
    }

    if (event.code === 'Escape' && isFramePaused == false)  
    { 
        isFramePaused = true;
        cancelAnimationFrame(globalID);
    }

    if (event.code === 'ShiftLeft' && isFramePaused == true)
    {
        isFramePaused = false;
        globalID = requestAnimationFrame(animateGame);
    }
})