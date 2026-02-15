const apiManager = {
    data: {},

    async fetchFromApi(url) {
        const response = await fetch(url);
        return await response.json();
    },

    async loadData() {
        try {
            const randomId = Math.floor(Math.random() * 900) + 1;
            
            const usersReq = await this.fetchFromApi('https://randomuser.me/api/?results=7');
            const quoteReq = await this.fetchFromApi('https://api.kanye.rest');
            const pokeReq = await this.fetchFromApi(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const meatReq = await this.fetchFromApi('https://baconipsum.com/api/?type=all-meat&paras=1');

            const mainInfo = usersReq.results[0];
            
            const friendsList = [];
            for (let i = 1; i < usersReq.results.length; i++) {
                let f = usersReq.results[i];
                friendsList.push({ firstName: f.name.first, lastName: f.name.last });
            }

            this.data = {
                user: {
                    firstName: mainInfo.name.first,
                    lastName: mainInfo.name.last,
                    city: mainInfo.location.city,
                    state: mainInfo.location.state,
                    picture: mainInfo.picture.large
                },
                quote: quoteReq.quote,
                pokemon: {
                    name: pokeReq.name,
                    image: pokeReq.sprites.front_default
                },
                about: meatReq[0],
                friends: friendsList
            };
        } catch (err) {
            console.log("api error: ", err);
        }
    }
};