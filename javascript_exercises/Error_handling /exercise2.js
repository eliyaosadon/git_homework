const fs = require('fs');

function readFileWithErrorHandling(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        
        if (err) {
            if (err.code === 'ENOENT') {
                callback(`Error: File not found: "${filePath}"`);
            } else if (err.code === 'EISDIR') {
                callback(`Error: "${filePath}" is a directory, not a file.`);
            } else {
                // Catch-all for permissions or other system errors
                callback(`Error: Could not read file (${err.message})`);
            }
        } else {
            // Success case
            callback(`Success: File read successfully. Size: ${data.length} bytes`);
        }
    });
}

// --- TEST CASES ---

readFileWithErrorHandling('ghost_file.txt', (result) => {
    console.log(result);
});

readFileWithErrorHandling('.', (result) => {
    console.log(result);
});

fs.writeFileSync('test.txt', 'Hello Node!');
readFileWithErrorHandling('test.txt', (result) => {
    console.log(result);
});