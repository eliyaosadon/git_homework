// // 1
// const StringFormatter = function () {

//     const capitalizeFirst = function (str) {
//         if (!str) return "";
//         return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//     }

//     const toSkewerCase = function (str) {
//         return str.replace(/\s+/g, "-");
//     }

//     return {
//         capitalizeFirst: capitalizeFirst,
//         toSkewerCase: toSkewerCase
//     }
// }

// const formatter = StringFormatter()
// console.log(formatter.capitalizeFirst("dorothy"))
// console.log(formatter.toSkewerCase("blue box"))

// // 2
// const Bank = function () {
//     let money = 500;

//     const depositCash = function (cash) {
//         money += cash;
//     }

//     const checkBalance = function () {
//         console.log(money);
//     }

//     return {
//         deposit: depositCash,
//         showBalance: checkBalance
//     }
// }

// const bank = Bank()
// bank.deposit(200)
// bank.deposit(250)
// bank.showBalance()


// 3
const SongsManager = function () {
    const songs = {};
    const baseUrl = "https://www.youtube.com/watch?v=";

    const addSong = function (name, url) {
        const videoId = url.split("v=")[1];
        songs[name] = videoId;
    }

    const getSong = function (name) {
        return baseUrl + songs[name];
    }

    return {
        addSong: addSong,
        getSong: getSong
    }
}

// --- TEST ---
const songsManager = SongsManager()
songsManager.addSong("sax", "https://www.youtube.com/watch?v=3JZ4pnNtyxQ")
songsManager.addSong("how long", "https://www.youtube.com/watch?v=CwfoyVa980U")
songsManager.addSong("ain't me", "https://www.youtube.com/watch?v=D5drYkLiLI8")

console.log(songsManager.getSong("sax"))
console.log(songsManager.getSong("how long"))
console.log(songsManager.getSong("ain't me"))