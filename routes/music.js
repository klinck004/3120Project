var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Music = require('../models/music');
let musicController = require('../controllers/music');
/* Get route for the Bio Books list */
// Read Operation
router.get('/', musicController.DisplayMusiclist);
/* Get route for Add Book page --> Create */
router.get('/add', musicController.Addmusic); 
/* Post route for Add Book page --> Create */
router.post('/add', musicController.Processmusic);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', musicController.Editmusic);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', musicController.ProcessEditmusic);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', musicController.Deletemusic);
 module.exports = router;