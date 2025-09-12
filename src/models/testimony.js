const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Testimony", testimonySchema);