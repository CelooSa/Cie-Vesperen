const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artist.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');



router.post('/',verifyAdmin, artistController.postArtist)
router.put('/:id', verifyAdmin,  artistController.updateArtist )
router.delete('/:id', verifyAdmin, artistController.deleteArtist)


router.get('/all_artists', artistController.getAllArtists)
router.get('/:id', artistController.getUserById)




module.exports = router;


