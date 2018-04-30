var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.redirect('/timestamp')
});

app.get('/timestamp', function(req, res){
    // Date.parse(new Date()).toString()

    var localTime = new Date(); //get your local time
    var utcTime = localTime.getUTCHours(); // find UTC hours
    var estTime = new Date(); // create a new date object for the EST time
    estTime.setHours(utcTime-3)

    res.send(Date.parse(estTime).toString())
    
});

app.get('/datetime', function(req, res){
   

    let options = { timeZone: "America/Sao_Paulo"}, // you have to know that New York in EST
    estTime = new Date();

    res.send(estTime.toLocaleString("pt-BR", options))


});

var listener = app.listen(process.env.PORT || 8081, function(){
    console.log('! Listening on port ' + listener.address().port); //Listening on port 8888
});