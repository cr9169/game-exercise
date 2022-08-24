import { config } from "./config.js";
const coneImage = new Image();
coneImage.src = 'images/cone.png';

export class Obsticle {
    constructor(speed, canvas)
    {
        this.size = 7;
        this.x = canvas.width + this.size;
        this.y = canvas.height - config.OBSTICLE_HEIGHT_FROM_BOTTOM;
        this.speed = speed;
    }

    draw(context) {
        context.drawImage(coneImage, this.x, this.y, this.size, this.size);
    }
    
    slide(context) {
        this.draw(context);
        this.x -= this.speed;
    }
}