// DOM elements
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Object for calculations
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

// State variables
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Functions for handling input
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

function addDecimal() {
  if (awaitingNextValue) return;

  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent += '.';
  }
}

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

// Event listeners for button clicks
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', addDecimal);
  }
});

// Function to reset calculator
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Event listener for clear button
clearBtn.addEventListener('click', resetAll);

// Event listener for keyboard input
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
