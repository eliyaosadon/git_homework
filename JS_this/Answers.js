// 1

const person = {
    hungry: true,
    feed: function () {
        if (this.hungry) { // הוספת this
            this.hungry = false;
            console.log('Im no longer hungry!')
        }
    }
}
person.feed()

// 2
const pump = function (amount) {
    this.liters += amount; // שימוש ב-this
    console.log('You put ' + amount + ' liters in ' + this.name); // amount הוא פרמטר, לא this
};

const garage = {
    car1: { name: 'Audi', liters: 3, fillTank: pump },
    car2: { name: 'Mercedes', liters: 1, fillTank: pump }
};

garage.car1.fillTank(2);
garage.car2.fillTank(30);

// 3
const pumpFuel = function (plane) {
    plane.fuel += 1;
};

const airplane = {
    fuel: 0, // beginning 
    fly: function () {
        if (this.fuel < 2) { // this
            return 'on the ground!';
        }
        return 'flying!';
    }
};

// 4
const tipJar = {
    coinCount: 20,
    tip: function () {
        this.coinCount += 1;
    },
    stealCoins: function (amount) { // method
        this.coinCount -= amount;
    }
};

// 5
const revealSecret = function () {
    return this.secret; // this
};

const shoutIt = function (person, func) {
    person.revealItAll = func;
    const result = person.revealItAll();
    console.log(person.name + " said: " + result); // +
};

const avi = {
    name: "Avi", // ,
    secret: "Im scared of snakes!"
};

const narkis = {
    name: "Narkis", // ,
    secret: "I don't have secrets because I'm zen like that."
};

// 6 
const coffeeShop = {
    beans: 40,
    money: 100,

    drinkRequirements: {
        latte: { beanRequirement: 10, price: 5 },
        americano: { beanRequirement: 5, price: 3 },
        doubleShot: { beanRequirement: 15, price: 7 },
        frenchPress: { beanRequirement: 12, price: 6 }
    },

    buyBeans: function (numBeans) {
        const cost = numBeans * 2; // cost 2
        if (this.money >= cost) {
            this.money -= cost;
            this.beans += numBeans;
            console.log(`Bought ${numBeans} beans. Money left: ${this.money}`);
        } else {
            console.log("Not enough money to buy beans!");
        }
    },

    makeDrink: function (drinkType) {
        const drink = this.drinkRequirements[drinkType];

        if (!drink) {
            console.log("Sorry, we don't make " + drinkType);
            return false;
        }

        if (this.beans < drink.beanRequirement) {
            console.log("Sorry, we're all out of beans!");
            return false;
        }

        this.beans -= drink.beanRequirement;
        console.log(`Making ${drinkType}...`);
        return true;
    },

    buyDrink: function (drinkType) {
        const drink = this.drinkRequirements[drinkType];
        if (drink) {
            this.money += drink.price;
            this.makeDrink(drinkType);
        }
    }
};

coffeeShop.buyDrink("latte");
coffeeShop.buyDrink("filtered");
coffeeShop.buyBeans(20);