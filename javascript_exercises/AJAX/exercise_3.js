const fetchAndPrintBooks = function (queryType, queryValue) {
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${queryType}:${queryValue}`,
        success: function (data) {
            data.items.forEach(book => {
                const info = book.volumeInfo;

                const title = info.title;
                const author = info.authors ? info.authors[0] : "Unknown Author";
                const isbn = info.industryIdentifiers ? info.industryIdentifiers[0].identifier : "No ISBN";

                console.log(`Title: ${title}, Author: ${author}, ISBN: ${isbn}`);
            });
        },
        error: function (xhr, text, error) {
            console.log(text);
        }
    });
}

// Test
fetchAndPrintBooks("title", "Star Wars");