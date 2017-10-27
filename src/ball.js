import * as Utils from './utils';
import Victor from 'victor';

class Ball {
    constructor(position) {
        this.position = position;
        this.velocity = new Victor(0, 0);
        this.inverseMass = Math.random();

        const minRadius = 10;
        const maxRadius = 30;

        this.radius = maxRadius - (this.inverseMass * (maxRadius - minRadius));
    }

    update() {
        const gravity = 2;
        this.velocity.y += gravity;
        this.position.add(this.velocity);

        if (this.position.y + this.radius > window.innerHeight) {
            this.position.y = window.innerHeight - this.radius;
            this.velocity.y *= -this.inverseMass;
        }
    }

    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = "black";
        context.fill();
    }
}

export default Ball;
