import { config } from "./config.js";
const arrayOfPlayerColors = ['blue', 'green', 'red', 'pink',
                            'yellow', 'purple', 'brown', 'mageSnta',
                            'lime', 'blanchedalmond'];

function chooseColor()
{
    const colorsArrayIndex = Math.floor(Math.random() * 10);

    const colorChosen = arrayOfPlayerColors[colorsArrayIndex];

    return colorChosen;
}

function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function randomBreakBetweenObsticles(breakTime, presentTime) {
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

function randomBreakBetweenCoins(breakTime, presentTime) {
    let time = breakTime;
    if(Math.random() < 0.5)
    {
        time += generateNumber(presentTime / 3, presentTime * 4.5);
    }
    else 
    {
        time += generateNumber(presentTime / 10, presentTime / 2);
    }
    
    return time;
}

export {chooseColor, generateNumber, randomBreakBetweenCoins, randomBreakBetweenObsticles};