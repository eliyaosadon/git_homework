const storageKey = 'Users';

async function handleGenerate() {
    await apiManager.loadData();
    renderer.render(apiManager.data);
}

function handleSave() {
    const dataToSave = apiManager.data;

    if (!dataToSave.user) {
        return alert("Create a user first");
    }

    let saved = localStorage.getItem(storageKey);
    let usersArray = [];

    if (saved) {
        usersArray = JSON.parse(saved);
    }

    usersArray.push(dataToSave);
    localStorage.setItem(storageKey, JSON.stringify(usersArray));

    alert(dataToSave.user.firstName + "Saved");
    refreshList();
}

function handleLoad() {
    const select = document.getElementById('saved-users-select');
    const index = select.value;

    if (index === "") {
        alert("Pick someone from the list");
        return;
    }

    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const userToDisplay = saved[index];

    apiManager.data = userToDisplay;
    renderer.render(userToDisplay);
}

function refreshList() {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    renderer.renderDropdown(saved);
}

document.getElementById('generate').onclick = handleGenerate;
document.getElementById('save').onclick = handleSave;
document.getElementById('load').onclick = handleLoad;

handleGenerate();
refreshList();