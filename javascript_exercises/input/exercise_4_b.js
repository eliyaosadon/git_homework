// main
const prompt = require('prompt-sync')();
const bank = require('./bankLogic');

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
            console.log(`Current Balance: $${bank.getBalance()}`);
            break;

        case '2':
            const depAmount = parseFloat(prompt("Enter amount to deposit: "));
            const depResult = bank.deposit(depAmount);
            if (depResult.success) {
                console.log(`Deposited. New Balance: $${depResult.newBalance}`);
            } else {
                console.log(`Error: ${depResult.message}`);
            }
            break;

        case '3':
            const withAmount = parseFloat(prompt("Enter amount to withdraw: "));
            const withResult = bank.withdraw(withAmount);
            if (withResult.success) {
                console.log(`Withdrawn. New Balance: $${withResult.newBalance}`);
            } else {
                console.log(`Error: ${withResult.message}`);
            }
            break;

        case '4':
            console.log("Goodbye!");
            isRunning = false;
            break;

        default:
            console.log("Invalid option.");
    }
}