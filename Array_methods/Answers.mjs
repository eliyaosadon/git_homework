import { users } from './usersData.mjs';

// 1

const userContactInfo = users.map(u => ({
    email: u.email,
    companyName: u.company.name
}));

// console.log(userContactInfo);

// 2 & 3

const zipIds = users
    .filter(u => u.address.zipcode.startsWith("5"))
    .map(u => u.id); // [3, 4, 7]

// console.log(zipIds);

// 4

const namesC = users
    .map(u => u.name)
    .filter(name => name.startsWith("C"));

// console.log(namesC);

// 5

const allInSouthChristy = users.every(u => u.address.city === "South Christy");
console.log(allInSouthChristy);

// 6

const companyBySuite = users.find(u => u.address.suite === "Apt. 950").company.name;
console.log(companyBySuite);

// 7

const showSummary = (user) => {
    console.log(`${user.name} lives in ${user.address.city}, and owns the company ${user.company.name}`);
};

users.forEach(showSummary);

// 8
const inventory = [
    { name: "Laptop", price: 899.99, quantity: 5 },
    { name: "Mouse", price: 24.99, quantity: 12 },
    { name: "Keyboard", price: 79.99, quantity: 8 },
    { name: "Monitor", price: 249.99, quantity: 3 },
    { name: "Headphones", price: 149.99, quantity: 6 }
];

const inventoryTotal = inventory.reduce((acc, item) => acc + (item.price * item.quantity), 0);

// console.log(inventoryTotal);

// 9
let studentScores = [92, 87, 76, 95, 88, 72, 91, 83, 79, 96, 85, 74, 89, 93, 81]

const gradeCounts = studentScores.reduce((acc, score) => {
    if (score >= 90) {
        acc.A++;
    } else if (score >= 79) {
        acc.B++;
    } else if (score >= 70) {
        acc.C++;
    } else {
        acc.F++;
    }
    return acc;
}, { A: 0, B: 0, C: 0, F: 0 });

console.log(gradeCounts);

// 10

let cartItems = [
    { name: "T-shirt", price: 19.99, category: "clothing", quantity: 2 },
    { name: "Laptop", price: 1299.99, category: "electronics", quantity: 1 },
    { name: "Coffee Beans", price: 12.99, category: "food", quantity: 3 },
    { name: "Headphones", price: 89.99, category: "electronics", quantity: 1 },
    { name: "Jeans", price: 59.99, category: "clothing", quantity: 1 }
]

let taxRates = {
    clothing: 0.08,    // 8% tax
    electronics: 0.10, // 10% tax  
    food: 0.05        // 5% tax
}

const finalTotal = cartItems.reduce((total, item) => {
    const lineItemTotal = item.price * item.quantity;
    const taxRate = taxRates[item.category];
    const itemWithTax = lineItemTotal * (1 + taxRate);

    console.log(`Item: ${item.name}, Total with Tax: ${itemWithTax.toFixed(4)}`);

    return total + itemWithTax;
}, 0);

console.log("Final Result:", finalTotal);
