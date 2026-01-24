const readline = require('readline');
const AutoCompleteTrie = require('./AutoCompleteTrie');

const trie = new AutoCompleteTrie();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands\n");

const promptUser = () => {
    rl.question('> ', (line) => {
        const args = line.trim().split(' ');
        const command = args[0].toLowerCase();
        const argument = args[1];

        switch (command) {
            case 'add':
                if (!argument) console.log("⚠  Please provide a word to add.");
                else {
                    trie.addWord(argument);
                    console.log(`✓ Added '${argument}' to dictionary`);
                }
                break;

            case 'find':
                if (!argument) console.log("⚠  Please provide a word to find.");
                else {
                    const exists = trie.findWord(argument);
                    if (exists) console.log(`✓ '${argument}' exists in dictionary`);
                    else console.log(`✗ '${argument}' not found in dictionary`);
                }
                break;

            case 'complete':
                if (!argument) console.log("⚠  Please provide a prefix.");
                else {
                    const suggestions = trie.predictWords(argument);
                    if (suggestions.length > 0) {
                        console.log(`Suggestions for '${argument}': ${suggestions.join(', ')}`);
                    } else {
                        console.log(`No suggestions found for '${argument}'`);
                    }
                }
                break;

            case 'use':
                if (!argument) console.log("⚠  Please provide a word to use.");
                else {
                    const newFreq = trie.use(argument);
                    if (newFreq !== null) {
                        console.log(`✓ Incremented usage for '${argument}' (now ${newFreq})`);
                    } else {
                        console.log(`✗ Cannot use '${argument}' - word not in dictionary`);
                    }
                }
                break;

            case 'help':
                console.log(`
Commands:
  add <word>        - Add word to dictionary
  find <word>       - Check if word exists
  complete <prefix> - Get completions (ranked by frequency)
  use <word>        - Increment frequency of a word
  help              - Show this message
  exit              - Quit program
                `);
                break;

            case 'exit':
                console.log("Goodbye!");
                rl.close();
                return;

            default:
                console.log("Unknown command. Type 'help' for options.");
                break;
        }

        promptUser();
    });
};

promptUser();