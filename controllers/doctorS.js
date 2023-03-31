const Doc = require("../models/doctor")
const { hashPassword } = require("../utils/bcrypt")

const DRController = async (req, res) => {
    req.body['verified'] = false
    req.body['fees'] = 500
    req.body['appointment'] = [{
        time:"12:00-12:30",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    },{
        time:"12:30-13:00",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    },{
        time:"13:00-13:30",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    },{
        time:"13:30-14:00",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    }
    ]
    req.body.password = hashPassword(req.body.password)
    console.log(req.body)
    const new_user = new Doc(req.body)
    new_user.save()
    .then(() => {
        res.status(201).json({
            status: "ok",
        });
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(400);
    });
}

module.exports = DRController