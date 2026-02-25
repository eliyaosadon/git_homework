const express = require('express');
const app = express();
app.use(express.json());

// ── Test Data ─────────────────────────────────────────────────────────────────
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

// ── Middleware: validateId ────────────────────────────────────────────────────
// Ensures :id is a valid integer before any DB/array lookup runs
const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || req.params.id.trim() === '') {
    // Pass a proper error object to the error-handling middleware
    const err = new Error('Invalid ID format – must be a number');
    err.status = 400;
    return next(err);
  }

  // Store the parsed number so downstream middleware doesn't repeat the work
  req.userId = id;
  next();
};

// ── Middleware: checkResourceExists ──────────────────────────────────────────
// Simulates a DB lookup by scanning the in-memory users array
const checkResourceExists = (req, res, next) => {
  const user = users.find((u) => u.id === req.userId);

  if (!user) {
    const err = new Error(`User with id ${req.userId} not found`);
    err.status = 404;
    return next(err);
  }

  req.user = user; // attach found user so the route handler doesn't look again
  next();
};

// ── Routes 
// GET /users – no extra middleware, just return everything
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id – validate the id, then check it actually exists
app.get('/users/:id', validateId, checkResourceExists, (req, res) => {
  res.json(req.user);
});

// POST /users – create a new user (no validation required per exercise spec)
app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// ── Error-Handling Middleware 
// Express recognises error handlers by the four-argument signature (err, req, res, next)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    status,
  });
});

// ── Start 
app.listen(3001, () => console.log('Exercise 2 running on http://localhost:3001'));

module.exports = app;
