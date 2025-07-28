let currentInput = '0';
let previousInput = '';
let operator = '';
let newInput = false;

export function updateDisplay(displayElement) {
    if (newInput && operator) {
        // After an operator is clicked, show the first number and the operator
        displayElement.textContent = `${previousInput} ${operator}`;
    } else {
        // Otherwise, show the current input
        displayElement.textContent = currentInput;
    }
}

export function handleNumberInput(num) {
    if (currentInput.length >= 12 && !newInput) {
        return;
    }
    if (currentInput === '0' || newInput) {
        currentInput = num;
        newInput = false;
    } else {
        currentInput += num;
    }
}

export function handleDecimalPoint() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

export function handleOperator(op) {
    if (operator && !newInput) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    newInput = true;
}

export function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                return;
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    // Handle floating-point precision
    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(6));
    }

    currentInput = result.toString();
    previousInput = '';
    operator = '';
    newInput = true;
}

export function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    newInput = false;
}

// For testing purposes, expose internal state if needed
export function _getCurrentInput() { return currentInput; }
export function _setCurrentInput(value) { currentInput = value; }
export function _getPreviousInput() { return previousInput; }
export function _setPreviousInput(value) { previousInput = value; }
export function _getOperator() { return operator; }
export function _setOperator(value) { operator = value; }
export function _getNewInput() { return newInput; }
export function _setNewInput(value) { newInput = value; }

// Initialize and attach event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('display');
    updateDisplay(displayElement);

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            handleNumberInput(button.textContent);
            updateDisplay(displayElement);
        });
    });

    document.querySelector('.decimal-btn').addEventListener('click', () => {
        handleDecimalPoint();
        updateDisplay(displayElement);
    });

    document.querySelectorAll('.operator-btn').forEach(button => {
        button.addEventListener('click', () => {
            handleOperator(button.textContent);
            updateDisplay(displayElement);
        });
    });

    document.querySelector('.equals-btn').addEventListener('click', () => {
        calculate();
        updateDisplay(displayElement);
    });

    document.querySelector('.clear-btn').addEventListener('click', () => {
        clearCalculator();
        updateDisplay(displayElement);
    });
}); 