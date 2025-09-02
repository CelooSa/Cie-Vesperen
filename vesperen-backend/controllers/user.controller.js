const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");
const createError = require("../middlewares/error");
const sendEmail = require("../services/nodemailer");
const User = require("../models/user.model"); // Gardez votre nom de modèle original
const crypto = require("crypto");

exports.postUser = async (req, res) => {
  try {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    const new_user = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: passwordHashed,
      role: "user",
      isVerified: false,
    });

    const verificationToken = jwt.sign({ id: new_user._id }, ENV.TOKEN, {
      expiresIn: "5m",
    });
    await sendEmail(req.body, verificationToken);

    res.status(201).json({
      message: "User created and Email send!",
      new_user,
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json(error.message);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ message: "Token manquant" });
    }

    const decoded = jwt.verify(token, ENV.TOKEN);

    await User.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true }
    );

    return res.status(200).json({ message: "Email vérifié avec succès!" });
  } catch (error) {
    console.error("Erreur de vérification:", error);
    return res.status(400).json({ message: "Lien invalide ou expiré." });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Utilisateur introuvable");

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword)
      return res.status(400).json("Erreur d'identification !");

    if (!user.isVerified) {
      return res.status(403).json({
        message: `Veuillez vérifier votre email afin d'accéder à votre compte.`,
      });
    }

    const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: "24h" });

    const { password, ...others } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: others,
    });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json(error.message);
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      dateOfBirth, 
      address, 
      city, 
      postalCode, 
      preferences,
      password, 
      currentPassword 
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (phone) updates.phone = phone;
    if (dateOfBirth) updates.dateOfBirth = dateOfBirth;
    if (address) updates.address = address;
    if (city) updates.city = city;
    if (postalCode) updates.postalCode = postalCode;
    if (preferences) updates.preferences = preferences;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé par un autre compte" });
      }
      updates.email = email;
    }

    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Mot de passe actuel requis" });
      }
      
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Mot de passe actuel incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updates, 
      { 
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({ 
      message: "Profil mis à jour avec succès", 
      user: updatedUser 
    });
  } catch (err) {
    console.error('Erreur updateMyProfile:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Données invalides", 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { 
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ 
      message: "Utilisateur mis à jour avec succès", 
      user: updatedUser 
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Données invalides", 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};