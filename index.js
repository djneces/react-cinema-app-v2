const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

//body-parser is inbuilt in express, need to use .json and urlencoded to parse the body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//prod environment (Heroku)
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets (main.js or main.css)
  app.use(express.static('client/build'));
  //Express will serve up the index.html if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/process-payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
