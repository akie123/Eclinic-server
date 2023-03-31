const accountSid = "ACe3a758fd297164b3e3131ec6d89e354e";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VAb22e3cff8d2974f20a8e884b7dc6fad0";
const client = require("twilio")(accountSid, authToken);

exports.getCode = async (req, res) => {

    client.verify.v2
        .services(verifySid)
        .verifications.create({ to: `+91${req.body.number}`, channel: "sms" })
        .then((data)=>{
            res.status(200).send(data);
        })
        .catch((err)=>{
            res.status(404).send(err)
        })

};

exports.verifyCode = async (req, res) => {

    client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to:`+91${req.body.number}`, code:req.body.code })
        .then((verification_check) =>{
            console.log(verification_check.status)
            res.json({check:verification_check.status})
        } )
        .catch((err)=>{
            console.log(err)
            res.json({check:"error"})
        })

};