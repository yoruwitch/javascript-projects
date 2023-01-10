/*--- Variables to store values, operations and result ---*/

let currentValue = "";
let previousValue = "";
let operator = "";
let result = 0;

/*--- Getting the buttons to do the operations ---*/

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        verifyButtonClick(event.target.textContent);
    });
});

/*--- Verify what kind of button was clicked ---*/

function verifyButtonClick(value) {
    if (value === "*" || value === "/" || value === "+" || value === "-") { // selects operator
        // if (operator !== "") { // if there is already an operator, calculates the result
        //     operations(previousValue, currentValue, operator);
        //     currentValue = result;
        // }

        previousValue = currentValue;
        currentValue = "";
        operator = value;
    } else if (value === "=") { // selects equals sign and calculates result
        operations(previousValue, currentValue, operator);
        console.log(result);
    } else if (value === "Limpa") { // clears all variables
        currentValue = "";
        previousValue = "";
        operator = "";
        result = 0;
        setResultOnInput(result);
    } else {    // concatenates numbers
        currentValue += value;
        setResultOnInput(currentValue);
    }
}

/*--- Operations ---*/

function operations(value1, value2, operator) {
    switch (operator) {
        case "*":
            result = Number(value1) * Number(value2);
            break;
        case "/":
            result = Number(value1) / Number(value2);
            break;
        case "+":
            result = Number(value1) + Number(value2);
            break;
        case "-":
            result = Number(value1) - Number(value2);
            break;
    }

    setResultOnInput(result);
}

/*--- Setting result on screen ---*/

const getInput = document.querySelector("input");

function setResultOnInput(num) {
    num = Number(num);
    let fixedNum = num.toFixed(2);
    getInput.value = fixedNum;
}

