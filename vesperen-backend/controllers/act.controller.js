const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');

const createError = require('../middlewares/error');

const act = require('../models/act.model');

const postAct = async (req, res) => {
    try {
        await act.create(req.body);
        res.status(201).json('New circus act added');
    }catch (error) {
        console.log('Error: ', error);
        res.status(500).json(error.message)
    }
};


const updateAct = async (req, res, next) => {
    try {
        const act = await act.findById(req.params.id);
        if (!act) return res.status(404).json("act not found");

        const actUpdated = await act.findByIdAndUpdate( 
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            message: "Act successfully updated",
            actUpdated
        })
    }catch (error) {
        return res.status(500).json(error.message)
    }

};

const getAllActs = async (req, res) => {
        try {
            const allActs = await act.find()
            res.status(200).json(allActs);
        } catch (error) {
            res.status(500).json(error.message)
        }

    };

    const getActById = async (req, res) => {
        try {
            const actId = await act.findById(req.params.id)
            res.status(200).json(actId);
        } catch (error) {
            res.status(500).json(error.message)
        }
    };


    const deleteAct = async (req, res, next) => {
        try {
            const act = await act.findById(req.params.id);
            if (!act) return res.status(404).json("circus act not found")

            const deleteAct = await act.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "Circus act is deleted successfully",
                deleteAct
            });

        } catch (error) {
            return res.status(500).json(error.message)
        }
    };






    module.exports = {
        postAct,
        updateAct,
        getAllActs,
        getActById,
        deleteAct,

    };
