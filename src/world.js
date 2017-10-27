import * as Utils from './utils';
import Victor from 'victor';
import BallManager from './ball_manager';
import Spider from './spider';

function init() {
    const frameRate = 60;
    const millisBetweenUpdate = 1000 / frameRate;

    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mousedown", mouseDown, true);
    canvas.addEventListener("mouseup", mouseUp, false);
    setInterval(update, millisBetweenUpdate);
    resize();

    context = canvas.getContext("2d");
}

function mouseMove(e) {
    currentMousePos.x = e.x;
    currentMousePos.y = e.y;
}

function mouseDown(e) {
    shouldSpawnBall = true;
}

function mouseUp(e) {
    shouldSpawnBall = false;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    resize();

    if (shouldSpawnBall) {
        ballManager.addBall(currentMousePos.x, currentMousePos.y);
    }

    ballManager.update();
    ballManager.draw(context);

    for (let i = 0; i < spiders.length; i++) {
        let spider = spiders[i];
        spider.update(ballManager.balls);
        spider.draw(context);
    }
}

const segCount = 5;
const segMag = 75;

var spiders = [
    new Spider(new Victor(window.innerWidth / 2, 0)),
    new Spider(new Victor(0, window.innerHeight / 2)),
    new Spider(new Victor(window.innerWidth, window.innerHeight / 2)),
    new Spider(new Victor(window.innerWidth / 2, window.innerHeight)),
];
var ballManager = new BallManager;
var canvas = document.getElementById('canvas');
var context;
var currentMousePos = new Victor(0, 0);
var shouldSpawnBall = false;

if (canvas && canvas.getContext) {
    init();
}
