const mongoose = require("mongoose")

const PrescriptionSchema = mongoose.Schema({
    medicines: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    app_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("prescription",PrescriptionSchema)