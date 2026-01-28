const fetchBookData = function (queryType, queryValue) {
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${queryType}:${queryValue}`,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, text, error) {
            console.log(text);
        }
    });
}

fetchBookData("title", "The Wise Man's Fears");
fetchBookData("isbn", 9789814561778);