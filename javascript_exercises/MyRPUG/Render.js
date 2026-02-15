const renderer = {
    render(data) {
        if (!data || !data.user) return;

        document.getElementById('user-img').src = data.user.picture;
        document.getElementById('user-name').innerText = data.user.firstName + " " + data.user.lastName;
        document.getElementById('user-location').innerText = data.user.city + ", " + data.user.state;

        document.querySelector('.quote-text').innerText = `"${data.quote}"`;

        document.getElementById('pokemon-img').src = data.pokemon.image;
        const pName = data.pokemon.name;
        document.getElementById('pokemon-name').innerText = pName.charAt(0).toUpperCase() + pName.slice(1);

        document.getElementById('about-text').innerText = data.about;

        const list = document.getElementById('friends-list');
        list.innerHTML = "";
        data.friends.forEach(f => {
            const li = document.createElement('li');
            li.innerText = f.firstName + " " + f.lastName;
            list.appendChild(li);
        });
    },

    renderDropdown(savedUsers) {
        const select = document.getElementById('saved-users-select');
        select.innerHTML = '<option value="" disabled selected>בחר משתמש שנשמר</option>';

        savedUsers.forEach((u, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.innerText = u.user.firstName + " " + u.user.lastName;
            select.appendChild(opt);
        });
    }
};