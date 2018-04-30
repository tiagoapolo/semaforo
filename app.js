var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.redirect('/timestamp')
});

app.get('/timestamp', function(req, res){
    // Date.parse(new Date()).toString()


    res.send( Date.parse(new Date()).toString())
    
});

app.get('/datetime', function(req, res){
   
    estTime = new Date();

    res.send(estTime.toLocaleString("pt-BR"))


});

var listener = app.listen(process.env.PORT || 8081, function(){
    console.log('! Listening on port ' + listener.address().port); //Listening on port 8888
});