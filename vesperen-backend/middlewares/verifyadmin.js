const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const User = require('../models/user.model');

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json("Not authenticated");

        const decoded = jwt.verify(token, ENV.TOKEN);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json("User not found");
        if (user.role !== 'admin') return res.status(403).json("Access denied");

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = verifyAdmin;
