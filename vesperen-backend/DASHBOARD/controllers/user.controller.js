const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");

exports.postUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ma partie connexion
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      ENV.TOKEN,
      { expiresIn: "1d" }
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Connexion réussie",
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          preferences: user.preferences,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mise à jour du profil user
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

    // Mise à jour des champs 
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (phone) updates.phone = phone;
    if (dateOfBirth) updates.dateOfBirth = dateOfBirth;
    if (address) updates.address = address;
    if (city) updates.city = city;
    if (postalCode) updates.postalCode = postalCode;
    if (preferences) updates.preferences = preferences;

    // Gestion de l'email
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé par un autre compte" });
      }
      updates.email = email;
    }

    // Gestion du mot de passe
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

    // Mettre à jour l'utilisateur
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

// Fonctions admin 
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
    
    // Si on modifie le mot de passe, le hasher
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