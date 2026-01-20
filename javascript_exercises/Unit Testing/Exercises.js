class Exercises {
    // Exercise 1
    isEven(n) {
        return n % 2 == 0 ? true : false;
    }

    // Exercise 2
    removeAtLeastOne(arr) {
        let numItemsToRemove = Math.floor(Math.random() * (arr.length - 1)) + 1;
        arr.splice(0, numItemsToRemove);
        return arr;
    }

    // Exercise 3
    simplify(str) {
        let symbols = ["!", "#", ".", ",", "'"];
        return str.split("").filter(c => symbols.indexOf(c) == -1).join("");
    }

    // Exercise 4 
    validate(arr) {
        const booleans = arr.filter(item => typeof item === 'boolean');

        if (booleans.length === 0) {
            return { error: "Need at least one boolean" };
        }

        const trueCount = booleans.filter(b => b === true).length;
        const falseCount = booleans.filter(b => b === false).length;

        if (trueCount > falseCount) {
            return true;
        } else {
            return false;
        }
    }

    add(x, y) {
        let stuff = [];
        stuff.push(x, y);
    }
}

module.exports = Exercises;