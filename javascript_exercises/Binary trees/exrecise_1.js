class BSNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insertNode(newVal) {
        if (!this.value) {
            this.value = newVal;
        } else if (newVal > this.value && this.right) {
            this.right.insertNode(newVal);
        } else if (newVal > this.value) {
            this.right = new BSNode(newVal);
        } else if (newVal < this.value && this.left) {
            this.left.insertNode(newVal);
        } else if (newVal < this.value) {
            this.left = new BSNode(newVal);
        }
    }

    // --- EXERCISE 1 ---
    findNode(value) {
        if (this.value === value) return true;

        if (value < this.value && this.left) {
            return this.left.findNode(value);
        }

        if (value > this.value && this.right) {
            return this.right.findNode(value);
        }

        return false;
    }

    // --- EXERCISE 2 ---
    findCommonParent(v1, v2) {
        if (v1 < this.value && v2 < this.value) {
            return this.left.findCommonParent(v1, v2)
        }

        if (v1 > this.value && v2 > this.value) {
            return this.right.findCommonParent(v1, v2)
        }

        return this.value
    }

    // --- EXERCISE 3 ---
    removeNode(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            let tempNode = node.left;
            while (tempNode.right) {
                tempNode = tempNode.right;
            }
            node.value = tempNode.value;
            node.left = this.removeNode(node.left, tempNode.value);
            return node;
        }
    }
}

// --- TEST 1 ---
const letters = ["H", "E", "S", "G", "L", "Y", "I"];
const bSTree = new BSNode();
letters.forEach(l => bSTree.insertNode(l));

console.log("--- Exercise 1 Results ---");
console.log(bSTree.findNode("H"));
console.log(bSTree.findNode("G"));
console.log(bSTree.findNode("Z"));
console.log(bSTree.findNode("F"));
console.log(bSTree.findNode("y"));

// --- TEST 2 ---
const letters2 = ["J", "H", "R", "E", "S", "P", "G", "B", "L", "Y", "I"];
const bSTree2 = new BSNode();
letters2.forEach(l => bSTree2.insertNode(l));

console.log("\n--- Exercise 2 Results ---");
console.log(bSTree2.findCommonParent("B", "I"));
console.log(bSTree2.findCommonParent("B", "G"));
console.log(bSTree2.findCommonParent("B", "L"));
console.log(bSTree2.findCommonParent("L", "Y"));
console.log(bSTree2.findCommonParent("E", "H")); 

// --- TEST 3 ---
const numbers = [8, 9, 12, 3, 5, 1, 11, 4];
let nodeWithOneChild = new BSNode();
numbers.forEach(n => nodeWithOneChild.insertNode(n));

console.log("\n--- Exercise 3 Results ---");

console.log("Tree before removing 9:", JSON.stringify(nodeWithOneChild));
nodeWithOneChild.removeNode(nodeWithOneChild, 9);
console.log("Tree after removing 9:", JSON.stringify(nodeWithOneChild));

let nodeWithTwoChildren = new BSNode();
numbers.forEach(n => nodeWithTwoChildren.insertNode(n));

nodeWithTwoChildren.removeNode(nodeWithTwoChildren, 8);
console.log("Tree after removing root 8:", JSON.stringify(nodeWithTwoChildren));