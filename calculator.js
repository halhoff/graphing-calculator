function calculate(expression, printResult) {

    try {

        // checks if digit is a digit
        function isDigit(digit) {
            return '0' <= digit && digit <= '9';
        }

        // check if expression has invalid characters
        function validExpression(expression) {
            const validChars = new Set('0123456789.()+-*/^ ');
            for (let i = 0; i < expression.length; ++i) {
                if (!validChars.has(expression[i])) {
                    return false;
                }
            }
            return true;
        }

        // checks if expression has valid parentheses
        function validParentheses(expression) {
            let stack = [];
            for (let i = 0; i < expression.length; ++i) {
                if (expression[i] === '(') {
                    stack.push(expression[i]);
                }
                else if (expression[i] === ')') {
                    if (stack.length === 0 || stack[stack.length - 1] !== '(') {
                        return false;
                    }
                    stack.pop();
                }
            }
            return stack.length === 0;
        }

        // for prioritizing multiplication over addition
        function pemdas(operator) {
            if (operator === '+' || operator === '-') return 1;
            if (operator === '*' || operator === '/') return 2;
            if (operator === '^') return 3;
            return 0;
        }

        // expression two numbers and operator, outputs number
        function applyOperator(operator, b, a) {
            switch (operator) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/':
                    if (b === 0) throw new Error("Undefined");
                    return a / b;
                case '^':
                    if (a === 0 && b === 0) throw new Error("Undefined");
                    return a ** b;
            }
        }
        
        // main function
        function evaluate(expression) {
            let values = [];
            let operators = [];
            let i = 0;
            while (i < expression.length) {
                // eliminating white space
                if (expression[i] === ' ') {
                    ++i;
                    continue;
                }
                // differentiates between - as an operator vs sign
                else if (expression[i] === '-' && (i === 0 || !isDigit(expression[i - 1]) && expression[i - 1] !== ')')) {
                    let val = 0;
                    let decimal = 0;
                    let tens = 10;
                    ++i;
                    if (expression[i] === '(') {
                        operators.push('-');
                    }
                    else {
                        while (i < expression.length && (isDigit(expression[i]) || expression[i] == '.')) {
                            if (expression[i] === '.') {
                                decimal = 1;
                            }
                            else if (isDigit(expression[i]) && decimal === 0) {
                                val = (val * 10) + (expression[i] - '0');
                            }
                            else if (isDigit(expression[i]) && decimal === 1) {
                                val += expression[i] / tens;
                                tens *= 10;
                            }
                            ++i;
                        }
                    }
                    values.push(-val);
                    --i;
                }
                // returns val of current number
                else if (isDigit(expression[i]) || expression[i] === '.') {
                    let val = 0;
                    let decimal = 0;
                    let tens = 10;
                    if (expression[i] === '.') {
                        decimal = 1;
                        ++i;
                    }
                    while (i < expression.length && (isDigit(expression[i]) || expression[i] == '.')) {
                        // expression[i] is .
                        if (expression[i] === '.') {
                            decimal = 1;
                        }
                        else if (isDigit(expression[i]) && decimal === 0) {
                            val = (val * 10) + (expression[i] - '0');
                        }
                        else if (isDigit(expression[i]) && decimal === 1) {
                            val += expression[i] / tens;
                            tens *= 10;
                        }
                        ++i;
                    }
                    values.push(val);
                    --i;
                }
                else if (expression[i] === '(') {
                    if (i > 0 && isDigit(expression[i - 1])) {
                        operators.push('*');
                    }
                    operators.push(expression[i]);
                }
                // calculates expression inside parentheses
                else if (expression[i] === ')') {
                    while (operators.length && operators[operators.length - 1] !== '(') {
                        values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
                    }
                    operators.pop();
                    if (i < expression.length && expression[i + 1] === '(') operators.push('*');
                }
                // does multiplication before adding to operator stack
                else {
                    while (operators.length && pemdas(operators[operators.length - 1]) >= pemdas(expression[i])) {
                        values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
                    }
                    operators.push(expression[i]);
                }
                ++i;
            }
            // calculates remaining elements in stacks
            while (operators.length) {
                values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
            }
            // last element in value stack is answer
            let finalanswer = values.pop();
            return parseFloat(finalanswer.toFixed(5));
        }

        // throws error if expression has invalid characters
        if (!validExpression(expression)) {
            throw new Error("Expression has invalid characters");
        }

        // throws error if expression has invalid parentheses
        if (!validParentheses(expression)) {
            throw new Error("Expression has invalid parentheses");
        }

        let answer = evaluate(expression);
        if (printResult) document.getElementById("answer").textContent = `Result: ${answer}`;
        return answer;
    }
    catch (error) {
        if (printResult) document.getElementById("answer").textContent = `${error.message}`;
        return null;
    }
}