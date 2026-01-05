// exercise  1 //
let numChildren = 2
let isCareful = false

if (!isCareful) {
    numChildren++
}

console.log(numChildren)



// exercise 2 // 
let silverwareCount = 7

if (silverwareCount % 2 !== 0) {
    console.log("Something is missing")
}


// exercise 3 //
let performance = "stellar"
let salary = 10000

const goodBonus = 1000
const stellarBonus = 3000

if (performance === "good") {
    salary += goodBonus
} else if (performance === "stellar") {
    salary += stellarBonus
}

console.log(salary)


// exercise 4 //
const isVIP = false
let cash = 500

if (isVIP || cash > 300) {
    console.log("Welcome! Enjoy your night 🎉")
} else {
    console.log("Nice try… come back with more cash 😏")
}


// exercise 5 //
const a = 3
let b = 2
let c = 0 || 12
let d

b = c        // 12
b++          // 13

if (d) {
    b = a
}

d = a + (b * c) // 3 + (13 * 12) = 159
d++             // 160
b += 2          // 15

console.log(a, b, c, d)

// exercise 6 //
const gender = null
let profession = "business"

if (gender === "male") {
    profession += "man"
} else if (gender === "female") {
    profession += "woman"
} else {
    profession += "person"
}

console.log(profession)



// exercise 7 //
let boughtTesla = true
const yearOfTeslaPurchase = 2014
let isUSCitizen = true
let currentYear = 2018

if (boughtTesla) {
    if (isUSCitizen) {
        const yearsPassed = currentYear - yearOfTeslaPurchase

        if (yearsPassed >= 4) {
            console.log("Would you like an upgrade?")
        } else {
            console.log("Are you satisfied with your car?")
        }
    } else {
        console.log("Would you like to move to the US?")
    }
} else {
    console.log("Are you interested in buying a Tesla?")
}

