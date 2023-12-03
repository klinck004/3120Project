var express = require('express');
var router = express.Router();
let Music = require('../models/music');
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotifyClientID,
    clientSecret: process.env.spotifyClientSecret
});

// Retrieve client credential access token
// Application auth only -- no direct Spotify account integration right now
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log("Spotify integration access token" + data.body['access_token']);
    console.log('The access token expires in ' + data.body['expires_in']);
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

console.log("Music DB controller loaded!"); /* for dev peace of mind */


// Read list
module.exports.DisplayMusiclist = async (req, res, next) => {
    try {
        const MusicList = await Music.find();
        res.render('music/list', {
            title: 'Music List',
            MusicList: MusicList,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        //Handle error
        res.render('music/list', {
            error: 'Error on server'
        });
    }
};
//add a new music
module.exports.Addmusic = async (req, res, next) => {
    try {
        res.render('music/add',
            {
                title: 'Add new entry',
                displayName: req.user ? req.user.displayName : ''
            })
    }
    catch (err) {
        console.error(err);
        res.render('music/list',
            {
                error: 'something went wrong'
            });
    }
};
//process the new additions
module.exports.Processmusic = async (req, res, next) => {
    let newMusic = Music({
        "name": req.body.title,
        "artist": req.body.artist,
        "album": req.body.album,
        "year": req.body.year,
        "length": req.body.length,
        "user": req.user.displayName
    });
    Music.create(newMusic)
        .then(() => {
            res.redirect('/music');
        })
        .catch((err) => {
            console.log("LOG: Add POST error:");
            console.log(err)
            res.render('error', {
                error: 'Add POST error:'
            });
        });
};


//edit an existing entry
module.exports.Editmusic = async (req, res, next) => {
    try {
        const id = req.params.id;
        const musicToEdit = await Music.findById(id);
        res.render('music/edit',
            {
                title: 'Edit an existing song',
                Music: musicToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
    }
    catch (error) {
        console.error(err);
        res.render('music/list',
            {
                error: 'something went wrong'
            });
    }
}
//process an existing entry
module.exports.ProcessEditmusic = (req, res, next) => {
    try {
        const id = req.params.id;
        let updatedMusic = Music({
            "_id": id,
            "name": req.body.title,
            "artist": req.body.artist,
            "album": req.body.album,
            "year": req.body.year,
            "length": req.body.length
        });
        Music.findByIdAndUpdate(id, updatedMusic).then(() => {
            res.redirect('/music')
        });
    }
    catch (err) {
        console.error(err);
        res.render('music/list',
            {
                error: 'Error on the server'
            });
    }
}
//delete an entry
module.exports.Deletemusic = (req, res, next) => {
    try {
        let id = req.params.id;
        Music.deleteOne({ _id: id }).then(() => {
            res.redirect('/music')
        })
    }
    catch (error) {
        console.error(err);
        res.render('music/list',
            {
                error: 'Something went wrong'
            });
    }
}

// Test route in preparation for spotify integration
module.exports.spotifyTest = async (req, res, next) => {
    console.log('The access token is ' + spotifyApi.getAccessToken());
}
