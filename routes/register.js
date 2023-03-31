const { Router } = require("express");
const DoctorController = require("../controllers/doctorS");
const PatientController = require("../controllers/patientS");
const NumberController =require("../controllers/numberExist");
const EmailController = require("../controllers/emailExist");
const router = Router();
router.get("/number/:num",NumberController)
router.get("/email/:email",EmailController)
router.post("/signP",PatientController)
router.post("/signD",DoctorController)


module.exports = router;