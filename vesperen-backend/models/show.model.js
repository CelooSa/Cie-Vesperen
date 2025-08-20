const mongoose = require('mongoose');

const showSchema = mongoose.Schema(
    {

        title: {
            type: String,
            minLengh: 3,
            maxLenght: 20,
            required: true
        },

        date_time: {
            type: Date,
            required: true

        },

        duration: {
            type: Number,
            required: true
        },

        venue:
        {
            type: String,
            required: true
        },


        show_address:
        {
            type: String,
            required: true
        },

        zip_code:
        {
            type: String,
            required: true

        },

        show_description:
        {
            type: String,
            required: true
        },

        price:
        {
            type: Number,
            required: true,
            min: 0
        },

        reservation_number:
        {
            type: Number,
            required: true,
            minLengh: 6,

        },

        archived:
        {
            type: Boolean,
            required: true
        },


    }, {
    timestamp: { createdAt: true }
});


module.exports = mongoose.model('show', showSchema)