/* 1 */
const push = function () {
    console.log("pushing it!");
};

const pull = function () {
    console.log("pulling it!");
};

const pushPull = function (func) {
    func();
};

pushPull(push);
pushPull(pull);

/* 2 */
const returnTime = function (time) {
    console.log('The current time is: ' + time);
};

const getTime = function (func) {
    const time = new Date();
    func(time);
};

getTime(returnTime);

/* 3 */
const logData = function (data) {
    console.log(data);
};

const displayData = function (alertDataFunc, logDataFunc, data) {
    alertDataFunc(data);
    logDataFunc(data);
};

displayData(console.error, logData, "I like to party");

/* 4 */
const sum = (a, b, c) => a + b + c;

/* 5 */
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

console.log(capitalize("bOb"));
console.log(capitalize("TAYLOR"));
console.log(capitalize("feliSHIA"));

/* 6 */
const determineWeather = temp => {
    if (temp > 25) {
        return "hot";
    }
    return "cold";
};

const commentOnWeather = temp => `It's ${determineWeather(temp)}`;

console.log(commentOnWeather(30));
console.log(commentOnWeather(22));