const Doc = require("../models/doctor")
const { hashPassword } = require("../utils/bcrypt")

const DRController = async (req, res) => {
    req.body['verified'] = false
    req.body['fees'] = 500
    req.body['appointment'] = [{
        time:"18:00-18:30",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    },{
        time:"18:30-19:00",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    },{
        time:"19:00-19:30",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    },{
        time:"19:30-20:00",
        avb:true,
        patientId:"",
        date: new Date().toDateString()
    }
    ,{
            time:"20:00-20:30",
            avb:true,
            patientId:"",
            date: new Date().toDateString()
        }
        ,{
            time:"20:30-21:00",
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