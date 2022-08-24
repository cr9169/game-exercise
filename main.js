// require("dotenv").config();
import { config } from "./config.js";
import {saveRecordInLocalStorage, makeRecordsBoard} from "./localstoragehandling.js";
import { Player } from "./Player.js";
import { Obsticle } from "./Obsticle.js";
import { Coin } from "./Coin.js";
import {drawBackground, writeStartGameInstructions, writeMainGameInstructions, writeLostGameInstructions, writeScore} from "./canvasDrawing.js";
import { chooseColor, randomBreakBetweenCoins, randomBreakBetweenObsticles } from "./generators.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let colorChosen = chooseColor();

let gameEnded = false;
let globalID; 
let isFramePaused = false;

let isOnIntroductionPage = true;
let presentTime = 1100;
let obsticleSpeed = 2;
let coinSpeed = 2;
let score = 0;
let scoreToReachToIncreaseSpeed = 999;
let speedAdded = false;

let arrayOfObsticles = [];
let arrayOfCoins = [];

function generateObsticles() {
    let timeBreak = randomBreakBetweenObsticles(presentTime, presentTime);
    arrayOfObsticles.push(new Obsticle(obsticleSpeed, canvas));

    setTimeout(generateObsticles, timeBreak);
}

function obsticleCollision(square, obsticle) {
    const dummySquare = { ...square };
    const dummyObsticle = { ...obsticle };

    // for good visual collision  
    dummyObsticle.size -= config.SIZE_COLLISION; 
    dummyObsticle.x += config.COLLISION_WITH_X;
    dummyObsticle.y += config.COLLISION_WITH_Y;
 
    // s is right to o, "" "" "" left "" "", "" "" under o, "" "" above o
    return !(
            dummySquare.x > dummyObsticle.x + dummyObsticle.size ||
            dummySquare.x + dummySquare.size < dummyObsticle.x ||
            dummySquare.y > dummyObsticle.y + dummyObsticle.size ||
            dummySquare.y + dummySquare.size < dummyObsticle.y
        )
}

function generateCoins() {
    let timeBreak = randomBreakBetweenCoins(presentTime, presentTime);
    arrayOfCoins.push(new Coin(coinSpeed, canvas));

    setTimeout(generateCoins, timeBreak);
}

function coinCollision(square, coin) {
    let dummySquare = { ...square };
    let dummyCoin = { ...coin };

    // for good visual collision  
    dummyCoin.size -= config.SIZE_COLLISION; 
    dummyCoin.x += config.COLLISION_WITH_X;
    dummyCoin.y += config.COLLISION_WITH_Y;
 
    // s is right to o, "" "" "" left "" "", "" "" under o, "" "" above o
    return !(
            dummySquare.x > dummyCoin.x + dummyCoin.size ||
            dummySquare.x + dummySquare.size < dummyCoin.x ||
            dummySquare.y > dummyCoin.y + dummyCoin.size ||
            dummySquare.y + dummySquare.size < dummyCoin.y
        )
}
// Responsible for the game movement.
function animateGame() {

    globalID =  requestAnimationFrame(animateGame);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(context, canvas);
    writeMainGameInstructions(context, canvas);
    player.draw(context);
    writeScore(context, canvas, score);

    arrayOfObsticles.forEach((obsticle, index) => {
        obsticle.slide(context);

        if(obsticleCollision(player, obsticle))
        {
            cancelAnimationFrame(globalID);
            writeLostGameInstructions(context, canvas);
            gameEnded = true;
            saveRecordInLocalStorage(score);
            makeRecordsBoard(context, canvas);
        }
        
        // delete obsticles that are'nt in the frame
        if((obsticle.x + obsticle.size) <= 0)
        {
            setTimeout(() => {
                arrayOfObsticles.splice(index, 1);
            }, 0)

            score += config.JUMP_OVER_CONE_SCORE_INCREAMENT;
        }
    });

    arrayOfCoins.forEach((coin, index) => {
        coin.slide(context);

        if(coinCollision(player, coin))
        {
            setTimeout(() => {
                arrayOfCoins.splice(index, 1);
            }, 0)

            score += config.COIN_SCORE_INCREAMENT;
        }
    });


    if(score < 10000)
    {
        if(score > scoreToReachToIncreaseSpeed && speedAdded == false)
        {
            coinSpeed += 0.5;
            obsticleSpeed += 0.5;
            speedAdded = true;
            scoreToReachToIncreaseSpeed += 1000;
        }

        if(speedAdded == true && score > scoreToReachToIncreaseSpeed)
            speedAdded = false;
    }
}

// Creating the player object.
let player = new Player(20, canvas.height - 41, 10, colorChosen);

// Makes the starting page of the game.
drawBackground(context, canvas);
writeStartGameInstructions(context, canvas);

function restartGame() {

    arrayOfObsticles.splice(0,arrayOfObsticles.length);
    arrayOfCoins.splice(0,arrayOfCoins.length);
    presentTime = 1100;
    obsticleSpeed = 2;
    coinSpeed = 2;
    score = 0;
    gameEnded = false;
    colorChosen = chooseColor();
    player = new Player(20, canvas.height - 41, 10, colorChosen);
    requestAnimationFrame(animateGame);
}

window.addEventListener('keyup', event => {

    if (event.code === 'Enter' && isOnIntroductionPage == true)  
    {
        isOnIntroductionPage = false;
        event.preventDefault();
        globalID = animateGame();
        setTimeout(() => {
            generateObsticles();
        }, randomBreakBetweenObsticles(presentTime, presentTime));
        setTimeout(() => {
            generateCoins();
        }, randomBreakBetweenCoins(presentTime, presentTime));
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

    if (event.code === 'KeyR' && gameEnded == true)
    {
        restartGame();
    }
})