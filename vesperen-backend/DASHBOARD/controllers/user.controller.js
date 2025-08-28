const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");

exports.postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
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
        token, // ici on a rajoute le token pr qu'il soit directment renvoyé
        user: { username: user.username, email: user.email, role: user.role },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
