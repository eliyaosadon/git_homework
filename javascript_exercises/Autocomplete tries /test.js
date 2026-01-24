const assert = require('assert');
const AutoCompleteTrie = require('./AutoCompleteTrie');

console.log("Running Tests...");

const trie = new AutoCompleteTrie();

try {
    // --- Test 1 ---
    console.log("Test 1: Adding and Finding Words...");
    trie.addWord("cat");
    trie.addWord("car");
    assert.strictEqual(trie.findWord("cat"), true, "Cat should exist");
    assert.strictEqual(trie.findWord("car"), true, "Car should exist");
    assert.strictEqual(trie.findWord("dog"), false, "Dog should not exist");
    assert.strictEqual(trie.findWord("ca"), false, "Prefix 'ca' is not a whole word");
    console.log("✓ Pass");

    // --- Test 2 ---
    console.log("Test 2: Predicting Words...");
    trie.addWord("card");
    const suggestions = trie.predictWords("ca");
    assert.ok(suggestions.some(s => s.includes("cat")), "Should suggest cat");
    assert.ok(suggestions.some(s => s.includes("card")), "Should suggest card");
    console.log("✓ Pass");

    // --- Test 3 ---
    console.log("Test 3: Ranked Suggestions...");
    trie.use("cat");
    trie.use("cat");
    trie.use("car");

    const ranked = trie.predictWords("ca");
    assert.ok(ranked[0].includes("cat"), "Highest frequency word should be first");
    assert.ok(ranked[1].includes("car"), "Second highest frequency word should be second");
    console.log("✓ Pass");

    // --- Test 4---
    console.log("Test 4: Case Handling...");
    trie.addWord("DOG");
    assert.strictEqual(trie.findWord("dog"), true, "Should find 'dog' even if added as 'DOG'");
    console.log("✓ Pass");

    console.log("\nALL TESTS PASSED! 🚀");

} catch (e) {
    console.error("\n❌ TEST FAILED");
    console.error(e.message);
}