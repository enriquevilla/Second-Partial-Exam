const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const Sport = require("./models/sport-model");

const app = express();

app.post("/sports/addSport/:sportId", jsonParser, (req, res) => {
    const {name, num_players, id} = req.body;
    const pid = req.params.sportId;

    if (!name || !num_players || !id) {
        res.statusMessage = "One or more of the parameters is missing";
        return res.status(406).end();
    }

    if (id !== Number(pid)) {
        res.statusMessage = "ID in params and body does not match";
        return res.status(409).end();
    }

    Sport
        .findById(id)
        .then(d => {
            if (d.length > 0) {
                res.statusMessage = "This id already exists in the database";
                return res.status(400).end();
            } else {
                const newSport = {
                    id: id,
                    name: name,
                    num_players: num_players
                }

                Sport
                    .createSport(newSport)
                    .then(d => {return res.status(201).json(d);})
                    .catch(_ => {
                        res.statusMessage = "Something went wrong";
                        return res.status(500).end();
                    })
            }
        })
        .catch(_ => {
            res.statusMessage = "Something went wrong";
            return res.status(500).end();
        });
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});