// bring express into your project
// you will need to `npm init` and `npm install express` first
const express = require('express');

// create your express app
const app = express();
const port = 5000;

// express static file serving - public is the folder name where our index.html file is
app.use(express.static('server/public'));

// This is your array of trains
let trains = require('./modules/trains.js');

// -------- BASE -----//

// Create your `/train` route here
// when a user visits localhost:5000/train
// this route should return the array of trains
app.get('/trains', (req, res) => {
    res.send(trains);
});

// Create your `/first-train` route here
// when a user visits localhost:5000/first-train
// this route should return the first train in the array
app.get('/first-train', (req, res) => {
    res.send(trains[0]);
});

// Create your `/last-train` route here
// when a user visits localhost:5000/last-train
// this route should return the last train in the array
app.get('/last-train', (req, res) => {
    res.send(trains[trains.length-1]);
});


// -------- STRETCH -----//

// Create your `/count` route here
// when a user visits localhost:5000/count
// this route should return the number of trains in the array
// NOTE: express doesn't like it when you return numbers
// instead, return an object like { totalCount: 4 }
let trainCount = {'totalCount': trains.length};

app.get('/count', (req, res) => {
    res.send(trainCount);
});

// Create your `/random` route here
// when a user visits localhost:5000/random
// this route should return a single train at random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.get('/random', (req, res) => {
    res.send(trains[getRandomInt(trains.length)]);
})


// -------- BASE -----//

// Don't forget to start your app by running `.listen()`
app.listen(port, () => {
    console.log('Up and running on port', port);
});