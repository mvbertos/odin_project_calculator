let storedVal = "";
let currentVal = "";
let currentOp = null;

function initCalculator() {
  initNumberPad();
  initOperator();
}

//Backspace
const BackspaceButton = document.querySelector("#backspaceButton");
BackspaceButton.addEventListener("click", () => {
  onBackpacePressed();
});

function onBackpacePressed() {
  if (currentVal !== "") {
    currentVal = currentVal.slice(0, -1);
    display.value = currentVal;
  } else {
    clearValues();
  }
}

//DotButton
const dotButton = document.querySelector("#dotButton");
dotButton.addEventListener("click", () => {
  onDotButtonPressed();
});

function onDotButtonPressed() {
  if (currentVal.includes(".")) {
    return;
  } else {
    clearValues();
    if (currentVal === "") currentVal = "0";
    currentVal += ".";
    display.value = currentVal;
  }
}

//Display
const display = document.querySelector("#display");
display.addEventListener("keydown", (event) => {
  onDisplayeKeydown(event.key);
});
display.addEventListener("input", (event) => {
  onDisplayValueUpdated(event.target.value);
});

function onDisplayValueUpdated(value) {
  //if it has any operator
  let cleanValue = value.replace(/[a-zA-Z]/g, "");
  let operators = ["+", "-", "*", "/"];
  let operator = operators.some((op) => {
    if (cleanValue.includes(op)) {
      op = op == "/" ? "÷" : op == "*" ? "x" : op; //simply converting * to x and / to ÷
      onOperatorPressed(op);
      display.value = "";
      return true;
    }
    return false;
  });
  console.log(operator);

  if (!operator) {
    //else set value
    currentVal = cleanValue;
    display.value = cleanValue;
  }
}

function onDisplayeKeydown(key) {
  if (key == "Enter") {
    onEqualButtonPressed();
  }
}

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
  if (currentOp == null) {
    storedVal = currentVal;
  }
  currentVal = "";
  currentOp = value;
}

// Equal Button
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", () => {
  onEqualButtonPressed();
});

function onEqualButtonPressed() {
  if (currentOp) {
    storedVal = operate(storedVal, currentVal, currentOp);
    display.value = formatNumber(storedVal);
  }
}

//Clear Values
const clrButton = document.querySelector("#clrButton");
clrButton.addEventListener("click", () => clearValues());

function clearValues() {
  currentOp = null;
  currentVal = "";
  storedVal = "";
  display.value = "";
}

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

//Operate
function operate(a, b, op) {
  if (isNaN(parseFloat(a)) || isNaN(parseFloat(b))) {
    alert("you must input two values/numbers to proceed.");
    clearValues();
    return;
  }
  a = parseFloat(a);
  b = parseFloat(b);
  let result = "";
  console.log(a + op + b);

  switch (op) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = substract(a, b);
      break;
    case "÷":
      if (a == 0 || b == 0) {
        alert("0 values cannot be divided in this simple calculator.");
        clearValues();
        return result;
      }
      result = divide(a, b);
      break;
    case "x":
      result = multiply(a, b);
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

/**
 * it will get the number on a string and fix to two decimals or a full integer
 * @param {*} value - preferable string
 * @returns
 */
function formatNumber(value = "") {
  if (!isNaN(parseFloat(value))) {
    let round = Math.round(value * 100) / 100;
    console.log("round value:" + round);

    let formattedRound = round
      .toString()
      .replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
    console.log("formatted round:" + formattedRound);

    return formattedRound;
  } else {
    console.error("tried to format a non number value " + value);
    return value;
  }
}

//EXECUTE
initCalculator();
