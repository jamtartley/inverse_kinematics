import Victor from 'victor';
import GravityItem from './gravity_item';
import Chain from './chain';
import Segment from './segment';

function init() {
    const frameRate = 60;
    const millisBetweenUpdate = 1000 / frameRate;

    canvas.addEventListener("mousemove", mouseMove, false);
    setInterval(update, millisBetweenUpdate);
    resize();

    context = canvas.getContext("2d");
}

function mouseMove(e) {
    currentMousePos.x = e.layerX;
    currentMousePos.y = e.layerY;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    resize();

    for (let i = 0; i < chains.length; i++) {
        let chain = chains[i];

        //chain.moveTowards(currentMousePos.x, currentMousePos.y);
        let closest = gravityItems.reduce(function(a, b) {
            let distA = getEuclideanDistance(a.position, chain.getEndVector());
            let distB = getEuclideanDistance(b.position, chain.getEndVector());
            return distA < distB ? a : b;
        });

        chain.moveTowards(closest.position.x, closest.position.y);
        chain.draw(context);
    }

    for (let i = 0; i < gravityItems.length; i++) {
        let gravityItem = gravityItems[i];
    
        gravityItem.update();
        gravityItem.draw(context);
    }
}

function getEuclideanDistance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function getChains() {
}

const segCount = 5;
const segMag = 75;

var chains = [
    new Chain(segCount, segMag, new Victor(0, 200)),
    new Chain(segCount, segMag, new Victor(0, 250)),
    new Chain(segCount, segMag, new Victor(0, 300)),
    new Chain(segCount, segMag, new Victor(0, 350)),
    new Chain(segCount, segMag, new Victor(window.innerWidth, 200)),
    new Chain(segCount, segMag, new Victor(window.innerWidth, 250)),
    new Chain(segCount, segMag, new Victor(window.innerWidth, 300)),
    new Chain(segCount, segMag, new Victor(window.innerWidth, 350)),
];
var gravityItems = [
    new GravityItem(new Victor(100, 100)),
    new GravityItem(new Victor(500, 500)),
];
var canvas = document.getElementById('canvas');
var context;
var currentMousePos = {
    x: 0,
    y: 0
};

if (canvas && canvas.getContext) {
    init();
}
