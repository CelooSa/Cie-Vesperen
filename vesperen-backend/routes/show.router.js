const express = require('express'); 
const router = express.Router();

const showController = require('../controllers/show.controller');

const verifyToken = require('../middlewares/auth');



router.post('/newShow', showController.postShow)

router.get('/allShows', showController.getAllShows)

router.get('/:id', showController.getShowById)

router.put('/update/:id', showController.updateShow)

router.delete('/delete/:id', showController.deleteShow)





module.exports = router;