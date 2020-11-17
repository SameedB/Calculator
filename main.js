// global variables
let workNum = "0"; // number currently being worked
let heldNum = "0"; // previous number
let operator = "";
let display = "0";
let answer = "";

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    function add(num1, num2) {
        return num1 + num2;
    }
    function subtract(num1, num2) {
        return num1 - num2;
    }    
    function multiply(num1, num2) {
        return num1 * num2;
    }    
    function divide(num1, num2) {
        return num1 / num2;
    }

    switch(operator) {
        case "+":
            return(add(num1, num2));
        case "-":
            return(subtract(num1, num2));
        case "*":
            return(multiply(num1, num2));
        case "/":
            return(divide(num1, num2));
        default:
            console.log(`${num1} ${operator} ${num2}`);
            return("Error");
    }
}

function displayUpdate(input) {
    document.getElementById("calc-display").innerHTML = input;
}

function keyPressed(input) {
    // update the display
    function displayUpdate(input) {
        document.getElementById("calc-display").innerHTML = input;
    }
    // round to the input number of decimals
    function round(input, decimals = 10) {
        return Number(Math.round(input+'e'+decimals)+'e-' + decimals);
    }
    // add the input to the current working number
    function calcNumber(input) {
        if(workNum == 0) {
            workNum = input;
        } else if(input == "." && workNum.includes(".")) {
            // if it's a decimal but there's already a decimal, do nothing
        } else if(workNum.length < 13) {
            workNum += input;
        }
        display = workNum;
    }
    // change the operator to the new input
    function calcOperator(input) {
        if(operator != "") {
            calcEquals(input);
        }
        operator = input;
        if(heldNum == "0"){
            heldNum = workNum;
        }
        workNum = 0;
        display = operator;
    }
    // send the numbers and operator to be calculated, return the answer
    function calcEquals(input) {
        if(operator == "/" && workNum == 0) { // can't divide by zero
            allClear();
            display = "Black Hole Sun";
        } else {
            if(heldNum == 0){
                answer = workNum;
            } else {
                if(operator == "") {
                    answer = heldNum;
                } else answer = operate(operator, heldNum, workNum);
            }
            workNum = 0;
            heldNum = answer;
            display = round(answer);
        }
    }
    // clears all work and resets display to "0"
    function allClear() {
        workNum = "0";
        heldNum = "0";
        operator = "";
        display = "0";
    }
    
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    let operators = ['+', '-', '*', '/'];
    if(numbers.includes(input)){
        calcNumber(input);
    } else if(operators.includes(input)) {
        calcOperator(input);
    } else if(input == "=") {
        calcEquals(input)
    } else if(input == "all-clear") {
        allClear();
    }
    displayUpdate(display);
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', function() { keyPressed(this.value);}));
document.addEventListener('keydown', function(e) {
    if(e.key === "NumpadEnter" || e.key === "Enter") {
        keyPressed("=");
    } else if(e.key === "Delete" || e.key === "Backspace") {
        keyPressed("all-clear");
    } else { keyPressed(e.key);
    }
});

