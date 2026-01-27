class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    findNode(prefix) {
        let node = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node;
    }

    collectWords(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push(prefix);
        }

        for (let char in node.children) {
            this.collectWords(node.children[char], prefix + char, results);
        }
    }

    autoComplete(prefix) {
        if (!prefix) return [];

        const prefixNode = this.findNode(prefix);
        if (!prefixNode) return [];

        const results = [];
        this.collectWords(prefixNode, prefix.toLowerCase(), results);
        return results;
    }
}