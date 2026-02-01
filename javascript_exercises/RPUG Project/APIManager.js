class APIManager {
    constructor() {
        this.data = {};
    }

    async _fetchJSON(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        return res.json();
    }

    async loadData() {
        try {
            const pokeId = Math.floor(Math.random() * 900) + 1;
            const [usersData, quoteData, pokeData, meatData] = await Promise.all([
                this._fetchJSON('https://randomuser.me/api/?results=7'),
                this._fetchJSON('https://api.kanye.rest'),
                this._fetchJSON(`https://pokeapi.co/api/v2/pokemon/${pokeId}`),
                this._fetchJSON('https://baconipsum.com/api/?type=all-meat&paras=1')
            ]);

            const mainUser = usersData.results[0];
            const friends = usersData.results.slice(1).map(u => {
                return { firstName: u.name.first, lastName: u.name.last };
            });

            this.data = {
                user: {
                    firstName: mainUser.name.first,
                    lastName: mainUser.name.last,
                    city: mainUser.location.city,
                    state: mainUser.location.state,
                    picture: mainUser.picture.large
                },
                quote: quoteData.quote,
                pokemon: {
                    name: pokeData.name,
                    image: pokeData.sprites.front_default
                },
                about: meatData[0],
                friends: friends
            };

            return this.data;

        } catch (error) {
            console.error("API Manager Error:", error);
            alert("Oops! Something went wrong getting the data.");
        }
    }

    getData() {
        return this.data;
    }
}