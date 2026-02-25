const express = require('express');
const app = express();
app.use(express.json());

const wordCounter = {};

const normalize = (word) => word.toLowerCase().replace(/[^a-z]/g, '');

// Exercise 1
app.get('/sanity', (req, res) => {
  res.send('Server is up and running');
});

// Exercise 2
app.get('/word/:word', (req, res) => {
  const word = normalize(req.params.word);
  const count = wordCounter[word] ?? 0;
  res.json({ count });
});

// Exercise 3 
app.post('/word', (req, res) => {
  const word = normalize(req.body.word ?? '');

  if (!word) {
    return res.status(400).json({ error: 'Request body must include a non-empty "word" field' });
  }

  if (wordCounter[word]) {
    wordCounter[word]++;
  } else {
    wordCounter[word] = 1;
  }

  res.json({ text: `Added ${word}`, currentCount: wordCounter[word] });
});

// Exercise 4 
app.post('/sentence', (req, res) => {
  const raw = req.body.sentence ?? '';

  if (!raw.trim()) {
    return res.status(400).json({ error: 'Request body must include a non-empty "sentence" field' });
  }

  let numNewWords = 0;
  let numOldWords = 0;

  const words = raw.split(/\s+/).map(normalize).filter(Boolean);

  for (const word of words) {
    if (wordCounter[word]) {
      wordCounter[word]++;
      numOldWords++;
    } else {
      wordCounter[word] = 1;
      numNewWords++;
    }
  }

  res.json({
    text: `Added ${numNewWords} words, ${numOldWords} already existed`,
    currentCount: -1,
  });
});


app.delete('/word/:word', (req, res) => {
  const word = normalize(req.params.word);

  if (!wordCounter[word]) {
    return res.status(404).json({ error: `"${word}" was not found in the word counter` });
  }

  delete wordCounter[word];
  res.json({ text: `"${word}" was successfully deleted` });
});


app.get('/top', (req, res) => {
  const entries = Object.entries(wordCounter);

  if (entries.length === 0) {
    return res.status(404).json({ error: 'No words recorded yet' });
  }

  const [word, count] = entries.reduce((best, curr) => (curr[1] > best[1] ? curr : best));
  res.json({ text: word, count });
});

app.get('/top5', (req, res) => {
  const ranking = Object.entries(wordCounter)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ [word]: count }));

  res.json({ ranking });
});

app.get('/total', (req, res) => {
  const count = Object.values(wordCounter).reduce((sum, n) => sum + n, 0);
  res.json({ text: 'Total count', count });
});


app.listen(3000, () => console.log('Word Counter running on http://localhost:3000'));
