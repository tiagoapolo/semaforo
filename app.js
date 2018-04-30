var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.redirect('/timestamp')
});

app.get('/timestamp', function(req, res){
    // Date.parse(new Date()).toString()


    let options = { timeZone: "America/Sao_Paulo"}, // you have to know that New York in EST
    estTime = new Date();

    res.send(Date.parse(estTime.toLocaleString("en-US", options)).toString())
    
});

app.get('/datetime', function(req, res){
   

    let options = { timeZone: "America/Sao_Paulo"}, // you have to know that New York in EST
    estTime = new Date();

    res.send(estTime.toString())


});

var listener = app.listen(process.env.PORT || 8081, function(){
    console.log('! Listening on port ' + listener.address().port); //Listening on port 8888
});