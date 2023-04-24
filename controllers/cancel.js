const Apt = require("../models/appointment")
const Doc = require("../models/doctor")
const redisClient = require("../utils/redis")

const CancelController = async (req, res) => {

    const doctorId=req.body.idD
    const doctor = await Doc.findById(doctorId);
    redisClient.del(doctor.spec)
    for(let i=0;i<doctor.appointment.length;i++)
    {
        if(doctor.appointment[i].time==req.body.time && doctor.appointment[i].patientId!="")
        {
            doctor.appointment[i].avb=true
            doctor.appointment[i].patientId=""
            Doc.findByIdAndUpdate(doctorId,doctor).then(()=>{

                Apt.deleteOne({idD:doctorId,idP:req.body.idP,time:req.body.time}).then(()=>{
                    res.json({status:"success"})
                    return
                })
                    .catch(()=>{
                        res.json({status:"failure"})
                        return
                    })
            })
                .catch(()=>{
                    res.json({status:"failure"})
                    return
                })
        }
    }



}

module.exports = CancelController