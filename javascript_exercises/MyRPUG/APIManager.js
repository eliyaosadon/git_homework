// ============================================================
// APIManager.js - Responsible for all API calls
// ============================================================

const apiManager = {
  data: {}, // This will hold all the fetched data

  // A helper function to fetch from any URL and return JSON
  async fetchFromApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} from ${url}`);
    }
    return await response.json();
  },

  // Fetches all the data we need and stores it in this.data
  async loadData() {
    // Pick a random pokemon (there are 1025 total)
    const randomId = Math.floor(Math.random() * 1025) + 1;

    // Run all 4 API calls at the same time (faster!)
    const [usersReq, quoteReq, pokeReq, meatReq] = await Promise.all([
      this.fetchFromApi("https://randomuser.me/api/?results=7"),
      this.fetchFromApi("https://api.kanye.rest"),
      this.fetchFromApi(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
      this.fetchFromApi("https://baconipsum.com/api/?type=all-meat&paras=1"),
    ]);

    // First user is the main profile
    const mainUser = usersReq.results[0];

    // The other 6 users are friends
    const friends = usersReq.results.slice(1).map((f) => ({
      firstName: f.name.first,
      lastName: f.name.last,
    }));

    // Store everything neatly in this.data
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