/*  1 */
const isEven = function (num) {
    return num % 2 === 0;
};


/*  2 */
const printOdds = function (numbers) {
    for (let num of numbers) {
        if (!isEven(num)) {
            console.log(num);
        }
    }
};


/*  3 */
const checkExists = function (arr, num) {
    for (let item of arr) {
        if (item === num) {
            return true;
        }
    }
    return false;
};


/*  4 */
const calculator = {
    add: function (num1, num2) {
        return num1 + num2;
    },
    subtract: function (num1, num2) {
        return num1 - num2;
    }
};

const result1 = calculator.add(20, 1);
const result2 = calculator.subtract(30, 9);
console.log(calculator.add(result1, result2));


/*  5 */
const increaseByNameLength = (money, name) => money * name.length;

const makeRegal = (name) => "His Royal Highness, " + name;

const turnToKing = function (name, money) {
    name = name.toUpperCase();
    money = increaseByNameLength(money, name);
    name = makeRegal(name);

    console.log(name + " has " + money + " gold coins");
};

turnToKing("martin luther", 100);

/*  6 */
for (let i = 100; i <= 999; i++) {
    let numStr = i.toString();
    let digit1 = parseInt(numStr[0]);
    let digit2 = parseInt(numStr[1]);
    let digit3 = parseInt(numStr[2]);
    let sum = Math.pow(digit1, 3) + Math.pow(digit2, 3) + Math.pow(digit3, 3);

    if (sum === i) {
        console.log(i + " is an Armstrong number");
    }
}
