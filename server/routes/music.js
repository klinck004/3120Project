var express = require('express');
var router = express.Router();

let musicController = require('../controllers/music.js');
// User authentication check
function requireAuth(req, res, next) {
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Read Operation
router.get('/', musicController.DisplayMusiclist);
router.get('/spotify', musicController.spotifyTest);
/* Get route for Add Song page --> Create */
router.get('/add', requireAuth, musicController.Addmusic); 
/* Post route for Add Song page --> Create */
router.post('/add', requireAuth, musicController.Processmusic);
/* Get route for displaying the Edit Song page --> Update */
router.get('/edit/:id', requireAuth, musicController.Editmusic);
/* Post route for processing the Edit Song page --> Update */
router.post('/edit/:id', requireAuth, musicController.ProcessEditmusic);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, musicController.Deletemusic);
 module.exports = router;