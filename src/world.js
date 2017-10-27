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

    chain.moveTowards(currentMousePos.x, currentMousePos.y);
    chain.draw(context);
}

var canvas = document.getElementById('canvas');
var chain = new Chain(20, 20);
var context;
var currentMousePos = {
    x: 0,
    y: 0
};

if (canvas && canvas.getContext) {
    init();
}
