const Patient = require("../models/patient")
const Doctor = require("../models/doctor")


const EmailController = async(req,res) => {
    try {

        const patient = await Patient.findOne({ email: req.params.email });
        if (patient) {
            res.status(201).json({ check: "found" });
            return;
        }
        const doctor = await Doctor.findOne({ email: req.params.email });
        if (doctor) {
            res.status(201).json({ check: "found" });
            return;
        }
        res.status(201).json({ check: "notfound" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ check: "error" });
    }
}

module.exports = EmailController