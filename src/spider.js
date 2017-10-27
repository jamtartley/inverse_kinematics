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
        const grabRange = 500;

        for (let i = 0; i < this.legs.length; i++) {
            let leg = this.legs[i];

            grabbableItems = grabbableItems.filter(function(item) {
                let distSquared = Utils.getEuclideanDistanceSquared(item.position, leg.getEndVector());
                return item.isAlive && distSquared <= grabRange * grabRange;
            });

            if (grabbableItems.length === 0) {
                //leg.moveTowards(this.centre.x, this.centre.y);
                leg.moveTowards(this.centre.x, this.centre.y);
                continue;
            }

            let closestItem = grabbableItems.reduce(function(a, b) {
                let distA = Utils.getEuclideanDistanceSquared(a.position, leg.getEndVector());
                let distB = Utils.getEuclideanDistanceSquared(b.position, leg.getEndVector());
                return distA < distB ? a : b;
            });

            leg.moveTowards(closestItem.position.x, closestItem.position.y);
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
