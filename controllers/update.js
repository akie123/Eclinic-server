const Doctor = require("../models/doctor")
const Patient = require("../models/patient")
const {hashPassword} = require("../utils/bcrypt")

const UpdateDp = (req,res) => {
    let User
    if(req.user.user === "doctor")
        User = Doctor
    else
        User = Patient
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.status(200).send({
          msg: "Profile Pic Updated",
        });
      })

      .catch((err) => {
        res.send({
          err: "Unable to Upload Image",
        });
      });
}

const Update = (req,res) => {
    let User;
    if (req.user.user === "doctor") User = Doctor;
    else User = Patient;
    const { id } = req.params;
    if(req.body.password)
      req.body.password = hashPassword(req.body.password)
    User.findByIdAndUpdate(id,req.body)
    .then(() => {
      res.status(200).send({
        msg: "Info updated succesfully"
      })
    })
    .catch((err) => {
      res.send({
        err: "Unable to update info"
      })
    })
}

module.exports = {UpdateDp,Update}