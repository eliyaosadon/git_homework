const express = require('express');
const app = express();

// Track request count across all requests
let requestCount = 0;

// ── Middleware 1: Logger 
// Prints [TIMESTAMP] METHOD URL for every incoming request
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// ── Middleware 2: Request Counter 
// Increments a shared counter and attaches it to the request object
const requestCounterMiddleware = (req, res, next) => {
  requestCount++;
  req.requestCount = requestCount; // attach to req so routes can read it
  next();
};

// Apply both middlewares globally (all routes)
app.use(loggingMiddleware);
app.use(requestCounterMiddleware);

// ── Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome!',
    requestCount: req.requestCount,
  });
});

app.get('/about', (req, res) => {
  res.json({
    message: 'About page',
    requestCount: req.requestCount,
  });
});

// ── Start
app.listen(3000, () => console.log('Exercise 1 running on http://localhost:3000'));

module.exports = app;
