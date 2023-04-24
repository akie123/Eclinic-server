const { Router } = require("express");
const router = Router();

const { checkValidToken } = require("../utils/jwt");
const {AddPrescription} = require("../controllers/prescription")

router.use(checkValidToken) // JWT Midddleware

router.post("/",AddPrescription)


module.exports = router