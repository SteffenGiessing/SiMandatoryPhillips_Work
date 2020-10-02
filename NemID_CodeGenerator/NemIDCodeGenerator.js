//Steffen Giessing

const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

var db = new sqlite3.Database('nem_id_database.sqlite');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

app.post('/nemid-auth', async (req, res) => {
    console.log("nemIdCode: " + req.body.nemIdCode);
    console.log("nemId: " + req.body.nemId);

    let nemIdCode = req.body.nemIdCode;
    let nemId = req.body.nemId;

    let generatedCode = Math.floor(Math.random() * 900000) + 100000;

    
    let query = "SELECT NemID, Password FROM user WHERE NemID = ? AND Password = ?";
    db.get(query, [nemId, nemIdCode], async (err, rows) => {
        if (rows !== undefined) {
            console.log("should be our data ", rows);
            res.status(200).send({ generatedCode: generatedCode });
        } else if (err) {
            console.log(err);
            res.status(403).send({ error: err });
        } else {
            console.log("should be our data ", rows);
            res.status(403).send({ err_msg: "failed to authenticate..." });
        }
    });
});

//Test that server is up and running
app.get('/test', (req, res) => {
    res.status(200).send({ message: "Server is running just fine on port 8090... " })
});

app.listen(8090, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Listening on port 8090");
    }
});
//Import packages
//
// const express = require('express');
// const sqlite3 = require('sqlite3');
// const axios = require("request");
// const db = new sqlite3.Database('nem_id_database.sqlite');
// const {response} = require('express');
// var app = express()
// let query = "SELECT CPR, NemID FROM user WHERE EXISTS(SELECT * FROM user where CPR = cpr AND Nemid = nemid)";
//
// app.use(express.json());
//
// app.get('/test', (req, res) =>{
//     res.status(200).send({message: "Server is running just fine on port 8090... "})
// });
//
// app.get('/', (req, res) => {
//     console.log('***** NEW REQUEST ****')
//     res.status(200).send(
//         {message: 'the server has given you whatever is on this address / id'});
// });
//
// app.get('/nemid-auth', (req, res) => {
//     res.sendStatus(201)
//     let nemid = req.body.nemID;
//     console.log(body);
//     cpr = req.body.nemIdCode;
//     nemid = req.body.nemId;
//     checkDatabase(cpr, nemid, body)
//     db.get(query, (err) => {
//         if (err) {
//             return console.error(err.message);
//             res.sendStatus(200)
//         }
//             res.sendStatus(404);
//             app.post('http://localhost:8089/nem', body)
//             return res.status(200).send({body});
//
//
//     });
// });
//
//     app.listen(8090, (err) => {
//         if (err) {
//             console.log(err)
//             return;
//         }
//         console.log('Listening on port 8090')
//     });
//
//     function checkDatabase(cpr, nemid) {
//         db.get(query, (err) => {
//             if (err) {
//                 return console.error(err.message);
//             }
//
//
//             console.log('CPR AND NEMID, does no excist in the DB');
//         })
//
//     }
//
