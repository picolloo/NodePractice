const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"

let db

mongo.connect(url, (err, client) => {

});

app.post('/trip', (req, res) => {

});

app.get('/trips', (req, res) => {

});

app.post('/expense', (req, res) => {

});

app.get('/expenses', (req, res) => {

});


app.listen(1099, _ => console.log("Server listenning on port 1099"));