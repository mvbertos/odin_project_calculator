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
  setDisplayText(n1Val, opVal, n2Val);
}

// Equal Button
const equalButton = document.querySelector("#equalButton");
equalButton.addEventListener("click", () => {
  operate(n1Val, opVal, n2Val);
});

//Display
const display = document.querySelector("#display");
function setDisplayText(n1 = " ", op = " ", n2 = "") {
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

  setDisplayText(n1Val, opVal, n2Val);
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
  setDisplayText(n1Val, opVal, n2Val);
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
    console.log(
      "an operation requires a number, operator and a seconde number to work."
    );
    return;
  }

  let result = 0;
  let parsedA = parseInt(a);
  let parsedB = parseInt(b);
  switch (op) {
    case "+":
      result = add(parsedA, parsedB);
      break;
    case "-":
      result = substract(parsedA, parsedB);
      break;
    case "÷":
      result = divide(parsedA, parsedB);
      break;
    case "x":
      result = multiply(parsedA, parsedB);
      break;
    default:
      console.log("Operator is not valid or missing.");
      return;
  }
  if (result != "") {
    clearValues();
    setNumber(formatNumber(result)); //now I know this looks ugly, but i wanted to make it the more compact as possible here.
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
