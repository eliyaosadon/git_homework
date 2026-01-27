// Simulated inventory database
const inventory = {
    'laptop': { price: 999, stock: 5 },
    'mouse': { price: 25, stock: 10 },
    'keyboard': { price: 75, stock: 0 },
    'monitor': { price: 299, stock: 3 }
};

function checkInventory(items) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Checking inventory...");
            for (let item of items) {
                if (!inventory[item] || inventory[item].stock <= 0) {
                    reject(new Error(`Item ${item} is out of stock`));
                    return;
                }
            }
            resolve(items);
        }, 500);
    });
}

function calculateTotal(items) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Calculating total...");
            let subtotal = 0;
            items.forEach(item => {
                subtotal += inventory[item].price;
            });
            const tax = subtotal * 0.08;
            const total = subtotal + tax;
            resolve({ subtotal, tax, total });
        }, 200);
    });
}

function processPayment(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Processing payment of $${amount.toFixed(2)}...`);
            if (Math.random() > 0.1) { // 90% success
                resolve({
                    transactionId: 'TXN-' + Math.floor(Math.random() * 100000),
                    amount: amount,
                    status: 'success'
                });
            } else {
                reject(new Error("Payment declined"));
            }
        }, 1500);
    });
}

function updateInventory(items) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Updating inventory...");
            items.forEach(item => {
                inventory[item].stock--;
            });
            resolve("Inventory updated");
        }, 300);
    });
}

// The Checkout Flow
function checkout(itemNames) {
    return checkInventory(itemNames)
        .then(() => {
            return calculateTotal(itemNames);
        })
        .then((totals) => {
            return processPayment(totals.total);
        })
        .then((paymentResult) => {
            return updateInventory(itemNames).then(() => {
                return {
                    status: "Order Placed",
                    details: paymentResult
                };
            });
        });
}

checkout(['laptop', 'mouse'])
    .then(result => console.log('\n✅ Order success:', result))
    .catch(error => console.log('\n❌ Order failed:', error.message));

/*
checkout(['laptop', 'keyboard'])
  .then(result => console.log('\n✅ Order success:', result))
  .catch(error => console.log('\n❌ Order failed:', error.message));
*/