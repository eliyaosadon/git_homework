class AutoCompleteTrie {
    constructor(value = null) {
        this.value = value;
        this.children = {};
        this.endOfWord = false;
        this.frequency = 0;
    }

    addWord(word) {
        const cleanWord = word.toLowerCase();

        let currentNode = this;

        for (const char of cleanWord) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new AutoCompleteTrie(char);
            }
            currentNode = currentNode.children[char];
        }

        currentNode.endOfWord = true;
    }

    findWord(word) {
        const node = this._getRemainingTree(word.toLowerCase());
        return node ? node.endOfWord : false;
    }

    use(word) {
        const node = this._getRemainingTree(word.toLowerCase());
        if (node && node.endOfWord) {
            node.frequency++;
            return node.frequency;
        }
        return null;
    }

    predictWords(prefix) {
        const cleanPrefix = prefix.toLowerCase();
        const rootNode = this._getRemainingTree(cleanPrefix);

        if (!rootNode) return [];

        const allWords = [];
        this._allWordsHelper(cleanPrefix, rootNode, allWords);

        return allWords.sort((a, b) => {
            if (b.frequency !== a.frequency) {
                return b.frequency - a.frequency;
            }
            return a.word.localeCompare(b.word);
        }).map(item => `${item.word} (freq: ${item.frequency})`);
    }

    _getRemainingTree(prefix, node = this) {
        let currentNode = node;
        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return null;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode;
    }

    _allWordsHelper(prefix, node, allWords) {
        if (node.endOfWord) {
            allWords.push({ word: prefix, frequency: node.frequency });
        }

        for (const childKey in node.children) {
            this._allWordsHelper(
                prefix + childKey,
                node.children[childKey],
                allWords
            );
        }
    }
}

module.exports = AutoCompleteTrie;