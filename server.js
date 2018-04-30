var express = require('express')
var app = express()
var bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// respond with "hello world" when a GET request is made to the homepage
app.post('/', function (req, res) {
    console.log(req.body)
  res.send(req.body)
})

app.listen(8085);
