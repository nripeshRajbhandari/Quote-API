const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req,res,next) => {
    const randQuote = getRandomElement(quotes);
    //console.log(randQuote);
    res.send({ quote: randQuote }); 
});
  
app.get('/api/quotes', (req,res,next) => {
    const queryPerson = req.query.person;
    if (queryPerson){
      const presonQuotes = quotes.filter(quote => queryPerson.toLowerCase() === quote.person.toLowerCase());
      console.log(presonQuotes);
      res.send({ quotes: presonQuotes });    
    } else {
        res.send( { quotes: quotes } );
    }
});

app.post('/api/quotes',(req,res,next) => {
    const newQuote = req.query;
    if(newQuote.hasOwnProperty('quote') && newQuote.hasOwnProperty('person')) {
        quotes.push(newQuote);
        res.status(201).send({ quote: newQuote})
    }else {
        res.status(400).send();
    }
});
  

app.listen(PORT, () => console.log(`listening at port ${PORT}...`))