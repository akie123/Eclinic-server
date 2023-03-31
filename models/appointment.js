const mongoose = require("mongoose");


const apSchema = mongoose.Schema({
    idD: {
        type: String,
        required: true
    },
    idP: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("appointment", apSchema);