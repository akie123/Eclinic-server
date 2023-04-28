const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Prescription = require("../models/prescription");
const Appointment = require("../models/appointment");
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
    let currentTime = new Date();

    let currentOffset = currentTime.getTimezoneOffset();

    let ISTOffset = 330; // IST offset UTC +5:30

    let ISTTime = new Date(
      currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );
  let todaydate = ISTTime
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

const checkSlot = (str) => {
  let currentTime = new Date();

  let currentOffset = currentTime.getTimezoneOffset();

  let ISTOffset = 330; // IST offset UTC +5:30

  let ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  let hoursIST = ISTTime.getHours();
  let minutesIST = ISTTime.getMinutes();
  let hours = str.substring(0, 2);
  let minutes = str.substring(3, 5);
  let num = hours - hoursIST;
  num *= 60;
  let num1 = minutes - minutesIST;
  return (num + num1) * 60 > 2000;
};

const getDoctors = async (req, res) => {
  const { department } = req.query;
  let cacheResults = await redisClient.get(department);
  if (cacheResults) {
    cacheResults = JSON.parse(cacheResults);
    for (let i = 0; i < cacheResults.length; i++) {
      for (let j = 0; j < cacheResults[0].appointment.length; j++) {
        if (
          cacheResults[i].appointment[j].avb === true &&
          !checkSlot(cacheResults[i].appointment[j].time)
        ) {
          cacheResults[i].appointment[j].avb = false;
        }
      }
    }
    res.send(cacheResults);
  } else {
    Doctor.find(
      { verified: true, spec: department },
      {
        name: 1,
        spec: 1,
        fees: 1,
        exp: 1,
        qualification: 1,
        appointment: 1,
        profilePic: 1,
      }
    ).then((resp) => {
      for (let i = 0; i < resp.length; i++) {
        for (let j = 0; j < resp[0].appointment.length; j++) {
          if (
            resp[i].appointment[j].avb === true &&
            !checkSlot(resp[i].appointment[j].time)
          ) {
            resp[i].appointment[j].avb = false;
          }
        }
      }
      redisClient.set(department, JSON.stringify(resp));
      res.send(resp);
    });
  }
};

const getUpcoming = async (req, res) => {
  const { id } = req.params;
  let name = await Patient.findById(id, { name: 1 });
  if (name) name = name.name;
  Appointment.find({ idP: id }).then((resp) => {
    let arr = [],
      arr1 = [];
    resp.forEach((appointment) => {
      if (!checkPast(appointment)) {
        arr.push(appointment);
      }
    });
    if (arr.length > 0) {
      arr.forEach((appointment, indx) => {
        Doctor.findById(appointment.idD, {
          name: 1,
          spec: 1,
          qualification: 1,
          exp: 1,
          profilePic: 1,
        }).then((doc) => {
          arr1.push({
            id: appointment._id,
            idD: appointment.idD,
            idP: id,
            time: appointment.time,
            name: doc.name,
            spec: doc.spec,
            profilePic: doc.profilePic,
            exp: doc.exp,
            qualification: doc.qualification,
          });
          if (arr1.length === arr.length)
            res.send({
              upcoming: arr1,
              name: name,
            });
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
          if (arr1.length === arr.length) {
            for (let i = 0; i < arr1.length; i++) {
              Prescription.findOne({ app_id: arr1[i].id }).then((resp) => {
                arr1[i].prescription = resp;
                if (i == arr1.length - 1) {
                  res.send({
                    past: arr1,
                  });
                }
              });
            }
          }
        });
      });
    } else {
      res.send({
        past: [],
      });
    }
  });
};

module.exports = { getDoctors, getUpcoming, getPast };