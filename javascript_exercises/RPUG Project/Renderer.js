class Renderer {
    constructor() {
        this.elements = {
            userImg: document.getElementById('user-img'),
            userName: document.getElementById('user-name'),
            userLocation: document.getElementById('user-location'),
            quote: document.querySelector('.quote-text'),
            pokemonImg: document.getElementById('pokemon-img'),
            pokemonName: document.getElementById('pokemon-name'),
            aboutText: document.getElementById('about-text'),
            friendsList: document.getElementById('friends-list'),
            userSelect: document.getElementById('saved-users-select')
        };
    }

    _capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(data) {
        if (!data || !data.user) return;

        this.elements.userImg.src = data.user.picture;
        this.elements.userName.innerText = `${data.user.firstName} ${data.user.lastName}`;
        this.elements.userLocation.innerText = `${data.user.city}, ${data.user.state}`;
        this.elements.quote.innerText = `"${data.quote}"`;
        this.elements.pokemonImg.src = data.pokemon.image;
        this.elements.pokemonName.innerText = this._capitalize(data.pokemon.name);
        this.elements.aboutText.innerText = data.about;
        this.elements.friendsList.innerHTML = '';
        data.friends.forEach(friend => {
            const li = document.createElement('li');
            li.innerText = `${friend.firstName} ${friend.lastName}`;
            this.elements.friendsList.appendChild(li);
        });
    }

    renderDropdown(savedUsers) {
        this.elements.userSelect.innerHTML = '<option value="" disabled selected>Select a saved user</option>';

        savedUsers.forEach((user, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = `${user.user.firstName} ${user.user.lastName}`;
            this.elements.userSelect.appendChild(option);
        });
    }
}