const express = require('express');

const router = express.Router();

const orderController = require('../controllers/order.controller');

const verifyToken = require('../middlewares/auth');



router.post('/placeOrder', orderController.postOrder)

router.put('/update/:id' , orderController.updateOrder )

router.get('/allOrders', orderController.getAllOrders)

router.get('/:id', orderController.getOrderById)

router.delete('/deleteOrder/:id', orderController.deleteOrder)



module.exports = router;


