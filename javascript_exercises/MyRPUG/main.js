const STORAGE_KEY = "RUPG_saved_users";

async function loadRandomUser() {
  renderer.setLoading(true);
  try {
    await apiManager.loadData();
    renderer.render(apiManager.data);
  } catch (err) {
    renderer.showMessage("Failed to load data.", true);
    console.error(err);
  } finally {
    renderer.setLoading(false);
  }
}

function saveUser() {
  if (!apiManager.data.user) {
    return renderer.showMessage("Generate a user first!", true);
  }

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  saved.push(apiManager.data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

  renderer.showMessage(
    `${apiManager.data.user.firstName} has been saved!`
  );
  updateList();
}

function loadUser() {
  const select = document.getElementById("saved-users-select");
  const index = select.value;

  if (index === "") {
    return renderer.showMessage("Please select a user from the list.", true);
  }

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const userToLoad = saved[index];

  apiManager.data = userToLoad;
  renderer.render(userToLoad);
  renderer.showMessage(`Loaded ${userToLoad.user.firstName}'s profile!`);
}

function updateList() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  renderer. updateDropdown(saved);
}

document.getElementById("generate").onclick = loadRandomUser;
document.getElementById("save").onclick = saveUser;
document.getElementById("load").onclick = loadUser;

loadRandomUser(); 
updateList(); 