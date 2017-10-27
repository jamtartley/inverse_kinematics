import * as Utils from './utils';
import Victor from 'victor';
import Ball from './ball';
import Spider from './spider';

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
    spawnBall(e.x, e.y);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    resize();

    let grabbableItems = balls.length === 0 ? [currentMousePos] : [];

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
    
        grabbableItems.push(ball.position);
        ball.update();
        ball.draw(context);
    }

    for (let i = 0; i < spiders.length; i++) {
        let spider = spiders[i];
        spider.update(grabbableItems);
        spider.draw(context);
    }
}

function spawnBall(x, y) {
    balls.push(new Ball(new Victor(x, y)));
}

const segCount = 5;
const segMag = 75;

var spiders = [
    new Spider(new Victor(window.innerWidth / 2, window.innerHeight / 2)),
]
var balls = [
];
var canvas = document.getElementById('canvas');
var context;
var currentMousePos = new Victor(0, 0);

if (canvas && canvas.getContext) {
    init();
}
