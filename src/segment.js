import Victor from 'victor';

class Segment {
    constructor(a, magnitude, thickness) {
        this.a = a;
        this.magnitude = magnitude;
        this.angle = 0;
        this.b = this.getB();
        this.thickness = thickness;
    }

    anchorTo(x, y) {
        this.a = new Victor(x, y);
        this.b = this.getB();
    }

    getB() {
        let dx = this.magnitude * Math.cos(this.angle); 
        let dy = this.magnitude * Math.sin(this.angle);
        return new Victor(this.a.x + dx, this.a.y + dy);
    }

    moveTowards(x, y) {
        let target = new Victor(x, y);
        let dir = new Victor(target.x - this.a.x, target.y - this.a.y);

        this.angle = Math.atan2(dir.y, dir.x);
        dir.x = dir.x * this.magnitude / dir.magnitude();
        dir.y = dir.y * this.magnitude / dir.magnitude();
        
        dir.multiply(new Victor(-1, -1));
        this.a.x = target.x + dir.x;
        this.a.y = target.y + dir.y;
        this.b = this.getB();
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.a.x, this.a.y);
        context.lineTo(this.b.x, this.b.y);
        context.strokeStyle = "white";
        context.lineWidth = this.thickness;
        context.stroke();
    }
}

export default Segment;
