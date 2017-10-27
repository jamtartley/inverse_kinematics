import * as Utils from './utils';
import Victor from 'victor';

class GravityItem {
    constructor(position) {
        this.position = position;
        this.velocity = new Victor(Utils.getRandIntBetween(4, 8), 0);
        this.radius = 20;
    }

    update() {
        if (this.position.x - this.radius < 0 || this.position.x + this.radius > window.innerWidth) {
            this.velocity.x *= -1;
        }

        if (this.position.y - this.radius < 0 || this.position.y + this.radius > window.innerHeight) {
            this.velocity.y *= -1;
        }

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
