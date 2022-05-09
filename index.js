const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

function postHandler(request, response) {
    console.log('somethings coming in!')
    incomingData = request.body;

    database.insert(incomingData);

    response.json(incomingData);
}

function getHandler(request, response) {
    console.log('sending data!')
    database.find({}).sort({ milli: -1 }).exec(function (err, data) {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
        //console.log(data)
    });
}

app.get('/api', getHandler);
app.post('/api', postHandler);

