const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method === "GET") {
    switch (req.url) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to my server!");
        break;

      case "/about":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is the about page");
        break;

      case "/contact":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Contact us at: eliyaosadon@gmail.com | 0537469675");
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page not found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});