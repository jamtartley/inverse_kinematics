import Victor from 'victor';

class Segment {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.a.x, this.a.y);
        context.lineTo(this.b.x, this.b.y);
        context.strokeStyle = "white";
        context.lineWidth = 8;
        context.stroke();
    }
}

export default Segment;
