const express = require('express');
const router = express.Router();

const actController = require('../controllers/act.controller');

const verifyToken = require('../middlewares/auth');



router.post('/newAct', actController.postAct)

router.get('/allActs', actController.getAllActs)

router.get('/:id', actController.getActById)

router.put('/update/:id', actController.updateAct)

router.delete('/delete/:id', actController.deleteAct)



module.exports = router;

