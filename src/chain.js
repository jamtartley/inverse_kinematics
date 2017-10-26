import Victor from 'victor';
import Segment from './segment';

class Chain {
    constructor(length) {
        this.length = length;
        this.segments = [];

        const size = 100;
        const maxThickness = 10;

        for (var i = 0; i < length; i++) {
            let parent = this.segments[i - 1];
            let parentPos = parent === undefined ? new Victor(300, 300) : parent.b.clone();
            let thickness = maxThickness * (1 - i / length);

            this.segments.push(new Segment(parentPos, size, thickness));
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
