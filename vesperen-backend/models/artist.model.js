const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  name_artist: {
    type: String,
    required: true
  },
  first_name_artiste: {
    type: String,
    required: true
  },
  stage_name: {
    type: String,
    default: null
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  nationality: {
    type: String,
    default: null
  },
  picture_artist: {
    type: String,
    default: null
  },
  biography_artist: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, {

  timestamps: { createdAt: true }
});




module.exports = mongoose.model('artist', artistSchema);
