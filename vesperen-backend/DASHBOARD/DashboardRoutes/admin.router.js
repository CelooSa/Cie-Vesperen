const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const verifyAdmin = require('../../middlewares/verifyadmin'); // comme ça seuls les admins peuvent acceder à ces routes


router.post('/artists', verifyAdmin, adminController.createArtist);
router.delete('/artists/:id', verifyAdmin, adminController.deleteArtist);
router.put('/artists/:id', verifyAdmin, adminController.updateArtist);

router.get('/artists',verifyAdmin, adminController.getAllArtists);
router.get('/artists/:id',verifyAdmin, adminController.getArtistById);



router.post('/shows', verifyAdmin, adminController.createShow);
router.put('/shows/:id', verifyAdmin, adminController.updateShow);
router.delete('/shows/:id', verifyAdmin, adminController.deleteShow);

router.get('/shows', verifyAdmin, adminController.getAllShows)
router.get('/shows/:id',verifyAdmin, adminController.getShowById);


router.get('/users', verifyAdmin, adminController.getAllUsers);
router.delete('/users/:id', verifyAdmin, adminController.deleteUser);

module.exports = router;
