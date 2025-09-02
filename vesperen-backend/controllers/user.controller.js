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
      isAdmin: user.roler === 'admin'
    });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json(error.message);
  }
};


// methodes pr reinitialiser mdp

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email requis' });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ 
        message: 'Si cet email existe, vous recevrez un lien de réinitialisation' 
      });
    }

  // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 heure

    // Sauvegarder le token dans la base de données
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/password-reset/${resetToken}`;
console.log(`Lien de réinitialisation: ${resetUrl}`);

    res.status(200).json({ 
      message: 'Email de réinitialisation envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: 'Token manquant' });
    }

    // Trouver l'utilisateur avec ce token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token invalide ou expiré' 
      });
    }

    res.status(200).json({ 
      message: 'Token valide',
      userId: user._id 
    });

  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ 
        message: 'Token et nouveau mot de passe requis' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token invalide ou expiré' 
      });
    }

    // Hasher et sauvegarder le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({ 
      message: 'Mot de passe réinitialisé avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
    res.status(500).json({ message: 'Erreur serveur' });
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
      deleteUser,
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
      { $set: req.body }, // j'ai enlevé el rôle pr preservation ds crea postman
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

module.exports = {
  postUser,
  signIn,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  verifyEmail,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};
