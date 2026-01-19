// registration
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- Registration ---");

rl.question('Name: ', (name) => {
    rl.question('Email: ', (email) => {
        rl.question('Age: ', (age) => {
            rl.question('Favorite Color: ', (color) => {
                
                console.log("\nRegistration Summary:");
                console.log(`Name: ${name}`);
                console.log(`Email: ${email}`);
                console.log(`Age: ${age}`);
                console.log(`Favorite Color: ${color}`);

                rl.close();
            });
        });
    });
});