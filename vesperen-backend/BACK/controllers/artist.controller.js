const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');

const createError = require('../middlewares/error');


const artist = require('../models/artist.model');

const postArtist = async (req, res) => {

    try {
        await Show.create(req.body);
        res.status(201).json('New artist add');
    } catch (error) {
        console.log('Error : ', error);
        res.status(500).json(error.messsage)
    }
};

const artistLog = async (req, res) => {
    try {

        const artist = await Artist.findOne({ email: req.body.email });
        if (!artist) return res.status(404).json('Artist not found');

        const comparePassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!comparePassword) return res.status(400).json("Authentification failure !")

        const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: "24h" })

        const { password, ...others } = user._doc;
        res.cookie('access_token', token,
            {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: false,
            })
            .status(200).json(others);

    } catch (error) {
        console.log('Error :', error.message)
        res.status(500).json(error.message);
    }


}

const updateArtist = async (req, res, next) => {

    try {
        const artist = await artist.findById(req.params.id);
        if (!artist) return res.statut(404).json("artist not found");

        const artistUpdated = await artist.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            message: "Artist successfully updated",
            artistUpdated
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }

};


const getAllArtists = async (req, res) => {
    try {
        const allArtists = await artist.find()
        res.status(200).json(allArtists);
    } catch (error) {
        res.status(500).json(error.message)
    }

};

const getArtistById = async (req, res) => {
    try {
        const artistId = await artist.findById(req.params.id)
        res.status(200).json(showId);
    } catch (error) {
        res.status(500).json(error.message)
    }
};


const deleteArtist = async (req, res, next) => {
    try {
        const artist = await artist.findById(req.params.id);
        if (!artist) return res.status(404).json("Artist not found")

        const deleteArtist = await artist.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Artist is deleted successfully",
            deleteArtist
        });

    } catch (error) {
        return res.status(500).json(error.message)
    }
};






module.exports = {
    postArtist,
    artistLog,
    updateArtist,
    getAllArtists,
    getArtistById,
    deleteArtist,

};