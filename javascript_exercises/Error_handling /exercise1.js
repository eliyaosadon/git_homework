function safeJsonParse(jsonString) {
    try {
        const parsedObject = JSON.parse(jsonString);
        return parsedObject;
    } catch (error) {
        return "Invalid JSON format";
    }
}

// --- TEST CASES ---

const validResult = safeJsonParse('{"name": "John", "age": 30}');
console.log(validResult);

const invalidResult = safeJsonParse('{name: "John"}');
console.log(invalidResult);

console.log(safeJsonParse("hello world")); 
