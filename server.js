const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/api/quotes/random', (req, res, next) => {
  const random = getRandomElement(quotes);
  res.send({quote: random})
});

app.get('/api/quotes', (req, res, next) => {
  if (req.param('person') === '') res.send(quotes)
  //res.send({quotes: quotes})
});
