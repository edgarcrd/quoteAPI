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
  let personArray = [];
  if (req.query.person) {
    for (var x = 0; x < quotes.length; x++) {
        if (quotes[x].person === req.query.person) {
          personArray.push(quotes[x])
        }
    }
  } else {
    personArray = quotes;
  }
  res.send({ quotes: personArray});
});

app.post('/api/quotes', (req, res, next) => {
  const person = req.query.person;
  const quote = req.query.quote;
  const newQuote = { quote: quote, person: person }
  if (person && quote) {
    quotes.push(newQuote)
    res.status(201).send(quotes);
  } else {
    res.status(400).send();
  }
})
