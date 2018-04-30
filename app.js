var express = require('express');
var app = express();

app.get('/timestamp', function(req, res){
  return Date.parse(new Date())
});

app.get('/datetime', function(req, res){
  return Date()
});

app.listen(8081);