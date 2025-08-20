const mongoose = require('mongoose');

const actSchema = new mongoose.Schema({
  id_act: {
    type: Number,
    unique: true,
    required: true
  },
  description_act: {
    type: String
  },
  name_act: {
    type: String,
    required: true
  },
  duration_act: {
    type: Number,
    required: true
  },
  name_artist: {
    type: String,
    required: true  
  },
}, {
  timestamps: { createdAt: true }
});




module.exports = mongoose.model('act', actSchema);
