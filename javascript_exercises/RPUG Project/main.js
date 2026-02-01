const apiManager = new APIManager();
const renderer = new Renderer();

const LS_KEY = 'rupg_saved_users';

async function generateUser() {
    await apiManager.loadData();
    renderer.render(apiManager.getData());
}

function saveUser() {
    const currentData = apiManager.getData();

    if (!currentData.user) {
        alert("Please generate a user first!");
        return;
    }
    const savedUsers = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    savedUsers.push(currentData);
    localStorage.setItem(LS_KEY, JSON.stringify(savedUsers));

    alert(`Saved ${currentData.user.firstName} to memory!`);
    updateDropdown();
}

function loadUser() {
    const select = document.getElementById('saved-users-select');
    const selectedIndex = select.value;

    if (selectedIndex === "") {
        alert("Please select a user to load.");
        return;
    }

    const savedUsers = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    const selectedUser = savedUsers[selectedIndex];

    apiManager.data = selectedUser;

    renderer.render(selectedUser);
}

function updateDropdown() {
    const savedUsers = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    renderer.renderDropdown(savedUsers);
}

document.getElementById('generate').addEventListener('click', generateUser);
document.getElementById('save').addEventListener('click', saveUser);
document.getElementById('load').addEventListener('click', loadUser);
generateUser();
updateDropdown();