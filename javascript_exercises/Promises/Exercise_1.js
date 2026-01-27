function checkLuckyNumber(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num <= 0 || typeof num !== 'number') {
                reject(new Error("Invalid number"));
            } else if (num % 7 === 0) {
                resolve("Lucky!");
            } else {
                resolve("Not lucky");
            }
        }, 800);
    });
}

checkLuckyNumber(14)
    .then(msg => console.log("14 is:", msg))
    .catch(err => console.error(err));

checkLuckyNumber(5)
    .then(msg => console.log("5 is:", msg))
    .catch(err => console.error(err));

checkLuckyNumber(-1)
    .then(msg => console.log(msg))
    .catch(err => console.error("Error for -1:", err.message));