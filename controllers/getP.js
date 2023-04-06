const Patient = require("../models/patient")
const Doctor  = require("../models/doctor")
const Appointment = require("../models/appointment");

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
            else return !helperfun(obj.time);
        }
    }
};

const getDoctors = (req,res) => {
    Doctor.find(
        {verified:true},
        {
            name: 1,
            spec: 1,
            fees: 1,
            qualification: 1,
            appointment: 1,
            profilePic : 1,
        }
    ).then((resp) => {
        res.send(resp);
    });
}

const getUpcoming = async (req, res) => {
    const { id } = req.params;
    let name = await Patient.findById(id,{name:1})
    if (name)
        name = name.name;
    Appointment.find({ idP: id }).then((resp) => {
        console.log(resp)
        let arr = [],arr1 = [];
        resp.forEach((appointment) => {
            if (!checkPast(appointment))
                arr.push(appointment);
        });
        if(arr.length > 0){
            arr.forEach((appointment, indx) => {
                Doctor.findById(appointment.idD, { name: 1, spec: 1 }).then(
                    (doc) => {
                        arr1.push({
                            id : appointment._id,
                            idD : appointment.idD,
                            idP : id,
                            time: appointment.time,
                            name: doc.name,
                            spec: doc.spec,
                        });
                        if (indx === arr.length - 1)
                            res.send({
                                upcoming: arr1,
                                name: name,
                            });
                    }
                );
            });
        }
        else{
            res.send({
                upcoming: [],
                name: name
            })
        }
    });
};

const getPast = async (req, res) => {
    const { id } = req.params;
    Appointment.find({ idP: id }).then((resp) => {
        let arr = [],
            arr1 = [];
        resp.forEach((appointment) => {
            if (checkPast(appointment)) arr.push(appointment);
        });
        if (arr.length > 0) {
            arr.forEach((appointment, indx) => {
                Doctor.findById(appointment.idD, { name: 1, spec: 1 }).then((pat) => {
                    arr1.push({
                        id: appointment._id,
                        idP: appointment.idP,
                        idD: id,
                        date: appointment.date,
                        spec: pat.spec,
                        time: appointment.time,
                        name: pat.name,
                    });
                    if (indx === arr.length - 1)
                        res.send({
                            past: arr1,
                        });
                });
            });
        } else {
            res.send({
                past: [],
            });
        }
    });
};

module.exports = {getDoctors,getUpcoming,getPast}