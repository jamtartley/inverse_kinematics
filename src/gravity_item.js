import * as Utils from './utils';
import Victor from 'victor';

class GravityItem {
    constructor(position) {
        this.position = position;
        this.velocity = new Victor(Utils.getRandIntBetween(4, 8), Utils.getRandIntBetween(4, 8));
        this.radius = 10;
        this.diameter = this.radius * 2;
    }

    fixOutOfBounds() {
        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }
        if (this.position.x + this.radius > window.innerWidth) {
            this.position.x = window.innerWidth - this.radius;
            this.velocity.x *= -1;
        }

        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }
        if (this.position.y + this.radius > window.innerHeight) {
            this.position.y = window.innerHeight - this.radius;
            this.velocity.y *= -1;
        }
    }

    update() {
        this.fixOutOfBounds();
        this.position.add(this.velocity);
    }

    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
    }
}

export default GravityItem;
