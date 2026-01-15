/*  1 */
const p1 = {
    name: "Robert",
    age: 25,
    city: "Tel Aviv"
};

const p2 = {
    name: "Jill",
    age: 25,
    city: "Tel Aviv"
};

if (p1.age === p2.age) {
    if (p1.city === p2.city) {
        console.log("Jill wanted to date Robert");
    } else {
        console.log("Jill wanted to date Robert, but couldn't");
    }
}

/* 2 */
const library = {
    books: [
        { title: "The Hobbit", author: "J.R.R. Tolkien" },
        { title: "1984", author: "George Orwell" },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { title: "Brave New World", author: "Aldous Huxley" },
        { title: "Dune", author: "Frank Herbert" }
    ]
};

/* 3 */
const reservations = {
    Bob: { claimed: false },
    Ted: { claimed: true }
};

let inputName = "TeD";
const formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();

if (reservations[formattedName]) {
    if (!reservations[formattedName].claimed) {
        console.log("Welcome, " + formattedName);
    } else {
        console.log("Hmm, someone already claimed this reservation");
    }
} else {
    console.log("You have no reservation. Adding you now...");
    reservations[formattedName] = { claimed: true };
}

/* 4 */
const date = 3;
const kitchen = {
    owner: "Geraldine",
    hasOven: true,
    fridge: {
        price: 500,
        works: false,
        items: [
            { name: "cheese", expiryDate: 7 },
            { name: "radish", expiryDate: 2 },
            { name: "bread", expiryDate: 1 }
        ]
    }
};
const owner = kitchen.owner;
const item = kitchen.fridge.items[1];
const expiredDays = date - item.expiryDate;
const fridgeWorks = kitchen.fridge.works;
const hasOven = kitchen.hasOven;
const repairCost = kitchen.fridge.price / 2;

let message = `${owner}'s ${item.name} expired ${expiredDays} day ago. `;

if (fridgeWorks) {
    message += `Weird, considering her fridge works. `;
} else {
    message += `Probably because her fridge doesn't work. `;
}

if (hasOven) {
    message += `Luckily, she has an oven to cook the ${item.name} in. `;
} else {
    message += `Too bad she doesn't have an oven to cook the ${item.name} in. `;
}

if (!fridgeWorks) {
    message += `And she'll have to pay ${repairCost} to fix the fridge.`;
}

console.log(message);