const { Router } = require("express");
const router = Router();
const LoginController = require("../controllers/login")

router.post("/",(req,res,next) => {
    if(req.body && req.body.number && req.body.password)
        next()
    else
        res.sendStatus(400)
},LoginController)

module.exports = router;