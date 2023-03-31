const Patient = require("../models/patient")
const { hashPassword } = require("../utils/bcrypt");

const PRController = async(req,res) => {
    req.body.password = hashPassword(req.body.password);
    const new_user = new Patient(req.body)
    new_user.save()
    .then(()=>{
        res.status(201).json({
            status:"ok"
        })
    })
    .catch(() => {
        res.sendStatus(400)
    })
}

module.exports = PRController