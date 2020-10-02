// Phillip Eismark

// import packages
const { response } = require('express');
var express = require('express')

// call the express function which returns an express application
var app = express()

// setup express to use json
app.use(express.json());

// this is the index
app.get('/function1', (req, res) => {
    console.log("***** NEW REQUEST *****")
    res.status(200).send(
        {message: " the server has given you whatever is on this address / id"});
});

app.get('/test', (req, res) => {
    console.log(req)
    res.status(200).send({message: "Server is up and running... "});
});

app.post('/generate-nemId', (req,res) => {  
    body = JSON.stringify(req.body);
    console.log("recieved POST on /generate-nemId: ", body);

    idRight = req.body.cpr.slice(7,11);
    idLeft = generateRandom(1000,9999);
    console.log(idLeft);

    let response = {
        "nemId": idRight + idLeft
    }
    res.status(201).send(response);
});

app.listen(8080, (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log('Listening on port 8080... ')
});

function generateRandom (min, max) {
    return Math.floor (
        Math.random() * (max - min) + min
        )
}

// To run i need the absolute path for some reason. Also even if PWD shows the exact same path it will not work without it.
// node /Users/phillipeismark/Documents/SystemIntegration/si_mandatory_assignment_1/NemID_UserGenerator/NemIDUserGenerator.js
// nodemon /Users/phillipeismark/Documents/SystemIntegration/si_mandatory_assignment_1/NemID_UserGenerator/NemIDUserGenerator.js
