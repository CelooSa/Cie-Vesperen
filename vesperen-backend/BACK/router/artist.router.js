const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artist.controller');

const verifyToken = require('../middlewares/auth');



router.post('/newArtist', artistController.postArtist)

router.post('/artistLog', artistController.artistLog)

router.get('/all_artists', artistController.getAllArtists)

router.get('/:id', artistController.getUserById)

router.delete('/deleteArtist/:id', artistController.deleteArtist)

router.put('/update/:id' , artistController.updateArtist )


module.exports = router;


