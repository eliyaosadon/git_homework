import { useState, useEffect } from "react";

const Exercise2 = () => {
    const [name, setName] = useState("");
    const [fruit, setFruit] = useState("");

    useEffect(() => {
        if (fruit) {
            console.log(`${name} selected ${fruit}`);
        }
    }, [fruit, name]);

    return (
        <div style={{ marginTop: "50px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
            <h2>Exercise 2: The Fruit Picker</h2>

            <label>Name: </label>
            <input
                id="name-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <br />

            <label>Pick a fruit: </label>
            <select
                id="select-input"
                onChange={(e) => setFruit(e.target.value)}
                value={fruit}
            >
                <option value="" disabled>Select a fruit</option>
                <option value="Mango">Mango</option>
                <option value="Banana">Banana</option>
                <option value="Lychee">Lychee</option>
                <option value="Apple">Apple</option>
            </select>
        </div>
    );
};

export default Exercise2;