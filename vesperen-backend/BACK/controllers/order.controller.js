const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');

const createError = require('../middlewares/error');

const order = require('../models/order.model')

const postOrder = async (req, res) => {
    try {
        await order.create(req.body);
        res.status(201).json('New order created');
    } catch (error) {
        console.log('Error : ', error);
        res.status(500).json(error.message)
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await order.findById(req.params.id);
        if (!order) return res.status(404).json("order not found");

        if (req.user.id === order.id) {



            const orderUpdated = await order.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json({
                message: " Order Successfully updated",
                orderUpdated
            });
        } else {
            res.status(403).json("Invalid order for this user");
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }

};



const getAllOrders = async (req, res) => {
    try {
        const allOrders = await order.find()
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json(error.message)
    }

};

const getOrderById = async (req, res) => {
    try {
        const orderId = await order.findById(req.params.id);
        if (!orderId) return res.status(404).json("Invalid order ")
        return res.status(200).json(orderId)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const deleteOrder = async (req, res, next) => {
    try {
        const order = await order.findById(req.params.id);
        if (!order) return res.status(404).json("User not found")

        const deleteOrder = await order.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Order deleted successfully",
            deleteUser
        });

    } catch (error) {
        return res.status(500).json(error.message)
    }
};




module.exports = {
    postOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    
};