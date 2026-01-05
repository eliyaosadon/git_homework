let p1 = {
    name: "jil",
    age: 20,
    city: "Dimona"
}

let p2 = {
    name: "Robert",
    age: 20,
    city: "Holon"
}

const sameAge = p1.age === p2.age
const sameCity = p1.city === p2.city

if (sameAge && sameCity) {
    console.log("Jill wanted to date Robert")
} else if (sameAge && !sameCity) {
    console.log("Jill wanted to date Robert, but couldn't")
}


