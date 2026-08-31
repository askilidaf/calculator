let g1 = "#eee",
    g2 = "#ddd",
    g3 = "#777",
    g4 = "#333",
    g5 = "#555";

document.documentElement.style.setProperty("--g1", g1);
document.documentElement.style.setProperty("--g2", g2);
document.documentElement.style.setProperty("--g3", g3);
document.documentElement.style.setProperty("--g4", g4);
document.documentElement.style.setProperty("--g5", g5);

let num1 = null,
    num2 = null,
    operation = null;

function addDigit(digit) {
    equation.textContent = "";

    if (operation === null) {
        num1 = num1 === null? digit : num1 * 10 + digit;
        result.textContent = num1;
    } else {
        num2 = num2 === null? digit : num2 * 10 + digit;
        result.textContent = `${num1} ${operation} ${num2}`;
    }
}

function addOperation(op) {
    if (operation !== null) operate();
    else equation.textContent = "";
    if (num1 !== null) {
        operation = op === "add" ?
                        "+" :
                    op === "sub" ?
                        "-" :
                    op === "mul" ?
                        "×" :
                        "÷";
        result.textContent = `${num1} ${operation}`;
    }
}

function operate() {
    if (num2 === null) return;
    equation.textContent = `${num1} ${operation} ${num2}`;
    num1 =  operation === "+" ?
                num1 + num2 :
            operation === "-" ?
                num1 - num2 :
            operation === "×" ?
                num1 * num2 :
            num2 !== 0 ?
                Math.round(num1 / num2) :
                null;
    result.textContent = num1 === null? "" : num1;
    operation = null;
    num2 = null;
}

function clear() {
    equation.textContent = "";
    result.textContent = "";
    num1 = null;
    operation = null;
    num2 = null;
}

function del() {
    equation.textContent = "";
    if (num2 !== null) {
        if (num2 < 10) {
            num2 = null;
            result.textContent = `${num1} ${operation}`;
        } else {
            num2 = (num2 - num2 % 10) / 10;
            result.textContent = `${num1} ${operation} ${num2}`;
        }
    } else if (operation !== null) {
        operation = null;
        result.textContent = num1;
    } else if (num1 != null) {
        if (num1 < 10) {
            num1 = null;
            result.textContent = "";
        } else {
            num1 = (num1 - num1 % 10) / 10;
            result.textContent = num1;
        }
    }
}

const content = document.querySelector("#content");
content.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "BUTTON")
        e.target.style.backgroundColor = g5;
});
content.addEventListener("mouseout", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.id !== "decimal")
        e.target.style.backgroundColor = g4;
});

const equation = document.querySelector("#equation");
const result = document.querySelector("#result");

for (let i=0; i<=9; i++) {
    const n = document.querySelector(`#n${i}`);
    n.addEventListener("click", () => addDigit(i));
}

for (let i of ["add", "sub", "mul", "div"]) {
    const op = document.querySelector(`#${i}`);
    op.addEventListener("click", () => addOperation(i));
}

const equal = document.querySelector("#equals");
equals.addEventListener("click", () => operate());

const ac = document.querySelector("#ac");
ac.addEventListener("click", () => clear());

const ce = document.querySelector("#ce");
ce.addEventListener("click", () => del());

content.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON")
        console.log(`${num1} ${operation} ${num2}`);
});