import { 
    handleNumberInput, 
    handleDecimalPoint, 
    handleOperator, 
    calculate, 
    clearCalculator, 
    updateDisplay, 
    _setCurrentInput, 
    _getCurrentInput, 
    _setPreviousInput, 
    _getPreviousInput, 
    _setOperator, 
    _getOperator,
    _setNewInput,
    _getNewInput
} from './script.js';

describe('Calculator Logic', () => {
    let mockDisplayElement;

    beforeEach(() => {
        // Reset the calculator state before each test
        clearCalculator();
        _setPreviousInput('');
        _setOperator('');
        _setNewInput(false);

        // Mock the display element
        mockDisplayElement = { textContent: '' };
    });

    test('should initialize currentInput to 0', () => {
        expect(_getCurrentInput()).toBe('0');
    });

    test('updateDisplay should update the textContent of the display element', () => {
        _setCurrentInput('123');
        updateDisplay(mockDisplayElement);
        expect(mockDisplayElement.textContent).toBe('123');
    });

    test('handleNumberInput should append numbers', () => {
        handleNumberInput('1');
        handleNumberInput('2');
        expect(_getCurrentInput()).toBe('12');
    });

    test('handleNumberInput should replace 0 with new number', () => {
        handleNumberInput('0');
        handleNumberInput('5');
        expect(_getCurrentInput()).toBe('5');
    });

    test('handleNumberInput should replace currentInput when newInput is true', () => {
        _setCurrentInput('123');
        _setNewInput(true);
        handleNumberInput('4');
        expect(_getCurrentInput()).toBe('4');
        expect(_getNewInput()).toBe(false);
    });

    test('handleNumberInput should limit input length to 12', () => {
        _setCurrentInput('123456789012');
        handleNumberInput('3');
        expect(_getCurrentInput()).toBe('123456789012');
    });

    test('handleDecimalPoint should add a decimal point', () => {
        handleNumberInput('5');
        handleDecimalPoint();
        expect(_getCurrentInput()).toBe('5.');
    });

    test('handleDecimalPoint should not add multiple decimal points', () => {
        handleNumberInput('5');
        handleDecimalPoint();
        handleDecimalPoint();
        expect(_getCurrentInput()).toBe('5.');
    });

    test('handleOperator should set previousInput and operator', () => {
        handleNumberInput('10');
        handleOperator('+');
        expect(_getPreviousInput()).toBe('10');
        expect(_getOperator()).toBe('+');
        expect(_getNewInput()).toBe(true);
    });

    test('calculate should perform addition', () => {
        _setCurrentInput('10');
        _setPreviousInput('5');
        _setOperator('+');
        calculate();
        expect(_getCurrentInput()).toBe('15');
    });

    test('calculate should perform subtraction', () => {
        _setCurrentInput('5');
        _setPreviousInput('10');
        _setOperator('-');
        calculate();
        expect(_getCurrentInput()).toBe('5');
    });

    test('calculate should perform multiplication', () => {
        _setCurrentInput('5');
        _setPreviousInput('10');
        _setOperator('*');
        calculate();
        expect(_getCurrentInput()).toBe('50');
    });

    test('calculate should perform division', () => {
        _setCurrentInput('5');
        _setPreviousInput('10');
        _setOperator('/');
        calculate();
        expect(_getCurrentInput()).toBe('2');
    });

    test('calculate should handle division by zero', () => {
        _setCurrentInput('0');
        _setPreviousInput('10');
        _setOperator('/');
        calculate();
        expect(_getCurrentInput()).toBe('Error');
    });

    test('calculate should handle floating-point precision', () => {
        _setCurrentInput('3');
        _setPreviousInput('1');
        _setOperator('/');
        calculate();
        expect(_getCurrentInput()).toBe('0.333333'); // 1/3 rounded to 6 decimal places
    });

    test('clearCalculator should reset all values', () => {
        _setCurrentInput('123');
        _setPreviousInput('456');
        _setOperator('*');
        _setNewInput(true);
        clearCalculator();
        expect(_getCurrentInput()).toBe('0');
        expect(_getPreviousInput()).toBe('');
        expect(_getOperator()).toBe('');
        expect(_getNewInput()).toBe(false);
    });

    test('handleOperator should calculate previous operation if chaining', () => {
        handleNumberInput('5');
        handleOperator('+');
        handleNumberInput('3');
        handleOperator('-'); // Should calculate 5 + 3 = 8
        expect(_getCurrentInput()).toBe('8');
        expect(_getPreviousInput()).toBe('8');
        expect(_getOperator()).toBe('-');
    });

    test('calculate should set newInput to true after calculation', () => {
        handleNumberInput('5');
        handleOperator('+');
        handleNumberInput('3');
        calculate();
        expect(_getNewInput()).toBe(true);
    });
}); 