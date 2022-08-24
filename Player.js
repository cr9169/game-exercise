import { config } from "./config.js";
export class Player{

    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color; 
        this.jumpHeight = 3; 
        this.shouldBeJumping = false;
        this.jumpCounter = 0;
        // 0 = no spin
        this.spin = 0
        // spin of 90 degrees in 32 frames
        // stroes the current rotation of the player
        this.spinIncrement = config.SPIN_DEGREES / config.FRAMES;
    }

    // rotate the square 
    rotation(context) {
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
    rotateBack(context) {
        let xPossition = this.x + this.size / 2;
        let yPossition = this.y + this.size / 2;
        context.translate(xPossition, yPossition);
        // rotate the player back 
        context.rotate(-this.spin * Math.PI / 180);
        context.translate(-xPossition, -yPossition);
    }

    jump(context) {

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

            this.rotation(context);

            if(this.jumpCounter >= 32) {

                // makes that when we would like to rotate the square 
                // another time, it woukd start the rorate calculations
                // from an unrotated posision as we started with.
                this.rotateBack(context);
                this.spin = 0;
                this.shouldBeJumping = false;
            }
        }
    }

    draw(context) {

        this.jump(context);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size); 

        if(this.shouldBeJumping)
            this.rotateBack(context);
    }

}

