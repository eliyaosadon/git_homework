// bankLogic
let balance = 0;

const getBalance = () => {
    return balance;
};

const deposit = (amount) => {
    if (amount <= 0) return { success: false, message: "Amount must be positive" };
    balance += amount;
    return { success: true, newBalance: balance };
};

const withdraw = (amount) => {
    if (amount <= 0) return { success: false, message: "Amount must be positive" };
    if (amount > balance) return { success: false, message: "Insufficient funds" };

    balance -= amount;
    return { success: true, newBalance: balance };
};

module.exports = {
    getBalance,
    deposit,
    withdraw
};