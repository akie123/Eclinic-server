const Apt = require("../models/appointment")
const Doc = require("../models/doctor")

const ApController = async (req, res) => {

    req.body.date= new Date()
    const new_user = new Apt(req.body)
    new_user.save()
        .then(async() => {
            let doc= await Doc.findById(req.body.idD);
            for(let i=0;i<doc.appointment.length;i++)
            {
                if(doc.appointment[i].time==req.body.time)
                {
                    doc.appointment[i].avb=false;
                    doc.appointment[i].patientId=req.body.idP;
                    break
                }
            }
            Doc.findByIdAndUpdate(req.body.idD,doc).then(()=>{
                res.status(201).json({
                    status: "ok",
                });
            })

        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400);
        });
}

module.exports = ApController