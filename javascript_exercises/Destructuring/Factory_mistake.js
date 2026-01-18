// 1
let meatArr = ["beef", "chicken"];
let vegetableArr = ["rabbit", "carrots", "potatoes", "lettuce"];

let [rabbit, ...cleanVegetables] = vegetableArr;
meatArr = [...meatArr, rabbit];
vegetableArr = cleanVegetables;

console.log("Meat:", meatArr);
console.log("Vegetables:", vegetableArr);

// 2
var firstPiece = { id: 101, name: 'Ofri' };
var secondPiece = { country: 'Israel' };

const fullPassport = { ...firstPiece, ...secondPiece };

console.log(fullPassport);

// 3
let employeesArr = [
    { name: "Joey", id: 1, age: 26 },
    { name: "Lily", id: null, age: 24 },
    { name: "Alice", id: 7, age: null },
    { name: "Sam", id: 8, age: 24 },
    { name: "Ray", id: null, age: null }
];

employeesArr.forEach(employee => {

    if ((employee.id ?? "MISSING") === "MISSING" || (employee.age ?? "MISSING") === "MISSING") {
        console.log(employee.name);
    }
});
