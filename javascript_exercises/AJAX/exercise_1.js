const fetchBook = function(isbn) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, text, error) {
            console.log(text);
        }
    });
}

fetchBook(9780575087057); 
fetchBook(9782806269171); 