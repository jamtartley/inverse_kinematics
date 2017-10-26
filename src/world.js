import Chain from './chain';
import Segment from './segment';

var canvas = document.getElementById('canvas');
var chain = new Chain(5);
var context;

if (canvas && canvas.getContext) {
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "rgb(50, 50, 50)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    chain.draw(context);
}
