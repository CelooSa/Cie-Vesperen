const Artist = require("../../models/artist.model");
const Show = require("../../models/show.model");
const User = require("../../models/user.model");

//    PARTIE ARTISTS

exports.createArtist = async (req, res) => {
  try {
    const newArtist = await Artist.create(req.body);
    res.status(201).json({ message: "Artist created", artist: newArtist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.status(200).json({ message: "Artist updated successfully", artist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    await Artist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//      PARTIE SPECTACLES

exports.createShow = async (req, res) => {
  try {
    const newShow = await Show.create(req.body);
    res.status(201).json({ message: "Show created", show: newShow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!show) return res.status(404).json({ message: "Show not found" });
    res.status(200).json({ message: "Show updated successfully", show });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) return res.status(404).json({ message: "Show not found" });
    await Show.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Show deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) return res.status(404).json({ message: "Show's not found" });
    res.status(200).json(show);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//    PARTIE USERS

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
