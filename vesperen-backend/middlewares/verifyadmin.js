const jwt = require("jsonwebtoken");
const ENV = require("../config/env");
const User = require("../models/user.model");

const verifyAdmin = async (req, res, next) => {
  try {
    let token;
    
    // d'abord il va essayer les cookies (pour le frontend)
    if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }
    // Sinon il va essayer les headers (pour Postman/API)
    else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) 
      return res.status(401).json("Not authenticated");

    const decoded = jwt.verify(token, ENV.TOKEN);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json("User not found");
    if (user.role !== "admin") return res.status(403).json("Access denied");

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = verifyAdmin;