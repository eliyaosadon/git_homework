function processFile(filename, processingTime) {
    return new Promise((resolve, reject) => {
        console.log(`Starting to process ${filename}...`);
        setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error(`Failed to process ${filename}`));
      } else {
        resolve({
          filename: filename,
          size: Math.floor(Math.random() * 1000) + 100,
          processedAt: new Date().toLocaleTimeString()
        });
      }
    }, processingTime);
  });
}

const files = [
  { name: "document1.pdf", time: 2000 },
  { name: "image1.jpg", time: 1500 },
  { name: "data.csv", time: 3000 },
  { name: "report.docx", time: 1000 }
];

const filePromises = files.map(file => processFile(file.name, file.time));

console.time("Total Processing Time");
Promise.all(filePromises)
  .then((results) => {
    console.timeEnd("Total Processing Time");
    console.log("All files processed successfully:", results);
  })
  .catch((error) => {
    console.timeEnd("Total Processing Time");
    console.error("Processing halted:", error.message);
  });