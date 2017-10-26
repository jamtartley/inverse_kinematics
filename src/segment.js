import Victor from 'victor';

class Segment {
    constructor(a, size, thickness) {
        this.a = a;
        this.size = size;
        this.angle = 0;
        this.b = this.getB();
        this.thickness = thickness;
    }

    getB() {
        let dx = this.size * Math.cos(this.angle); 
        let dy = this.size * Math.sin(this.angle);
        return new Victor(this.a.x + dx, this.a.y + dy);
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
