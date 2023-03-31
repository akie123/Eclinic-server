const Patient = require("../models/patient")
const Doctor = require("../models/doctor")


const NumberController = async(req,res) => {
    try {

        const patient = await Patient.findOne({ number: req.params.num });
        console.log(patient)
        if (patient!=null) {
            res.status(201).json({ check: "found" });
            return;
        }
        const doctor = await Doctor.findOne({ number: req.params.num });
        if (doctor!=null) {
            res.status(201).json({ check: "found" });
            return;
        }
        res.status(201).json({ check: "notfound" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ check: "error" });
    }
}

module.exports = NumberController