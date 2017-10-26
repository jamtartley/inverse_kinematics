import Victor from 'victor';
import Segment from './segment';

class Chain {
    constructor(length) {
        this.length = length;
        this.segments = [];

        const magnitude = 100;
        const maxThickness = 10;

        for (var i = 0; i < length; i++) {
            let parent = this.segments[i - 1];
            let parentPos = parent === undefined ? new Victor(300, 300) : parent.b.clone();
            let thickness = maxThickness * (1 - i / length);

            this.segments.push(new Segment(parentPos, magnitude, thickness));
        }
    }

    printSegments() {
        for (var i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            console.log(segment);
        }
    }

    moveTowards(x, y) {
        for (var i = this.segments.length - 1; i >= 0; i--) {
            let segment = this.segments[i];
            let child = this.segments[i + 1];
            let target = child === undefined ? new Victor(x, y) : child.a.clone();

            segment.moveTowards(target.x, target.y);
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
