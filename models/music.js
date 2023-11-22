let mongoose = require('mongoose');

// create model for music
let musicmodel = mongoose.Schema({

    title: String,
    artist: String,
    year: Number,
    length: Number
},
{
    collection:"music"
});
module.exports = mongoose.model('Music',musicmodel);
