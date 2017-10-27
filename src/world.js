import Victor from 'victor';
import GravityItem from './gravity_item';
import Chain from './chain';
import Segment from './segment';

function init() {
    const frameRate = 60;
    const millisBetweenUpdate = 1000 / frameRate;

    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mousedown", mouseDown, false);
    setInterval(update, millisBetweenUpdate);
    resize();

    context = canvas.getContext("2d");
}

function mouseMove(e) {
    currentMousePos.x = e.x;
    currentMousePos.y = e.y;
}

function mouseDown(e) {
    spawnGravityItem(e.x, e.y);
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
        let closest = currentMousePos;

        if (gravityItems.length !== 0) {
            let closestItem = gravityItems.reduce(function(a, b) {
                let distA = getEuclideanDistance(a.position, chain.getEndVector());
                let distB = getEuclideanDistance(b.position, chain.getEndVector());
                return distA < distB ? a : b;
            });

            closest = closestItem.position;
        }

        chain.moveTowards(closest.x, closest.y);
        chain.draw(context);
    }

    for (let i = 0; i < gravityItems.length; i++) {
        let gravityItem = gravityItems[i];
    
        gravityItem.update();
        gravityItem.draw(context);
    }
}

function spawnGravityItem(x, y) {
    gravityItems.push(new GravityItem(new Victor(x, y)));
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
];
var canvas = document.getElementById('canvas');
var context;
var currentMousePos = new Victor(0, 0);

if (canvas && canvas.getContext) {
    init();
}
