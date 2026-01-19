// calculator
const args = process.argv;
const num1 = parseFloat(args[2]);
const op = args[3];
const num2 = parseFloat(args[4]);

if (isNaN(num1) || isNaN(num2)) {
    console.log("Error: Please provide valid numbers.");
    process.exit(1);
}

let result;

switch (op) {
    case '+':
        result = num1 + num2;
        break;
    case '-':
        result = num1 - num2;
        break;
    case 'x':
    case '*':
        result = num1 * num2;
        break;
    case '/':
        if (num2 === 0) {
            console.log("Error: Cannot divide by zero");
            process.exit(1);
        }
        result = num1 / num2;
        break;
    default:
        console.log("Invalid operation. Use +, -, *, /");
        process.exit(1);
}

console.log(`${num1} ${op} ${num2} = ${result}`);