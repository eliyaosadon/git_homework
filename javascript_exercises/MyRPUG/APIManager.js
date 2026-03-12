const apiManager = {
  data: {}, 

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} from ${url}`);
    }
    return await response.json();
  },

  async loadData() {
    const randomId = Math.floor(Math.random() * 1025) + 1;

    const [usersReq, quoteReq, pokeReq, meatReq] = await Promise.all([
      this.fetchData("https://randomuser.me/api/?results=7"),
      this.fetchData("https://api.kanye.rest"),
      this.fetchData(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
      this.fetchData("https://baconipsum.com/api/?type=all-meat&paras=1"),
    ]);

    const mainUser = usersReq.results[0];

    const friends = usersReq.results.slice(1).map((f) => ({
      firstName: f.name.first,
      lastName: f.name.last,
    }));

    this.data = {
      user: {
        firstName: mainUser.name.first,
        lastName: mainUser.name.last,
        city: mainUser.location.city,
        state: mainUser.location.state,
        picture: mainUser.picture.large,
      },
      quote: quoteReq.quote,
      pokemon: {
        name: pokeReq.name,
        image: pokeReq.sprites.front_default,
      },
      about: meatReq[0],
      friends: friends,
    };
  },
};