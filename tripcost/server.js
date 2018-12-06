const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"

let db, trips, expenses

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  db = client.db('tripcost')
  trips = db.collection('trips')
  expenses = db.collection('expenses')
});

app.use(express.json())

app.post('/trip', (req, res) => {
  const { name } = req.body;
  trips.insertOne({ name: name }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});

app.get('/trips', (req, res) => {
  trips.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ trips: items });
  })
});

app.post('/expense', (req, res) => {
  expenses.insertOne(
    {
      trip: req.body.trip,
      date: req.body.date,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description
    },
    (err, result) => {
      if (err) {
        console.error(err);
        res.send(500).json({ err: err });
        return;
      }
      res.status(200).json({ ok: true });
    }
  )
});

app.get('/expenses', (req, res) => {
  expenses.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.send(500).json({ err: err });
      return;
    }
    res.status(200).json({ expenses: items });
  });
});


app.listen(1099, _ => console.log("Server listenning on port 1099"));