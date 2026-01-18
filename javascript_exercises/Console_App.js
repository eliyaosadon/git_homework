// 1
const num1 = parseFloat(process.argv[2]);
const operation = process.argv[3];
const num2 = parseFloat(process.argv[4]);

if (isNaN(num1) || isNaN(num2)) {
    console.log("Please provide valid numbers.");
    console.log("Usage: node calculator.js 10 + 5");
    process.exit(1);
}

let result;

switch (operation) {
    case '+':
        result = num1 + num2;
        break;
    case '-':
        result = num1 - num2;
        break;
    case '*':
        result = num1 * num2;
        break;
    case '/':
        if (num2 === 0) {
            console.log("Error: Cannot divide by zero.");
            process.exit(1);
        }
        result = num1 / num2;
        break;
    default:
        console.log("Invalid operation. Use +, -, *, or /");
        process.exit(1);
}

console.log(`${num1} ${operation} ${num2} = ${result}`);

// 2
// const prompt = require('prompt-sync')();

// const questions = [
//     { text: "What is 2 + 2?", answer: "4" },
//     { text: "What is the capital of France?", answer: "Paris" },
//     { text: "What year is it?", answer: new Date().getFullYear().toString() }
// ];

// let score = 0;

// console.log("=== QUIZ TIME ===");

// for (let i = 0; i < questions.length; i++) {
//     const q = questions[i];
//     const userAnswer = prompt(`Question ${i + 1}: ${q.text} `);

//     if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
//         console.log("Correct!");
//         score++;
//     } else {
//         console.log(`Wrong! The answer was ${q.answer}`);
//     }
// }

// console.log(`\nFinal Score: ${score}/${questions.length} correct!`);

// 3
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', (name) => {
    rl.question('What is your email? ', (email) => {
        rl.question('What is your age? ', (age) => {
            rl.question('What is your favorite color? ', (color) => {

                console.log("\n=== Registration Summary ===");
                console.log(`Name: ${name}`);
                console.log(`Email: ${email}`);
                console.log(`Age: ${age}`);
                console.log(`Favorite Color: ${color}`);

                rl.close();
            });
        });
    });
});


// 4
const prompt = require('prompt-sync')();

let balance = 100;
let isRunning = true;

while (isRunning) {
    console.log("\n=== Banking System ===");
    console.log("1) Check Balance");
    console.log("2) Deposit Money");
    console.log("3) Withdraw Money");
    console.log("4) Exit");

    const choice = prompt("Choose option (1-4): ");

    switch (choice) {
        case '1':
            console.log(`Current balance: $${balance}`);
            break;

        case '2':
            const depositAmount = parseFloat(prompt("Enter amount to deposit: "));
            if (depositAmount > 0) {
                balance += depositAmount;
                console.log(`Deposited $${depositAmount}. New balance: $${balance}`);
            } else {
                console.log("Invalid amount.");
            }
            break;

        case '3':
            const withdrawAmount = parseFloat(prompt("Enter amount to withdraw: "));
            if (withdrawAmount > 0 && withdrawAmount <= balance) {
                balance -= withdrawAmount;
                console.log(`Withdrew $${withdrawAmount}. New balance: $${balance}`);
            } else if (withdrawAmount > balance) {
                console.log("Insufficient funds.");
            } else {
                console.log("Invalid amount.");
            }
            break;

        case '4':
            console.log("Goodbye!");
            isRunning = false;
            break;

        default:
            console.log("Invalid option, please try again.");
    }
}
