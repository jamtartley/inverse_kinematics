import * as Utils from './utils';
import Victor from 'victor';
import GravityItem from './gravity_item';
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
    spawnGravityItem(e.x, e.y);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    resize();

    let grabbableItems = gravityItems.length === 0 ? [currentMousePos] : [];

    for (let i = 0; i < gravityItems.length; i++) {
        let gravityItem = gravityItems[i];
    
        grabbableItems.push(gravityItem.position);
        gravityItem.update();
        gravityItem.draw(context);
    }

    for (let i = 0; i < spiders.length; i++) {
        let spider = spiders[i];
        spider.update(grabbableItems);
        spider.draw(context);
    }
}

function spawnGravityItem(x, y) {
    gravityItems.push(new GravityItem(new Victor(x, y)));
}

const segCount = 5;
const segMag = 75;

var spiders = [
    new Spider(new Victor(window.innerWidth / 2, window.innerHeight / 2)),
]
var gravityItems = [
];
var canvas = document.getElementById('canvas');
var context;
var currentMousePos = new Victor(0, 0);

if (canvas && canvas.getContext) {
    init();
}
