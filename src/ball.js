import * as Utils from './utils';
import Victor from 'victor';

class Ball {
    constructor(position) {
        this.position = position;
        this.velocity = new Victor(Utils.getRandIntBetween(-16, 16), Utils.getRandIntBetween(-32, -8));
        this.previousVelocity = this.velocity.clone();
        this.inverseMass = Math.random();
        this.isAlive = true;
        this.timeDead = 0;
        this.alpha = 1;

        const minRadius = 5;
        const maxRadius = 40;

        this.radius = maxRadius - (this.inverseMass * (maxRadius - minRadius));
    }

    update() {
        const gravity = 1.5;
        const friction = 0.95;
        this.velocity.y += gravity;
        this.position.add(this.velocity);

        if (this.position.y + this.radius > window.innerHeight) {
            this.position.y = window.innerHeight - this.radius;
            this.velocity.x *= friction;
            this.velocity.y *= -this.inverseMass;
        }

        // Get the change in velocity between frames.
        // If it's some arbitrarily small amount, we've
        // hit the deck and stopped moving
        let deltaVel = Math.abs(this.previousVelocity.y - this.velocity.y);
        this.isAlive = deltaVel > 0.1;

        if (this.isAlive === false) {
            this.timeDead += 1000 / 60;
        }

        this.previousVelocity = this.velocity.clone();
    }

    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
        context.fill();
    }
}

export default Ball;
