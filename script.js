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

function initCalculator() {
  initNumberPad();
  initOperator();
}

//Operator
const operatorPad = document.querySelector("#operatorPad");
function initOperator() {
  let buttons = operatorPad.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setOperator(button.textContent);
    });
  });
}
function setOperator(value) {
  setNumber(curInputVal);
  setInputOrder(!inputtingN1);
  display.value = value;
  if (!isValueValid(n1Val)) {
    alert("Add a number before adding an operator.");
    return;
  }
  opVal = value;
}

function setInputOrder(value = false) {
  inputtingN1 = value;
  console.log("inputting on n1Val set: " + inputtingN1);
}

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

// Equal Button
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", () => {
  onEqualButtonPressed();
});

function onEqualButtonPressed() {
  setNumber(curInputVal);
  setInputOrder(true);
  let result = operate(n1Val, opVal, n2Val);
  setNumber(result);
  setInputOrder(false);
  display.value = result;
}

//Display
const display = document.querySelector("#display");
function displayOperationText(n1 = " ", op = " ", n2 = "") {
  display.value = n1 + op + n2;
}

//Clear Values
const clrButton = document.querySelector("#clrButton");
clrButton.addEventListener("click", () => clearValues());
function clearValues() {
  n1Val = "";
  n2Val = "";
  opVal = "";
  curInputVal = "";
  display.value = "";
}

//Number Pad
const numberPad = document.querySelector("#numberPad");

function initNumberPad() {
  document.querySelectorAll("#numberPad button").forEach((btn) => {
    btn.addEventListener("click", () => {
      onNumberPresset(btn.textContent);
    });
  });
}

function onNumberPresset(value) {
  curInputVal += value;
  display.value = curInputVal;
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

//Operators
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

function operate(a = "", op = "", b = "") {
  let result = "";
  if (!isValueValid(a) || op == "" || !isValueValid(b)) {
    alert(
      "An operation requires a number, operator and a second number to work.\n Example: 2+2, 25*2, etc..."
    );
    return result;
  }

  let n1 = parseInt(a);
  let n2 = parseInt(b);

  console.log(n1 + opVal + n2);

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

function formatNumber(value) {
  if (Number.isInteger(value)) {
    return value;
  } else {
    return value.toFixed(2).replace(/\.?0$/, "");
  }
}

initCalculator();
