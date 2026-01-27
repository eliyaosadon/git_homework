const myTrie = new Trie();

const newWordInput = document.getElementById("new-word-input");
const addBtn = document.getElementById("add-btn");
const addError = document.getElementById("add-error");
const dictionaryList = document.getElementById("dictionary-list");

const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions-list");

addBtn.addEventListener("click", () => {
    const word = newWordInput.value.trim();

    if (!word) {
        showError("Please enter a word.");
        return;
    }
    if (/\d/.test(word)) {
        showError("Words cannot contain numbers.");
        return;
    }

    myTrie.insert(word);
    addToDictionaryUI(word);
    newWordInput.value = "";
    showError("");
});

function showError(msg) {
    addError.textContent = msg;
}

function addToDictionaryUI(word) {
    const li = document.createElement("li");
    li.className = "tag";
    li.textContent = word;
    dictionaryList.appendChild(li);
}

searchInput.addEventListener("input", (e) => {
    const inputVal = e.target.value;
    if (!inputVal) {
        suggestionsList.classList.add("hidden");
        return;
    }

    const suggestions = myTrie.autoComplete(inputVal);
    renderSuggestions(suggestions);
});

function renderSuggestions(words) {
    suggestionsList.innerHTML = "";

    if (words.length === 0) {
        suggestionsList.classList.add("hidden");
        return;
    }

    suggestionsList.classList.remove("hidden");

    words.forEach(word => {
        const li = document.createElement("li");
        li.className = "suggestion-item";
        li.textContent = word;

        li.addEventListener("click", () => {
            searchInput.value = word;
            suggestionsList.classList.add("hidden");
        });

        suggestionsList.appendChild(li);
    });
}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
        suggestionsList.classList.add("hidden");
    }
});

["apple", "apricot", "application", "banana", "batman", "ball"].forEach(w => {
    myTrie.insert(w);
    addToDictionaryUI(w);
});