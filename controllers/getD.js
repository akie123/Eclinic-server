const Doctor = require("../models/doctor")
const Patient =require("../models/patient")
const Appointment = require("../models/appointment")
const redisClient = require("../utils/redis");

const helperfun = (str) => {
    let currentTime = new Date();

    let currentOffset = currentTime.getTimezoneOffset();

    let ISTOffset = 330; // IST offset UTC +5:30

    let ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );

    // ISTTime now represents the time in IST coordinates

    let hoursIST = ISTTime.getHours();
    let minutesIST = ISTTime.getMinutes();
    let hours = str.substr(0, 2);
    let minutes = str.substr(3, 2);
    if (hours > hoursIST) return true;
    else if (hours == hoursIST) return minutes > minutesIST;
    else return false;
};

const checkPast = (obj) => {
    const todaydate = new Date();
    const date = new Date(obj.date);
    if (todaydate.getFullYear() > date.getFullYear()) return true;
    else {
        if (todaydate.getMonth() > date.getMonth()) return true;
        else {
            if (todaydate.getDate() > date.getDate()) return true;
            else if (todaydate.getDate() < date.getDate()) return false;
            else return !helperfun(obj.time);
        }
    }
};
const getSchedule = (req,res) => {
    const {id} = req.params
    Doctor.findById(id, { appointment : 1})
        .then(resp => {
            res.json({array : resp})
        })
}
const getUpcoming = async (req, res) => {
    const { id } = req.params;
    let name = await Doctor.findById(id, { name: 1 });
    if(name)
        name = name.name;
    Appointment.find({ idD: id }).then((resp) => {
        let arr = [],
            arr1 = [];
        resp.forEach((appointment) => {
            if (!checkPast(appointment)) arr.push(appointment);
        });
        console.log(arr)
        if (arr.length > 0) {
            arr.forEach((appointment, indx) => {
                Patient.findById(appointment.idP, { name: 1, spec: 1,profilePic: 1,gender: 1 }).then((pat) => {
                    arr1.push({
                        id: appointment._id,
                        idP: appointment.idP,
                        idD: id,
                        time: appointment.time,
                        name: pat.name,
                        profilePic: pat.profilePic,
                        gender: pat.gender
                    });
                    if (arr.length === arr1.length){
                        res.send({
                            upcoming: arr1,
                            name: name,
                        });
                        console.log(arr1)
                    }
                });
            });
        } else {
            res.send({
                upcoming: [],
                name: name,
            });
        }
    });
};
const getPast = async (req,res) => {
    const { id } = req.params;
    Appointment.find({ idD: id }).then((resp) => {
        let arr = [],
            arr1 = [];
        resp.forEach((appointment) => {
            if (checkPast(appointment)) arr.push(appointment);
        });
        if (arr.length > 0) {
            arr.forEach((appointment, indx) => {
                Patient.findById(appointment.idP, { name: 1, spec: 1 }).then(
                    (pat) => {
                        arr1.push({
                            id: appointment._id,
                            idP: appointment.idP,
                            idD: id,
                            date : appointment.date,
                            time: appointment.time,
                            name: pat.name,
                        });
                        if (arr1.length === arr.length)
                            res.send({
                                past: arr1
                            });
                    }
                );
            });
        } else {
            res.send({
                past: []
            });
        }
    });
}
const updateSchedule = async(req,res) => {
    const {id} = req.params
    let tt= await Doctor.findById(id)
    redisClient.del(tt.spec)
    console.log(req.body)
    tt.appointment=req.body

    Doctor.findByIdAndUpdate(id,tt)
        .then(resp => {
            res.sendStatus(200)
        })
}

module.exports = {getSchedule,updateSchedule,getUpcoming,getPast}