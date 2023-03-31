const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("admin",adminSchema)