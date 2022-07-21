const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

