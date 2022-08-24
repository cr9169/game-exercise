import { config } from "./config.js";
const coinImage = new Image();
coinImage.src = 'images/coin.png';

export class Coin {
    constructor(speed, canvas)
    {
        this.size = 7;
        this.x = canvas.width + this.size;
        this.y = canvas.height - config.COIN_HEIGHT_FROM_BOTTOM;
        this.speed = speed;
    }

    draw(context) {
        context.drawImage(coinImage, this.x, this.y, this.size, this.size);
    }
    
    slide(context) {
        this.draw(context);
        this.x -= this.speed;
    }
}