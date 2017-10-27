import * as Utils from './utils';
import Chain from './chain';

class Spider {
    constructor(centre) {
        this.centre = centre;
        this.legs = [];
        this.radius = 30;

        const legCount = 8;
        const legSpread = 360;
        const betweenLeg = legSpread / legCount;

        for (let i = 0; i < legCount; i++) {
            let position = Utils.getPointOnCircle(centre, this.radius, i * betweenLeg); 
            this.legs.push(new Chain(5, 75, position));    
        }
    }

    update(grabbableItems) {
        for (let i = 0; i < this.legs.length; i++) {
            let leg = this.legs[i];

            let closestItem = grabbableItems.reduce(function(a, b) {
                let distA = Utils.getEuclideanDistanceSquared(a, leg.getEndVector());
                let distB = Utils.getEuclideanDistanceSquared(b, leg.getEndVector());
                return distA < distB ? a : b;
            });

            leg.moveTowards(closestItem.x, closestItem.y);
        }
    }

    draw(context) {
        for (let i = 0; i < this.legs.length; i++) {
            this.legs[i].draw(context);
        }

        // Slightly larger to cover legs
        const bodyMaskSize = this.radius * 1.5;

        context.beginPath();
        context.arc(this.centre.x, this.centre.y, bodyMaskSize, 0,  Math.PI * 2, false);
        context.fillStyle = "rgb(10, 10, 10)";
        context.fill();
    }
}

export default Spider;
