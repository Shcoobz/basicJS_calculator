/**
 * Represents the display element of the calculator.
 * @const {HTMLElement} calculatorDisplay - The display element where calculator input and output are shown.
 */
const calculatorDisplay = document.querySelector('h1');

/**
 * Represents all the buttons of the calculator.
 * @const {NodeList} inputBtns - A collection of all button elements in the calculator.
 */
const inputBtns = document.querySelectorAll('button');

/**
 * Represents the clear button of the calculator.
 * @const {HTMLElement} clearBtn - The button used to clear the calculator's display and reset its state.
 */
const clearBtn = document.getElementById('clear-btn');

/**
 * An object containing functions for performing arithmetic calculations.
 * @const {Object} calculate - An object with keys as arithmetic operators and values as corresponding calculation functions.
 */
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

/**
 * The first operand for arithmetic operations.
 * @type {number}
 */
let firstValue = 0;

/**
 * The operator for the current arithmetic operation.
 * @type {string}
 */
let operatorValue = '';

/**
 * Indicates whether the calculator is awaiting the input of the next value.
 * @type {boolean}
 */
let awaitingNextValue = false;

/**
 * Updates the calculator display with the provided number.
 * @param {string} number - The number to be displayed on the calculator.
 * @returns {void}
 */
function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    calculatorDisplay.textContent =
      calculatorDisplay.textContent === '0'
        ? number
        : calculatorDisplay.textContent + number;
  }
}

/**
 * Adds a decimal point to the calculator display if not already present.
 * @returns {void}
 */
function addDecimal() {
  if (awaitingNextValue) return;

  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent += '.';
  }
}

/**
 * Performs arithmetic operations based on the operator provided.
 * @param {string} operator - The arithmetic operator to be applied.
 * @returns {void}
 */
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  operatorValue = operator;
  awaitingNextValue = true;
}

/**
 * Resets all calculator values and clears the display.
 * @returns {void}
 */
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

/**
 * Handles button clicks and updates the calculator display accordingly.
 * @param {MouseEvent} event - The mouse click event.
 */
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', addDecimal);
  }
});

/**
 * Handles the click event on the clear button to reset the calculator.
 */
clearBtn.addEventListener('click', resetAll);

/**
 * Handles keyboard input to perform calculator operations.
 * @param {KeyboardEvent} event - The keyboard event.
 */
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key) || key === '.') {
    sendNumberValue(key);
  } else if (key === 'Enter' || key === '=') {
    useOperator('=');
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    resetAll();
  } else if (['+', '-', '*', '/'].includes(key)) {
    useOperator(key);
  }
});
