const express = require('express');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { body, param, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// ── In-memory stores 
let posts = [];
let comments = [];
let postIdSeq = 1;
let commentIdSeq = 1;

// ── AJV setup (used for Posts) 
const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // adds "email", "date-time", etc.

const postSchema = {
  type: 'object',
  required: ['title', 'content', 'tags'],
  additionalProperties: true, // allows optional fields like "category"
  properties: {
    title: { type: 'string', minLength: 5, maxLength: 100 },
    content: { type: 'string', minLength: 10, maxLength: 1000 },
    tags: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
    },
  },
};

const validatePost = ajv.compile(postSchema);

// ── Advanced Middleware 

// 1. Request/Response logger with execution time
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Hook into the finish event so we can log response status + time
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.url} → ${res.statusCode} (${duration}ms)`);
  });

  next();
};

// 2. Rate limiting simulation (max 10 requests per IP per minute)
const ipRequestMap = new Map(); // { ip: { count, resetAt } }

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const record = ipRequestMap.get(ip);

  if (!record || now > record.resetAt) {
    // First request from this IP or window expired – start fresh
    ipRequestMap.set(ip, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests – max 10 per minute',
      retryAfter: Math.ceil((record.resetAt - now) / 1000),
    });
  }

  record.count++;
  next();
};

// 3. Content-type validation for POST / PUT requests
const requireJson = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({
      error: 'Unsupported Media Type – Content-Type must be application/json',
    });
  }
  next();
};

// 4. Response formatter – wraps every successful JSON reply in { success, data }
const responseFormatter = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    // Don't wrap error responses (they already have an "error" key)
    if (body && body.error) return originalJson(body);

    return originalJson({ success: true, data: body });
  };

  next();
};

// Apply global advanced middleware
app.use(requestLogger);
app.use(rateLimiter);
app.use(requireJson);
app.use(responseFormatter);

// ── Helper: extract express-validator errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  next();
};

// ── AJV middleware for POST /posts 
const ajvValidatePost = (req, res, next) => {
  const valid = validatePost(req.body);
  if (!valid) {
    return res.status(400).json({
      error: 'Validation failed',
      details: validatePost.errors,
    });
  }
  next();
};

// ── express-validator rules for POST /posts/:postId/comments 
const commentValidationRules = [
  body('content')
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage('content must be 5–500 characters'),
  body('email')
    .isEmail()
    .withMessage('email must be a valid email address'),
];

// Check that the referenced post actually exists
const checkPostExists = (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId)) {
    return res.status(400).json({ error: 'postId must be a number' });
  }
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: `Post ${postId} not found` });
  }
  req.post = post;
  next();
};

// Lightweight ID validation for GET routes
const validatePostId = [
  param('postId').isInt({ min: 1 }).withMessage('postId must be a positive integer'),
  handleValidationErrors,
];

// ── Routes 

// POST /posts – AJV validation
app.post('/posts', ajvValidatePost, (req, res) => {
  const post = { id: postIdSeq++, ...req.body, createdAt: new Date().toISOString() };
  posts.push(post);
  res.status(201).json(post);
});

// GET /posts – no validation
app.get('/posts', (req, res) => {
  res.json(posts);
});

// POST /posts/:postId/comments – express-validator + post-exists check
app.post(
  '/posts/:postId/comments',
  checkPostExists,
  commentValidationRules,
  handleValidationErrors,
  (req, res) => {
    const comment = {
      id: commentIdSeq++,
      postId: req.post.id,
      content: req.body.content,
      email: req.body.email,
      createdAt: new Date().toISOString(),
    };
    comments.push(comment);
    res.status(201).json(comment);
  }
);

// GET /posts/:postId/comments – ID validation only
app.get('/posts/:postId/comments', validatePostId, (req, res) => {
  const postId = Number(req.params.postId);
  const postComments = comments.filter((c) => c.postId === postId);
  res.json(postComments);
});

// ── Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// ── Start
app.listen(3002, () => console.log('Exercise 3 running on http://localhost:3002'));

module.exports = app;
