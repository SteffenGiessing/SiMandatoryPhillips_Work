//Steffen Giessing

const express = require('express');
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('nem_id_database.sqlite');
var app = express();


app.use(express.json());

app.post('/nemid-auth', async (req, res) => {
    console.log("nemIdCode: " + req.body.nemIdCode);
    console.log("nemId: " + req.body.nemId);

    let nemId = req.body.nemId;
    let nemIdCode = req.body.nemIdCode;

    let generatedCode = Math.floor(Math.random() * 900000) + 100000;


    let query = "SELECT NemID, Password FROM user WHERE NemID = ? AND Password = ?";
    db.get(query, [nemId, nemIdCode], async (err, rows) => {
        if (rows !== undefined) {
            console.log("should be our data ", rows);
            res.status(200).send({generatedCode: generatedCode});
        } else if (err) {
            console.log(err);
            res.status(403).send({error: err});
        } else {
            console.log("Error 403: ", rows);
            res.status(403).send({err_msg: "failed to authenticate..."});
        }
    });
});

app.get('/test', (req, res) => {
    res.status(200).send({message: "Server is running just fine on port 8090... "})
});

app.listen(8090, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 8090");
    }
});
