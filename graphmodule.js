function generateCoords(equation) {
    let coords = [];
    let step = 0.1;
    let x = -5;
    while (x < 5) {
        let temp = equation;
        x = parseFloat(x.toFixed(5));
        temp = temp.replace(/x/g, `(${x.toString()})`);
        let result = calculate(temp, 0);
        if (result) {
            result = parseFloat(result.toFixed(5));
        }
        coords.push([x, result]);
        x += step;
    }
    return coords;
}

function drawAxes(ctx, width, height) {
    clearGraph(ctx);
    document.getElementById("answer").textContent = ``;
    ctx.beginPath();

    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "bold 16px Inter";
    ctx.fillStyle = "white";
}

function drawCoordinates(ctx, coords, width, height) {
    clearGraph(ctx);
    const scale = width / (coords[coords.length - 1][0] - coords[0][0]);
    ctx.beginPath();
    let lastPoint = null;
    ctx.fillStyle = 'aqua';
    coords.forEach(([x, y]) => { // scale = width / -10
        const canvasX = width / 2 + x * scale;
        const canvasY = height / 2 - y * scale;
        if (y !== null) {
            if (lastPoint) {
                ctx.moveTo(lastPoint.x, lastPoint.y);
                ctx.lineTo(canvasX, canvasY);
            }
            else {
                ctx.moveTo(canvasX, canvasY);
            }
            lastPoint = {x: canvasX, y: canvasY};
        }
        else {
            lastPoint = null;
        }
    });
    ctx.strokeStyle = 'aqua';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function clearGraph(ctx) {
    ctx.clearRect(0, 0, graph.width, graph.height);
}