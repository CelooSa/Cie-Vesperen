const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');

const createError = require('../middlewares/error');


const Show = require('../models/show.model');


const postShow = async (req, res) => {

    try {
        await Show.create(req.body);
        res.status(201).json('New show added');
    } catch (error) {
        console.log('Error : ', error);
        res.status(500).json(error.messsage)
    }
};

const updateShow = async (req, res, next) => {

    try {
        const show = await Show.findById(req.params.id);
        if (!show) return res.statut(404).json("show not found");

        const showUpdated = await Show.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            message: "Show successfully updated",
            showUpdated
        })
    }catch (error) {
            return res.status(500).json(error.message)
        }

    };


    const getAllShows = async (req, res) => {
        try {
            const allShows = await Show.find()
            res.status(200).json(allShows);
        } catch (error) {
            res.status(500).json(error.message)
        }

    };

    const getShowById = async (req, res) => {
        try {
            const showId = await Show.findById(req.params.id)
            res.status(200).json(showId);
        } catch (error) {
            res.status(500).json(error.message)
        }
    };


    const deleteShow = async (req, res, next) => {
        try {
            const show = await Show.findById(req.params.id);
            if (!show) return res.status(404).json("Show not found")

            const deleteShow = await Show.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "Show is deleted successfully",
                deleteShow
            });

        } catch (error) {
            return res.status(500).json(error.message)
        }
    };






    module.exports = {
        postShow,
        updateShow,
        getAllShows,
        getShowById,
        deleteShow,

    }