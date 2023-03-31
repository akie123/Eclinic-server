const { Router } = require("express");
const router = Router();
const ContactusController = require("../controllers/contactus")

router.post("/",(req,res,next) => {
    if(req.body && req.body.phonenumber && req.body.name && req.body.email && req.body.query){
        next()
    }
    else{
        res.status(400);
    }
},ContactusController)

module.exports = router