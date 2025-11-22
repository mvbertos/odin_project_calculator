const numberPad = document.querySelector("#numberPad");
const operatorPad = document.querySelector("#operatorPad");

function initCalculator() {
  initNumberPad();
}

const display = document.querySelector("#display");
let firstNumberValue = "";
let secondNumberValue = "";
let operatorValue = "";

//Number Pad

function initNumberPad() {
  const numbers = "1234567890";
  numbers.split("").forEach((num) => {
    let btn = document.createElement("button");
    btn.textContent = num;
    btn.id = num;
    btn.addEventListener("click", () => {
      setNumber(btn.id);
    });
    numberPad.appendChild(btn);
  });
}

function setNumber(value) {
  if (operatorValue == "") {
    firstNumberValue += value;

    display.value = firstNumberValue;
  } else {
    secondNumberValue += value;
    display.value = secondNumberValue;
  }
}

function add() {}
function substract() {}
function multiply() {}
function divide() {}

//takes two values and an operator
//the operator is used later to call the above operations
function operate(a, b, operator) {}

initCalculator();
