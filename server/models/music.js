let mongoose = require('mongoose');

// create model for music
let musicmodel = mongoose.Schema({
    name: String,
    artist: String,
    album: String,
    year: Number,
    length: String
},
    {
        collection:"songs"
    });
module.exports = mongoose.model('music', musicmodel);
