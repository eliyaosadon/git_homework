import { useState } from "react";

const Exercise1 = () => {
  const [person, setPerson] = useState({ name: "", age: "" });

  const handleChange = (event, property) => {
    setPerson({ ...person, [property]: event.target.value });
  };

  const alertUser = () => {
    alert(`Come in ${person.name}, you're ${person.age} - that's good enough`);
  };

  return (
    <div>
      <h2>Exercise 1: The Bar</h2>
      <input
        id="name-input"
        onChange={(e) => handleChange(e, "name")}
        value={person.name}
        placeholder="Name"
      />
      <input
        id="age-input"
        onChange={(e) => handleChange(e, "age")}
        value={person.age}
        placeholder="Age"
      />
      <button onClick={alertUser}>Go to Bar</button>
    </div>
  );
};

export default Exercise1;