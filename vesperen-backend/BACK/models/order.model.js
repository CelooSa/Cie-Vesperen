const mongoose = require('mongoose');


const orderSchema = new Schema(
    {

        date: {
            type: Date,
            default: Date.now,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        totalAmount: {
            type: Number,
            required: true,
        },
    }, {
    timestamps: { createdAt: true }
});




module.exports = mongoose.model('order', orderSchema);
