const STORAGE_KEY = "RUPG_saved_users";

async function handleGenerate() {
  renderer.setLoading(true);
  try {
    await apiManager.loadData();
    renderer.render(apiManager.data);
  } catch (err) {
    renderer.showMessage("Failed to load data. Check your connection.", true);
    console.error(err);
  } finally {
    renderer.setLoading(false);
  }
}

function handleSave() {
  if (!apiManager.data.user) {
    return renderer.showMessage("Generate a user first!", true);
  }

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  saved.push(apiManager.data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

  renderer.showMessage(
    `${apiManager.data.user.firstName} has been saved!`
  );
  refreshDropdown();
}

function handleLoad() {
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

function refreshDropdown() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  renderer.renderDropdown(saved);
}

document.getElementById("generate").onclick = handleGenerate;
document.getElementById("save").onclick = handleSave;
document.getElementById("load").onclick = handleLoad;

handleGenerate(); 
refreshDropdown(); 