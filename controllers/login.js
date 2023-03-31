const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Admin = require("../models/admin")
const {comparePasswords} = require("../utils/bcrypt");
const {generateToken} = require("../utils/jwt");

const helperFun = (user, number,id) => {
    let obj = {};
    obj.user = user;
    obj.number = number;
    obj.id = id;
    obj.jwtToken = generateToken(obj);
    return obj;
};

const invalidLoginCred = (res) => {
    res.status(401).send({
        err: "Invalid Login Credentials",
    });
};

const LoginController = async (req, res) => {
    let user = await Doctor.findOne(
        { number: req.body.number,verified: false },
        { password: 1 }
    ); // Checking for Doctor
    if (user !== null) {
        if (comparePasswords(req.body.password, user.password, user._id)) {
            res.status(200).send(helperFun("doctor", req.body.number, user._id));
        } else {
            invalidLoginCred(res);
        }
    } else {
        user = await Patient.findOne({ number: req.body.number }, { password: 1 }); // Checking for Patient
        if (user !== null) {
            if (comparePasswords(req.body.password, user.password, user._id)) {
                res.status(200).send(helperFun("patient", req.body.number, user._id));
            } else {
                invalidLoginCred(res);
            }
        } else {
            user = await Admin.findOne({number: req.body.number},{password: 1})
            if(user !== null) {
                if(comparePasswords(req.body.password,user.password)) {
                    res.status(200).send(helperFun("Admin",req.body.number,user._id));
                } else {
                    invalidLoginCred(res);
                }
            } else {
                invalidLoginCred(res);
            }
        }
    }
};

module.exports =  LoginController
