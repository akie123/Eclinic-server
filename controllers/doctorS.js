const Doc = require("../models/doctor")
const { hashPassword } = require("../utils/bcrypt")
const redisClient = require("../utils/redis")

const DRController = async (req, res) => {
    req.body['verified'] = false
    req.body['fees'] = 500
    req.body["appointment"] = [
      {
        time: "09:00-09:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "09:30-10:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "10:00-10:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "10:30-11:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "11:00-11:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "11:30-12:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "12:00-12:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "03:00-03:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "03:30-04:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "04:00-04:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "18:30-19:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "19:00-19:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "19:30-20:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "20:00-20:30",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
      {
        time: "20:30-21:00",
        avb: true,
        patientId: "",
        date: new Date().toDateString(),
      },
    ];
    req.body.password = hashPassword(req.body.password)

    const new_user = new Doc(req.body)
    redisClient.del(req.body.spec)
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