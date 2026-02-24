const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 3000;

// ── Exercise 2
const store = [
  { name: "table",         inventory: 3,  price: 800  },
  { name: "chair",         inventory: 16, price: 120  },
  { name: "couch",         inventory: 1,  price: 1200 },
  { name: "picture frame", inventory: 31, price: 70   },
];

// ── Helper
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// ── Helper
function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }
    const ext = path.extname(filePath);
    const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
    res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
    res.end(data);
  });
}

// ── Server
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url, true);
  const pathname  = parsedUrl.pathname;
  const query     = parsedUrl.query;

  // ── Exercise 1
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Server is up and running smoothly");
  }

  // ── Exercise 2
  const priceMatch = pathname.match(/^\/priceCheck\/(.+)$/);
  if (priceMatch) {
    const itemName = decodeURIComponent(priceMatch[1]).toLowerCase();
    const item = store.find((i) => i.name.toLowerCase() === itemName);
    return sendJSON(res, 200, { price: item ? item.price : null });
  }

  // ── Exercise 4
  const buyMatch = pathname.match(/^\/buy\/(.+)$/);
  if (buyMatch) {
    const itemName = decodeURIComponent(buyMatch[1]).toLowerCase();
    const item = store.find((i) => i.name.toLowerCase() === itemName);
    if (!item) {
      return sendJSON(res, 404, { error: "Item not found" });
    }
    if (item.inventory <= 0) {
      return sendJSON(res, 400, { error: "Out of stock" });
    }
    item.inventory -= 1;
    return sendJSON(res, 200, item);
  }

  // ── Exercise 6
  if (pathname === "/sale") {
    const isAdmin = query.admin === "true";
    if (isAdmin) {
      store.forEach((item) => {
        if (item.inventory > 10) {
          item.price = item.price * 0.5;
        }
      });
    }
    return sendJSON(res, 200, store);
  }

  if (pathname.startsWith("/dist/") || pathname === "/index.html") {
    const filePath = path.join(__dirname, pathname);
    return serveStatic(res, filePath);
  }

  // Serve index.html for /app
  if (pathname === "/app") {
    return serveStatic(res, path.join(__dirname, "dist", "index.html"));
  }

  res.writeHead(404);
  res.end("404 - Not found");
});

server.listen(PORT, () => {
  console.log(`Furniture store server running at http://localhost:${PORT}`);
  console.log(`Open the store UI at http://localhost:${PORT}/app`);
});
