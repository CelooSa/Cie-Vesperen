const Router = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");
const createError = require("../middlewares/error");
const sendEmail = require("../services/nodemailer");
const User = require("../models/user.model");
const crypto = require("crypto");

const postUser = async (req, res) => {
  try {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    const new_user = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: passwordHashed,
      role: "user", // ici on a corrigé pr mettre TOUJOURS user par défaut
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

const verifyEmail = async (req, res, next) => {
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

const signIn = async (req, res) => {
  try {
    // d'abord on vérif que l'user existe
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Utilisateur introuvable");

    //ensuite on vérifie le mdp
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword)
      return res.status(400).json("Erreur d'identification !");

    // ici je vérif d'abord si l'user est vérifié et ENSUITE ==>
    if (!user.isVerified) {
      return res.status(403).json({
        message: `Veuillez vérifier votre email afin d'accéder à votre compte.`,
      });
    }
    // ==>Je génere le TOKEN (pas avant!)
    const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: "24h" });

    // ensuite on prepare la réponse et on met le cookie
    const { password, ...others } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
    });
    //Et SEULEMENT LA on ENVOIE la réponse finale
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

const getAllUsers = async (req, res) => {
  try {
    const all_users = await User.find();
    res.status(200).json(all_users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = await User.findById(req.params.id);
    if (!userId) return res.status(404).json("User not found !");
    return res.status(200).json(userId);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "User Updated",
      userUpdated,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedUpdates = { ...req.body };
    delete allowedUpdates.role; // pour éviter que l'utilisateur change son rôle

    const userUpdated = await User.findByIdAndUpdate(userId, allowedUpdates, { new: true });
    res.status(200).json({ message: "Profil mis à jour", userUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postUser,
  signIn,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateProfile, 
  verifyEmail,
};