const express = require('express');

const router = express.Router();




const UserController = require('../controllers/user.controller');

router.post('/signup', UserController.postUser)

router.post('/signIn', UserController.signIn)

router.get('/all_users', UserController.getAllUsers)

router.get('/:id', UserController.getUserById)

router.delete('/deleteUser/:id', UserController.deleteUser)

router.put('/update/:id' , UserController.updateUser )


module.exports = router;


