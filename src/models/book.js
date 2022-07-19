const mongoose = require('mongoose');

const Book = mongoose.model('Book', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    },
    nametheme: {
        type: String,
        required: true
    },
},
    { timestamps: true }
))

module.exports = Book