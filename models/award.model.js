
const mongoose = require('mongoose');

const awardsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1950,
        max: new Date().getFullYear(),
    },
})

module.exports = awardsSchema;