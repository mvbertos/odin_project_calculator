//create function for sum,subtraction, division and multiply operetion
//each operation will require three variables, n1,operator and n2
//each one will have a variable to be stored
//when pressed '=' the operate function will be called
//it will use one of the implemented operation and display the result later
//the user input will be displayed at the display
let inputtingN1 = true;
let curInputVal = "";
let n1Val = "";
let opVal = "";
let n2Val = "";

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
  setNumber(curInputVal);
  setInputOrder(!inputtingN1);
  display.value = value;
  if (!isValueValid(n1Val)) {
    alert("Add a number before adding an operator.");
    return;
  }
  opVal = value;
}

// Equal Button
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", () => {
  onEqualButtonPressed();
});

function onEqualButtonPressed() {
  setNumber(curInputVal);
  let result = operate(n1Val, opVal, n2Val);
  setInputOrder(true); //n1val
  setNumber(result);
  display.value = result;
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
  curInputVal += value;
  display.value = curInputVal;
}

//SETTERS

/**
 * Clears all values inputted by the user
 * this include the display value.
 */
function clearValues() {
  n1Val = "";
  n2Val = "";
  opVal = "";
  curInputVal = "";
  display.value = "";
}

/**
 * Use full values to set a number
 * @param {*} value
 */
function setNumber(value) {
  console.log("setting:" + value);

  if (!isValueValid(value)) {
    return;
  }
  if (inputtingN1) {
    //set n1 if operator is empty
    n1Val = value.toString();
    console.log("set n1val to:" + n1Val);
  } else {
    n2Val = value.toString();
    console.log("set n2val to:" + n2Val);
  }
  curInputVal = "";
}

function setInputOrder(value = false) {
  inputtingN1 = value;
  console.log("inputting on n1Val set: " + inputtingN1);
}

//OPERATION
/**
 * operate will receives any parameters because it uses the n1val, opval and n2val
 * this is a fixed rule to not get lost between variables when the operation is being done
 * "yeah I did got lost once"
 * @returns
 */
function operate() {
  let result = "";
  if (!isValueValid(n1Val) || opVal == "" || !isValueValid(n2Val)) {
    alert(
      "An operation requires a number, operator and a second number to work.\n Example: 2+2, 25*2, etc..."
    );
    return result;
  }

  let n1 = parseInt(n1Val);
  let n2 = parseInt(n2Val);

  console.log(n1 + opVal + n2);

  switch (opVal) {
    case "+":
      result = add(n1, n2);
      break;
    case "-":
      result = substract(n1, n2);
      break;
    case "÷":
      if (n1 == 0 || n2 == 0) {
        alert("0 values cannot be divided in this simple calculator.");
        return result;
      }
      result = divide(n1, n2);
      break;
    case "x":
      result = multiply(n1, n2);
      break;
    default:
      alert("Operator is not valid or missing.");
      return result;
  }
  console.log("result:" + result);
  return result.toString();
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
  if (Number.isInteger(value)) {
    return value;
  } else {
    return value.toFixed(2).replace(/\.?0$/, "");
  }
}

/**
 * it will check if parameter is a valid number
 * @param {*} val - only string
 * @returns
 */

function isValueValid(val) {
  console.log("validating:" + val);

  if (typeof val != "string" || val === "") {
    console.error("you tried to validade a non string value or a empty value");
    return false;
  }
  if (isNaN(val) && isNaN(parseFloat(val))) {
    console.error(val + " is not a valid number!");
    return false;
  }
  return true;
}

//EXECUTE
initCalculator();
