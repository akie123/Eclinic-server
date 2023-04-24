const Prescription = require("../models/prescription")

const AddPrescription = (req,res) => {
    Prescription(req.body).save().then((resp) => {
        res.sendStatus(201)
    })
}

module.exports = {AddPrescription}