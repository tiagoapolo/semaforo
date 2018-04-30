var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.redirect('/timestamp')
});

app.get('/timestamp', function(req, res){
    res.send(Date.parse(new Date()).toString())
});

app.get('/datetime', function(req, res){
    res.send(Date().toString())
});

app.listen(8081);