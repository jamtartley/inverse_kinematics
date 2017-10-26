import Victor from 'victor';
import Segment from './segment';

class Chain {
    constructor(length) {
        this.length = length;
        this.segments = [];

        const size = 100;

        for (var i = 0; i < length; i++) {
            let a = new Victor(i * size, 300);
            let b = new Victor((i + 1) * size, 300);
            this.segments.push(new Segment(a, b));
        }
    }

    printSegments() {
        for (var i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            console.log(segment);
        }
    }

    draw(context) {
        for (var i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            segment.draw(context);
        }
    }
}

export default Chain;
