//create function for sum,subtraction, division and multiply operetion
//each operation will require three variables, n1,operator and n2
//each one will have a variable to be stored
//when pressed '=' the operate function will be called
//it will use one of the implemented operation and display the result later
//the user input will be displayed at the display
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
  opVal = value;
  displayOperationText(n1Val, opVal, n2Val);
}

// Equal Button
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", () => {
  operate(n1Val, opVal, n2Val);
});

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
  console.log(
    "This is a log to show that the values has being cleanse." +
      "\n n1:" +
      n1Val +
      "\n operator" +
      opVal +
      "\n n2:" +
      n2Val
  );

  displayOperationText(n1Val, opVal, n2Val);
}

//Number Pad
const numberPad = document.querySelector("#numberPad");

function initNumberPad() {
  document.querySelectorAll("#numberPad button").forEach((btn) => {
    btn.addEventListener("click", () => {
      setNumber(btn.textContent);
    });
  });
}

function setNumber(value) {
  if (opVal === "") {
    n1Val += value;
  } else {
    n2Val += value;
  }
  displayOperationText(n1Val, opVal, n2Val);
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

function operate(a = 1, op = "", b = 1) {
  if (a == "" || op == "" || b == "") {
    alert(
      "An operation requires a number, operator and a second number to work.\n Example: 2+2, 25*2, etc..."
    );
    return;
  }

  let result = 0;
  let n1 = parseInt(a);
  let n2 = parseInt(b);
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
        return;
      }

      result = divide(n1, n2);
      break;
    case "x":
      result = multiply(n1, n2);
      break;
    default:
      alert("Operator is not valid or missing.");
      return;
  }
  if (result != "") {
    clearValues();
    display.value = formatNumber(result);
  }
}

function formatNumber(value) {
  if (Number.isInteger(value)) {
    return value;
  } else {
    return value.toFixed(2).replace(/\.?0$/, "");
  }
}

initCalculator();
