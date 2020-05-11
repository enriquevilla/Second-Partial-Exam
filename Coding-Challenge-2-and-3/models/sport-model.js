const mongoose = require( 'mongoose' );

const sportSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    num_players: {
        type: Number,
        required: true
    }
});

const sportCollection = mongoose.model("sports", sportSchema);

const createSport = (sport) => {
    return sportCollection
        .create(sport)
        .then(d => {return d})
        .catch(err => {return err});
};

const findById = (id) => {
    return sportCollection
        .find({id: id})
        .then(d => {return d})
        .catch(err => {return err});
};

module.exports = {
    createSport,
    findById
};