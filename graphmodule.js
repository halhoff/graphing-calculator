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
        console.log(x + ', ' + result);
        x += step;
    }
    return coords;
}

function drawAxes(ctx, width, height) {

    clearGraph();

    document.getElementById("answer").textContent = ``;

    ctx.beginPath();

    // x-axis
    ctx.moveTo(50, height / 2);
    ctx.lineTo(width - 50, height / 2);

    // y-axis
    ctx.moveTo(width / 2, 50);
    ctx.lineTo(width / 2, height - 50);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw x-axis arrow
    ctx.moveTo(width - 60, height / 2 - 5);
    ctx.lineTo(width - 50, height / 2);
    ctx.lineTo(width - 60, height / 2 + 5);
    ctx.stroke();

    // Draw y-axis arrow
    ctx.moveTo(width / 2 - 5, 60);
    ctx.lineTo(width / 2, 50);
    ctx.lineTo(width / 2 + 5, 60);
    ctx.stroke();

    // Add x-axis label
    ctx.font = "16px Consolas";
    ctx.fillStyle = "white";
    ctx.fillText("x", width - 45, height / 2 + 5);

    // Add y-axis label
    ctx.fillText("y", width / 2 - 4, 40);
}

function drawCoordinates(ctx, coords, width, height) {

    const scale = 50;

    // Start drawing the path for the line
    ctx.beginPath();
    let lastPoint = null;

    // Set the fill style for the points
    ctx.fillStyle = 'aqua';

    coords.forEach(([x, y]) => {
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

    // Stroke the line connecting the points
    ctx.strokeStyle = 'aqua';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function clearGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}