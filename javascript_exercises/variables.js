// First example //
// console.log("Hello World!")

// First exercise //

const maxCapacity = 14;
console.log(maxCapacity);

let surfTime = true;
console.log(surfTime);

let bestStudent;
console.log(bestStudent);

// const purposeInLife; // You cant undefine a const value!
// console.log(purposeInLife);

// Second exercise //

const myVariable = "I got a new car";
const result = myVariable + " is the best thing ever!";
console.log(result);

let myVariable2 = "I got a new car";
myVariable2 = myVariable2 + " is the best thing ever!";
console.log(myVariable2);

// Third exercise //

const password = "12345";
const confirmPassword = "123456";
console.log(password === confirmPassword);

// Fourth exercise //

// We can only change the numbers in each variable and the action ( * , / )
// const firstNum = 12;
// const secondNum = 423;

const firstNum = 2;
const secondNum = 802;

// const firstResult = firstNum * secondNum;
// console.log(firstResult);
const secondResult = secondNum / firstNum; 
console.log(secondResult);

const thirdResult = (5 + 6) * 3;
console.log(thirdResult);

// Fifth exercise //

 let first = (5 > 2) && false;
 console.log(first);

 let second = !("knife" == "sword");
 console.log(second);

 let third = (1 < 2) || (-1 > -1) || !false;
 console.log(third);

 let fourth = (31 % 5) == "1";
 console.log(fourth); 

 let fifth =  !!true;
 console.log(fifth);

 let sixth = "5th Avenue" != "5th Avenue";
 console.log(sixth);

 let seventh = 52 !== "52";
 console.log(seventh);
 
 let eight = (undefined || null);
 console.log(eight);

 // Sixth exercise //
 let a = 3;
 a = 4;
 let c = 0;
 let b = a;
 b = 2;
 a = b;
 b = c;
 c = a;
 a = b;

 console.log(a , b , c);

 
