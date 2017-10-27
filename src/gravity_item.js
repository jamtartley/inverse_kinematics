import Victor from 'victor';

class GravityItem {
    constructor(position) {
        this.position = position;
        this.velocity = new Victor(8, 0);
    }

    update() {
        const gravity = 20;
        this.velocity.y += gravity * 1 / 60;
        this.position.add(this.velocity);

        if (this.position.x < 0 || this.position.x > window.innerWidth) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > window.innerHeight) {
            this.velocity.y *= -1;
        }
    }

    draw(context) {
        const radius = 20;

        context.beginPath();
        context.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
    }
}

export default GravityItem;
