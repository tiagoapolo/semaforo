var express = require('express')
var app = express()
var bodyParser= require('body-parser');
var xHorizontal
var xVertical

var modeMaster = 0


var obj = {
    'v': {
        p : 0,
        q : 0
    },
    'h': {
        p : 0,
        q : 0
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var rp = require('request-promise-native');
var date = new Date()
var kParam = process.argv[2]


console.log('kParam: ', kParam)



function applyWatchError(){
    date = new Date(new Date(date).setSeconds(new Date(date).getSeconds() + 3))
}


function adjustTime() {
    
    let now = new Date().getSeconds()

    rp('https://horadobrasil.herokuapp.com/timestamp')
    .then((value) => { 
        console.log(parseInt(value))
        let diff = (new Date().getSeconds()-now)/2
        let t = new Date(parseInt(value))
        console.log(t)
        console.log(diff)
        let newDate = new Date(new Date(t).setSeconds(new Date(t).getSeconds() + diff))
        
        date = newDate

        console.log(newDate)
    })
    .catch((err) => {
        // Crawling failed...
        console.log(err)
    });
}

setInterval(applyWatchError, 1000)
setInterval(adjustTime, kParam ? kParam*60000 : 6*60000)

setInterval(() => { 

    xHorizontal = obj['h']['p'] / (obj['h']['p'] + obj['h']['q'])
    xVertical = obj['v']['p'] / (obj['v']['p'] + obj['v']['q'])   

    if (xHorizontal < 0.2) {
        modeMaster = 1

        console.log('MODO: ', modeMaster)
        console.log('Tempo horizontal \nVerde : 20\nVermelho: 100')
        console.log('Tempo vertical \nVerde : 100\nVermelho: 20')

    } else if (xHorizontal > 0.2 && xHorizontal <= 0.4) {
        modeMaster = 2

        console.log('MODO: ', modeMaster)
        console.log('Tempo horizontal \nVerde : 40\nVermelho: 80')
        console.log('Tempo vertical \nVerde : 80\nVermelho: 40')

    } else if (xHorizontal > 0.4 && xHorizontal <= 0.6) {
        modeMaster = 3

        console.log('MODO: ', modeMaster)
        console.log('Tempo horizontal \nVerde : 60\nVermelho: 60')
        console.log('Tempo vertical \nVerde : 60\nVermelho: 60')
    } else if (xHorizontal > 0.6 && xHorizontal <= 0.8) {
        modeMaster = 4

        console.log('MODO: ', modeMaster)
        console.log('Tempo horizontal \nVerde : 80\nVermelho: 40')
        console.log('Tempo vertical \nVerde : 40\nVermelho: 80')
    } else if (xHorizontal > 0.8 && xHorizontal <= 1) {
        modeMaster = 5

        console.log('MODO: ', modeMaster)
        console.log('Tempo horizontal \nVerde : 100\nVermelho: 20')
        console.log('Tempo vertical \nVerde : 20\nVermelho: 100')
    } else {

        console.log('MODO: ', modeMaster)
        console.log('nenhum modo selecionado!')
    }

}, 6*60000)

// setInterval(() => {





// }, 120000)


app.post('/', function (req, res) {
    obj[req.body.t]["p"] = req.body.p
    obj[req.body.t]["q"] = req.body.q
    console.log('REQ: ', obj)
    res.send('ok')
})

var listener = app.listen(process.env.PORT || 8081, function(){
    console.log('! Listening on port ' + listener.address().port); //Listening on port 8888
});