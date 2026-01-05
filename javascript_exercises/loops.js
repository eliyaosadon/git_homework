// Exercise 1 //
const names = ['Eliya', 'Amit', 'Agam', 'Liam'];
const ages = [20, 15, 19, 20];

for (let i = 0; i < names.length; i++) {
    console.log(names[i] + " is " + ages[i] + " years old ")
}


// Exercise 2 //
const numbers = [1, 3, 5, 2, 8];
let sum = 0;
for (let j = 0; j < numbers.length; j++) {
    sum += numbers[j];
}
console.log(sum);

// Exercise 3 //
const numbers = [1, 3, 5, 2, 8];
let sum = 0;
for (let j = 0; j < numbers.length; j++) {
    sum += numbers[j];
}
sum = sum / numbers.length;
console.log(sum);

// Exercise 4 //
let nums = [];
for (let a = 0; a < 100; a++) {
    nums[a] = a + 1;
}
console.log(nums);


// Exercise 5 //
for (let m = 0; m < nums.length; m++) {
    if (nums[m] % 2 !== 0) {
        console.log(nums[m])
    }
}


// Exercise 6 //
let nums2 = [773, 414, 213, 374, 434, 700, 506, 495, 852, 585, 271, 198, 689, 248, 708, 197, 96, 260, 921, 834, 258, 662, 501, 632, 715, 503, 538, 289, 596, 381, 817, 280, 968, 877, 431, 146, 491, 724, 83, 841, 174, 21, 460, 25, 785, 539, 291, 404, 903, 278, 159, 229, 216, 683, 84, 87, 879, 406, 661, 537, 890, 394, 382, 477, 271, 373, 82, 104, 709, 723, 333, 958, 95, 983, 732, 917, 324, 785, 754, 23, 659, 551, 408, 442, 766, 242, 611, 846, 802, 866, 817, 848, 227, 349, 243, 837, 21, 954, 146, 11]

for (let k = 0; k < nums2.length; k++) {
    if (nums2[k] === 709) {
        console.log(k)
    }
}

// Exercise 7 // 
const names = ["Ashley", "Donovan", "Lucas"]
const ages = [23, 47, 18]
const people = []

for (let i = 0; i < names.length; i++) {
    people.push({
        name: names[i],
        age: ages[i]
    })
}

console.log(people)

// Exercise 8 //
for (let i = 0; i < people.length; i++) {
    console.log(people[i].name + " is " + people[i].age + " years old")
}

// Exercise 9 //
const posts = [
    { id: 1, text: "Love this product" },
    { id: 2, text: "This is the worst. DON'T BUY!" },
    { id: 3, text: "So glad I found this. Bought four already!" }
]

for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === 2) {
        posts.splice(i, 1)
        break
    }
}

console.log(posts)


Exercise 10 //
const posts = [
    {
        id: 1,
        text: "Love this product",
        comments: []
    },
    {
        id: 2,
        text: "This is the worst. DON'T BUY!",
        comments: [
            { id: 1, text: "Idiot has no idea" },
            { id: 2, text: "Fool!" },
            { id: 3, text: "I agree!" }
        ]
    },
    {
        id: 3,
        text: "So glad I found this. Bought four already!",
        comments: []
    }
]

for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === 2) {

        const comments = posts[i].comments

        for (let j = 0; j < comments.length; j++) {
            if (comments[j].id === 3) {
                comments.splice(j, 1)
                break
            }
        }

    }
}

console.log(JSON.stringify(posts, null, 2))


// Extensions ! //
const dictionary = {
    A: ["Aardvark", "Abacus", "Actually", "Atomic"],
    B: ["Banana", "Bonkers", "Brain", "Bump"],
    C: ["Callous", "Chain", "Coil", "Czech"]
}

const letters = Object.keys(dictionary)

for (let i = 0; i < letters.length; i++) {
    console.log("Words that begin with " + letters[i] + ":")

    const words = dictionary[letters[i]]
    for (let j = 0; j < words.length; j++) {
        console.log("  " + words[j])
    }
}