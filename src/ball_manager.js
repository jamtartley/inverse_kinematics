import Victor from 'victor';
import Ball from './ball';

class BallManager {
    constructor() {
        this.balls = [];
    }

    addBall(x, y) {
        this.balls.push(new Ball(new Victor(x, y)));
    }

    update() {
        const timeAllowedDead = 1500;

        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            ball.update();

            if (ball.isAlive === false) {
                ball.alpha = 1 - (ball.timeDead / timeAllowedDead); 
                if (ball.timeDead >= timeAllowedDead) {
                    this.balls.splice(this.balls.indexOf(ball), 1);
                }
            }
        }
    }

    draw(context) {
        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            ball.draw(context);
        }
    }
}

export default BallManager;
