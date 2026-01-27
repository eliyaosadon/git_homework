const posts = [
    { name: "Alice", text: "Just started learning MVC!" },
    { name: "Bob", text: "Data flow is actually pretty cool." }
];

const render = function () {
    const container = document.getElementById("posts-container");

    container.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postDiv = document.createElement("div");
        postDiv.className = "post";

        const nameElement = document.createElement("strong");
        nameElement.innerHTML = post.name + ": ";

        const textElement = document.createElement("span");
        textElement.innerHTML = post.text;

        postDiv.appendChild(nameElement);
        postDiv.appendChild(textElement);
        postDiv.onclick = function () {
            posts.splice(i, 1);
            render();
        };

        container.appendChild(postDiv);
    }
}
const btn = document.getElementById("post-btn");

btn.onclick = function () {
    const nameInput = document.getElementById("input-name");
    const textInput = document.getElementById("input-text");

    const nameValue = nameInput.value;
    const textValue = textInput.value;

    if (nameValue && textValue) {
        posts.push({
            name: nameValue,
            text: textValue
        });

        render();

        nameInput.value = "";
        textInput.value = "";
    }
}

render();