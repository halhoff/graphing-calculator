var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

const SCREEN_HEIGHT = window.innerWidth / 4;
const SCREEN_WIDTH = window.innerWidth / 4;

const graph = createHiDPICanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
graph.id = 'graph';
const ctx = graph.getContext('2d');
document.getElementById('graph-canvas').appendChild(graph);

const axes = createHiDPICanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
axes.id = 'axes';
const ctx_axes = axes.getContext('2d');
document.getElementById('graph-canvas').append(axes);

function equationOrExpression(expression) {
    drawAxes(ctx_axes, SCREEN_WIDTH, SCREEN_HEIGHT);
    let equation = 0;
    for (let i = 0; i < expression.length; ++i) {
        if (expression[i] === 'x') {
            equation = 1;
            break;
        }
    }
    if (equation) {
        drawCoordinates(ctx, generateCoords(expression), SCREEN_WIDTH, SCREEN_HEIGHT);
    }
    else {
        calculate(expression, 1);
    }
}