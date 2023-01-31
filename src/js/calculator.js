let calcBtns = document.querySelectorAll(".calc__btn");
const calcExpression = document.querySelector(".calc__expression");
const calcDisplay = document.querySelector(".calc__result");
const calcOperationBtns = document.querySelectorAll('.calc__btn_operation');
const calcEqualBtn = document.querySelector('.calc__btn_equal');

let VALUE = 0;
let LAST_OPERATION = '';
let ZERO_DIVISION = false;
let IS_FIRST_OPERATION = true;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operations = ['+', '-', '*', '/', '='];
const actions = ['ac', 'rm'];

window.addEventListener('DOMContentLoaded', init, false);

function init() {
    calcDisplay.innerHTML = VALUE;
    calcExpression.innerHTML = '';
}

function isDigit(btnValue) {
    return digits.includes(btnValue);
}

function isOperation(btnValue) {
    return operations.includes(btnValue);
}

function isAction(btnValue) {
    return actions.includes(btnValue);
}

function displayDelete() {
    calcDisplay.innerHTML = calcDisplay.innerHTML.slice(0, -1);
    if (calcDisplay.innerHTML === "") {
        calcDisplay.innerHTML = "0";
    }
}

function calcClear() {
    calcDisplay.innerHTML = '0';
    VALUE = 0;
    LAST_OPERATION = '';
    ZERO_DIVISION = false;
}

function displayClear() {
    calcDisplay.innerHTML = '0';
    ZERO_DIVISION = false;
}

function makeAction(action) {
    switch (action) {
        case 'rm':
            displayDelete();
            break;
        case 'ac':
            calcClear();
            break;
    }
}

function getDisplayValue() {
    let calcDisplayValue = calcDisplay.innerHTML;

    if (calcDisplayValue.includes("=")) {
        displayClear();
        return '';
    }

    if (calcDisplayValue.includes(".")) {
        return parseFloat(calcDisplayValue);
    } else {
        return parseInt(calcDisplayValue);
    }
}

function makeOperation(operation) {
    switch (operation) {
        case '=':
            // make operations btn inactive after click equal
            calcOperationBtns.forEach(btn => {
                if (btn.classList.contains('calc__btn_active')) {
                    btn.classList.remove('calc__btn_active');
                }
            });

            // make equal btn active
            calcEqualBtn.classList.toggle('calc__btn_active');

            // make last operation
            makeOperation(LAST_OPERATION);

            // output counted value
            calcDisplay.innerHTML = ZERO_DIVISION ? 'Ошибка' : operation + VALUE.toString() ;
            LAST_OPERATION = operation;
            break;
        case '+':
            VALUE += getDisplayValue();
            displayClear(); // clear the field for the next value
            LAST_OPERATION = operation; // saving the last operation for the EQUAL operation
            break;
        case '-':
            VALUE -= getDisplayValue();
            displayClear();
            LAST_OPERATION = operation;
            break;
        case '*':
            VALUE *= getDisplayValue();
            displayClear();
            LAST_OPERATION = operation;
            break;
        case '/':
            if (getDisplayValue() === 0) {
                ZERO_DIVISION = true;
                break;
            } else {
                VALUE /= getDisplayValue();
            }
            displayClear();
            LAST_OPERATION = operation;
            break;
    }
}

function updateDisplay(btnValue) {
    // if we clicked on zero and zero already on a display as a first digit just do nothing
    if (btnValue === '0' && calcDisplay.innerHTML === '0') {
        return;
    }

    // if we clicked on a dot and not on a display, just add dot
    else if (btnValue === '.' && !calcDisplay.innerHTML.includes('.')) {
        calcDisplay.innerHTML += btnValue;
    }

    // if we clicked on digit and zero on a display, clear the zero and paste digit
    else if (btnValue !== '0' && calcDisplay.innerHTML === '0') {
        calcDisplay.innerHTML = '';
        calcDisplay.innerHTML += btnValue;
    } else {
        calcDisplay.innerHTML += btnValue;
    }
}

calcBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const btnValue = btn.getAttribute('value');

        switch (true) {
            case isDigit(btnValue):
                if (LAST_OPERATION === '=') {
                    calcClear();
                }
                updateDisplay(btnValue);
                break;
            case isAction(btnValue):
                makeAction(btnValue);
                break;
            case isOperation(btnValue):
                btn.classList.toggle('calc__btn_active');

                // clear display and save operation for the next value
                if (LAST_OPERATION === "=") {
                    calcEqualBtn.classList.toggle('calc__btn_active');
                    displayClear();
                    LAST_OPERATION = btnValue;
                    break;
                }

                // if it's first operation we have to set value to display value, otherwise will happen next:
                // first value = 8, operation = -, second value = 3, result = 0-8-3 = -11
                if (IS_FIRST_OPERATION) {
                    VALUE = getDisplayValue();
                    displayClear();
                    LAST_OPERATION = btnValue;
                    IS_FIRST_OPERATION = false;
                } else {
                    makeOperation(btnValue);
                }
                break;
        }
    });
});
