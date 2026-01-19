// quiz
const prompt = require('prompt-sync')();

const questions = [
    { text: "What is 2 + 2?", answer: "4" },
    { text: "What is the capital of France?", answer: "Paris" },
    { text: "What year is it?", answer: new Date().getFullYear().toString() }
];

let score = 0;

console.log("--- QUIZ START ---");

for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const userAnswer = prompt(`Question ${i + 1}: ${q.text} `);
    if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
        console.log("Correct!");
        score++;
    } else {
        console.log(`Wrong. The answer was ${q.answer}`);
    }
}

console.log(`\nFinal Score: ${score}/${questions.length} correct!`);