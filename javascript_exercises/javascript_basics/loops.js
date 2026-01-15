/* 1 */
const names = ["Ashley", "Donovan", "Lucas"];
const ages = [23, 47, 18];
const people = [];

for (let i = 0; i < names.length; i++) {
    people.push({ name: names[i], age: ages[i] });
}

console.log(people);

/* 2 */
for (let person of people) {
    console.log(`${person.name} is ${person.age} years old`);
}

/* 3 */
const posts = [
    { id: 1, text: "Love this product" },
    { id: 2, text: "This is the worst. DON'T BUY!" },
    { id: 3, text: "So glad I found this. Bought four already!" }
];

for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === 2) {
        posts.splice(i, 1);
        break;
    }
}

/* 4 */
const postIDToFind = 2;
const commentIDToRemove = 3;

for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postIDToFind) {
        for (let j = 0; j < posts[i].comments.length; j++) {
            if (posts[i].comments[j].id === commentIDToRemove) {
                posts[i].comments.splice(j, 1);
                break;
            }
        }
    }
}

/* 5 */
const dictionary = {
    "A": ["Aardvark", "Abacus", "Actually", "Atomic"],
    "B": ["Banana", "Bonkers", "Brain", "Bump"],
    "C": ["Callous", "Chain", "Coil", "Czech"]
};

const keys = Object.keys(dictionary);

for (let key of keys) {
    console.log(`Words that begin with ${key}:`);
    for (let word of dictionary[key]) {
        console.log(`    ${word}`);
    }
}