import * as Utils from './utils';
import Chain from './chain';

class Spider {
    constructor(position) {
        this.position = position;
        this.legs = [];

        for (let i = 0; i < 4; i++) {
            this.legs.push(new Chain(5, 75, this.position));    
        }
    }

    update(grabbableItems) {
        for (let i = 0; i < this.legs.length; i++) {
            let leg = this.legs[i];

            let closestItem = grabbableItems.reduce(function(a, b) {
                let distA = Utils.getEuclideanDistance(a, leg.getEndVector());
                let distB = Utils.getEuclideanDistance(b, leg.getEndVector());
                return distA < distB ? a : b;
            });

            leg.moveTowards(closestItem.x, closestItem.y);
        }
    }

    draw(context) {
        for (let i = 0; i < this.legs.length; i++) {
            this.legs[i].draw(context);
        }

        const radius = 30;

        context.beginPath();
        context.arc(this.position.x, this.position.y, radius, 0,  Math.PI * 2, false);
        context.fillStyle = "rgb(10, 10, 10)";
        context.fill();
    }
}

export default Spider;
