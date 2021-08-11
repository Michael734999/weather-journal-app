// Create an express environment

const express = require('express');
const app = express();

// Create an array to store data--GET

let projectData = {};

// Create the middelware

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Create the Cors

const cors = require('cors');
app.use(cors());

// Link the server side code to the client-side code

app.use(express.static('weather'));

// Create a port 

const port = 3000;

// Create and test server 

const server = app.listen(port, function() {
    console.log(`Server running on localhost: ${port}`);
});

// GET ROUTE 

app.get('/all', function(req, res) {
    res.send(projectData);
});

// POST ROUTE:

let data = [];

app.post('/weather', function(req, res) {
    data.push(req.body);
    projectData = req.body;
    res.send(projectData);
});