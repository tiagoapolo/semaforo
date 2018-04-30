var rp = require('request-promise-native');
var date = new Date()
var kParam = process.argv[2]
var p = generateP()
var q = generateQ()
console.log('kParam: ', kParam)


function applyWatchError(){
    date = new Date(new Date(date).setSeconds(new Date(date).getSeconds() + 6))
}


function generateP(){
    return Math.floor(Math.random() * 99) + 1
}

function generateQ(){
    return Math.floor(Math.random() * 99) + 1
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

function sendData(){

    console.log('Sending...' + '\nP: '+p+'\nQ: '+q)

    var options = {
        method: 'POST',
        uri: 'http://localhost:8085/',
        form: {
            // Like <input type="text" name="name">
            t: 'v',
            p: p,
            q: q
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
    .then((value) => { 
        console.log('Data sent!', value)
    })
    .catch((err) => {
        // Crawling failed...
        console.log(err)
    });


}


// setInterval(sendData, (Math.floor(Math.random() * 50000) + 5000))


(function loop() {
    
    var rand = (Math.floor(Math.random() * 45000) + 5000)

    setTimeout(function() {
            sendData();
            loop();  
    }, rand);

}());


// (function deliver() {
//     let count = 1
//     let rand = (6*60000 * count) - 1*60000

//     setTimeout(function() {
//             sendData();
//             deliver();  
//     }, rand);

// }());


setInterval(applyWatchError, 1000)
setInterval(adjustTime, kParam ? kParam*60000 : 6*60000)
setInterval(() => {
    p = generateP()
    q = generateQ()

} , 6*60000)

