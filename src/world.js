import Victor from 'victor';
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

        chain.moveTowards(currentMousePos.x, currentMousePos.y);
        chain.draw(context);
    }
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
var canvas = document.getElementById('canvas');
var context;
var currentMousePos = {
    x: 0,
    y: 0
};

if (canvas && canvas.getContext) {
    init();
}
