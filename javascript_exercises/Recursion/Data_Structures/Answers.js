// 1
class UniqueArray {
    constructor() {
        this.items = [];
        this.seenItems = {};
    }

    add(item) {
        if (!this.seenItems[item]) {
            this.items.push(item);
            this.seenItems[item] = true;
        }
    }

    showAll() {
        console.log(this.items);
    }

    exists(item) {
        return !!this.seenItems[item];
    }

    get(index) {
        if (index >= 0 && index < this.items.length) {
            return this.items[index];
        }
        return -1;
    }
}

// --- TEST CODE ---
const uniqueStuff = new UniqueArray();
uniqueStuff.add("toy");
uniqueStuff.showAll();
uniqueStuff.add("toy");
uniqueStuff.showAll();
console.log(uniqueStuff.exists("toy"));
uniqueStuff.add("poster");
uniqueStuff.add("hydrogen");
console.log(uniqueStuff.get(2));

// 2
class UniqueArray {
    constructor() {
        this.items = [];
        this.seenItems = {};
    }

    add(item) {
        const key = this.makeKey(item);

        if (!this.seenItems[key]) {
            this.items.push(item);
            this.seenItems[key] = true;
        }
    }

    showAll() {
        console.log(this.items);
    }

    exists(item) {
        const key = this.makeKey(item);
        return !!this.seenItems[key];
    }

    get(index) {
        if (index >= 0 && index < this.items.length) {
            return this.items[index];
        }
        return -1;
    }

    makeKey(item) {
        if (typeof item === 'object' && item !== null) {
            return JSON.stringify(item);
        }
        return item;
    }
}

// --- TEST CODE ---
const complexStuff = new UniqueArray();
complexStuff.add({ x: 3 });
complexStuff.add({ x: 3 });
complexStuff.showAll();
complexStuff.add("hello");
complexStuff.add("hello");
complexStuff.showAll();

console.log(complexStuff.exists({ x: 3 }));
console.log(complexStuff.exists({ x: 4 })); 