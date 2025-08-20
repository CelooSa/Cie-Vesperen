const mongoose = require('mongoose');

const userShema = mongoose.Schema(
    {
        username: {
            type: String,
            minLengh: 3,
            maxLenght: 20,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        password: {
            type: String,
            minLengh: 12,
            required: true
        }
    }, {
    timestamps: { createdAt: true }
});

module.exports = mongoose.model('users', userShema)


