const http = require("http");

const PORT = 3000;

let users = [
  { id: 1, name: "John Doe",   email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

let nextId = 3;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  const { method, url } = req;

  if (method === "GET" && url === "/api/users") {
    return sendJSON(res, 200, users);
  }

  const userByIdMatch = url.match(/^\/api\/users\/(\d+)$/);
  if (method === "GET" && userByIdMatch) {
    const id = parseInt(userByIdMatch[1], 10);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return sendJSON(res, 404, { error: `User with id ${id} not found` });
    }
    return sendJSON(res, 200, user);
  }

  if (method === "POST" && url === "/api/users") {
    try {
      const body = await parseBody(req);
      if (!body.name || !body.email) {
        return sendJSON(res, 400, { error: "Both 'name' and 'email' are required" });
      }
      const newUser = { id: nextId++, name: body.name, email: body.email };
      users.push(newUser);
      return sendJSON(res, 201, newUser);
    } catch (err) {
      return sendJSON(res, 400, { error: "Invalid JSON in request body" });
    }
  }

  sendJSON(res, 404, { error: "404 - Route not found" });
});

server.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}`);
});