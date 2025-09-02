const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 12,
      required: true,
    },
   
    phone: {
      type: String,
      maxlength: 20,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      maxlength: 100,
    },
    city: {
      type: String,
      maxlength: 50,
    },
    postalCode: {
      type: String,
      maxlength: 10,
    },
    preferences: {
      newsletter: {
        type: Boolean,
        default: false,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
      emailReminders: {
        type: Boolean,
        default: true,
      },
    },
   
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);