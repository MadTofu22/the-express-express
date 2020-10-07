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

// get the current hour and minutes from moment module and check when the next train is
// trains run every 10 minutes starting at the top of the hour
//the next train time should display when localhost:5000/next is visited, ie. at 4:35pm the result 4:40pm should be displayed
let moment = require('../node_modules/moment/moment.js');

app.get('/next', (req, res) => {
    let currentTime = moment();
    let nextTrain = getNextTrainTime(currentTime);

    console.log('nextTrain', nextTrain);
    res.send({'nextTrain': nextTrain});
    
});

// get the next train time from the current minutes, returns as a string
function getNextTrainTime (time) {

    let currentMinutes = time.format('mm');
    let currentHour = time.format('h');

    // check the number in the ones place to see if its a 0, if it is the next train is due now and the current time can be displayed, if not then return the next train time.
    if (currentMinutes[1] == 0) {
        return time.format('h:mma');
    }
    else {
        // check if the current 10s place for the minutes is a 5, if so next train is the next hour
        if (currentMinutes[0] == 5) {
            let nextHour = Number(currentHour)+1;
            return `${nextHour}:00${time.format('a')}`;
        }
        else {
            let nextMinuteTens = Number(currentMinutes[0])+1;
            return `${currentHour}:${nextMinuteTens}0${time.format('a')}`;
        }
    }
}

// -------- BASE -----//

// Don't forget to start your app by running `.listen()`
app.listen(port, () => {
    console.log('Up and running on port', port);
});