const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const getInfo = (req, res) => {
    let User;
    if (req.user.user === "doctor") 
        User = Doctor;
    else 
        User = Patient;
    const { id } = req.params;
    User.findById(id, { password: 0, _id: 0 })
        .then((resp) => {
            res.json(resp);
        })
        .catch((err) => {
            res.send({
                err: "Unable to get info",
            });
        });
};

module.exports = {getInfo}
