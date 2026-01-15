/*  1 */
const people_info = [
    { name: "ashley", age: 1990, profession: "developer", catchphrase: "it's working" },
    { name: "ben", age: 1985, profession: "teacher", catchphrase: "pay attention" }
];

const getAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getSummary = (person) => {
    let summary = "";
    summary += capitalize(person.name);
    summary += ` is ${getAge(person.age)} years old. `;
    summary += `They are a ${capitalize(person.profession)} `;
    summary += `who says "${capitalize(person.catchphrase)}".`;
    return summary;
};

for (let person of people_info) {
    console.log(getSummary(person));
}

/*  2 */
const story = "In the beginning there was light. Then there were wolves. Finally there was a big fire. Ultimately, Shelob the wolf-master put out the fire with her feet. But until then, the fire caused one heck of a lot of damage.";
const specialChars = [",", ".", "'", '"', "?", "!", ";"];
const wordCounts = {};


function cleanText(sentence) {
    let cleanedString = sentence.toLowerCase();

    for (let char of specialChars) {
        cleanedString = cleanedString.split(char).join("");
    }

    return cleanedString.split(" ");
}

function addToCounter(word) {
    if (wordCounts[word]) {
        wordCounts[word]++;
    } else {
        wordCounts[word] = 1;
    }
}

function countWords(sentence) {
    const words = cleanText(sentence);

    for (let word of words) {
        addToCounter(word);
    }
}
countWords(story);
console.log(wordCounts);