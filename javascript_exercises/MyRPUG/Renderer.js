const renderer = {
  render(data) {
    if (!data || !data.user) return;

    document.getElementById("user-img").src = data.user.picture;
    document.getElementById("user-name").innerText =
      `${data.user.firstName} ${data.user.lastName}`;
    document.getElementById("user-location").innerText =
      `${data.user.city}, ${data.user.state}`;

    document.getElementById("quote-text").innerText = `"${data.quote}"`;

    document.getElementById("pokemon-img").src = data.pokemon.image;
    const properName =
      data.pokemon.name.charAt(0).toUpperCase() + data.pokemon.name.slice(1);
    document.getElementById("pokemon-name").innerText = properName;

    document.getElementById("about-text").innerText = data.about;

    const list = document.getElementById("friends-list");
    list.innerHTML = "";
    data.friends.forEach((friend) => {
      const li = document.createElement("li");
      li.innerText = `${friend.firstName} ${friend.lastName}`;
      list.appendChild(li);
    });
  },

   updateDropdown(savedUsers) {
    const select = document.getElementById("saved-users-select");
    select.innerHTML =
      '<option value="" disabled selected>Choose a saved user</option>';

    savedUsers.forEach((user, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.innerText = `${user.user.firstName} ${user.user.lastName}`;
      select.appendChild(option);
    });
  },

  showMessage(text, isError = false) {
    const msg = document.getElementById("status-message");
    msg.innerText = text;
    msg.style.color = isError ? "#e74c3c" : "#2ecc71";
    setTimeout(() => (msg.innerText = ""), 3000); 
  },

  setLoading(isLoading) {
    document.getElementById("loading").style.display = isLoading
      ? "block"
      : "none";
    document.getElementById("main-content").style.display = isLoading
      ? "none"
      : "flex";
  },
};