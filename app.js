var express = require('express');
var app = express();

app.get('/timestamp', function(req, res){
    res.send(Date.parse(new Date()))
});

app.get('/datetime', function(req, res){
    res.send(Date())
});

app.listen(8081);