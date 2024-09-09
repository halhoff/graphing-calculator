function equationOrExpression(expression) {
    let equation = 0;
    for (let i = 0; i < expression.length; ++i) {
        if (expression[i] === 'x') {
            equation = 1;
            break;
        }
    }
    if (equation) {
        const canvas = document.getElementById('graphCanvas');
        const ctx = canvas.getContext('2d');
        drawAxes(ctx, 550, 550);
        drawCoordinates(ctx, generateCoords(expression), 550, 550);
    }
    else {
        calculate(expression, 1);
    }
}