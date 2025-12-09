//create function for sum,subtraction, division and multiply operetion
//each operation will require three variables, n1,operator and n2
//each one will have a variable to be stored
//when pressed '=' the operate function will be called
//it will use one of the implemented operation and display the result later
//the user input will be displayed at the display
let storedVal = "";
let currentVal = "";
let currentOp = null;

//Display
const display = document.querySelector("#display");

function initCalculator() {
  initNumberPad();
  initOperator();
}

//INPUTS
//OperatorPad
const operatorPad = document.querySelector("#operatorPad");
function initOperator() {
  let buttons = operatorPad.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      onOperatorPressed(button.textContent);
    });
  });
}

function onOperatorPressed(value) {
  storedVal = currentVal;
  currentOp = value;
  currentVal = "";
}

// Equal Button
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", () => {
  onEqualButtonPressed();
});

function onEqualButtonPressed() {
  if (currentOp) {
    storedVal = operate(storedVal, currentVal, currentOp);
    display.value = storedVal.toString();
  }
}

//Clear Values
const clrButton = document.querySelector("#clrButton");
clrButton.addEventListener("click", () => clearValues());

//Number Pad
const numberPad = document.querySelector("#numberPad");
function initNumberPad() {
  document.querySelectorAll("#numberPad button").forEach((btn) => {
    btn.addEventListener("click", () => {
      onNumberPressed(btn.textContent);
    });
  });
}

function onNumberPressed(value) {
  //here only will be stored the values so...
  currentVal += value;
  display.value = currentVal;
}

//SETTERS
/**
 * Clears all values inputted by the user
 * this include the display value.
 */
function clearValues() {
  currentOp = null;
  currentVal = "";
  storedVal = "";
  display.value = "";
}

//OPERATION
/**
 * operate will receives any parameters because it uses the n1val, opval and n2val
 * this is a fixed rule to not get lost between variables when the operation is being done
 * "yeah I did got lost once"
 * @returns
 */
function operate(a, b, op) {
  let result = "";
  let n1 = parseInt(a);
  let n2 = parseInt(b);
  console.log(n1 + op + n2);

  switch (op) {
    case "+":
      result = add(n1, n2);
      break;
    case "-":
      result = substract(n1, n2);
      break;
    case "÷":
      if (n1 == 0 || n2 == 0) {
        alert("0 values cannot be divided in this simple calculator.");
        clearValues();
        return result;
      }
      result = divide(n1, n2);
      break;
    case "x":
      result = multiply(n1, n2);
      break;
    default:
      alert("Operator is not valid or missing.");
      break;
  }
  console.log("result:" + result);
  return result;
}

//operations
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

//FORMAT AND VALIDATE
/**
 * it will get the number on a string and fix to two decimals or a full integer
 * @param {*} value - preferable string
 * @returns
 */
function formatNumber(value = "") {
  // if (Number.isInteger(value)) {
  //   return value;
  // } else {
  //   return value.toFixed(2).replace(/\.?0$/, "");
  // }
  return value;
}

// /**
//  * it will check if parameter is a valid number
//  * @param {*} val - only string
//  * @returns
//  */

// function isValueValid(val) {
//   console.log("validating:" + val);

//   if (typeof val != "string" || val === "") {
//     console.error("you tried to validade a non string value or a empty value");
//     return false;
//   }
//   if (isNaN(val) && isNaN(parseFloat(val))) {
//     console.error(val + " is not a valid number!");
//     return false;
//   }
//   return true;
// }

//EXECUTE
initCalculator();
