const { Router } = require("express");
const router = Router();
const { checkValidToken, checkValidUser } = require("../utils/jwt");
const {UpdateDp,Update} = require("../controllers/update");
const { getInfo } = require("../controllers/getinfo");
const appointment = require("../controllers/appointment")
const {getDoctors,getUpcoming,getPast} = require("../controllers/getP")
// Jwt Middleware
router.use(checkValidToken);

// Add slot
router.post("/appointment",appointment)

router.get("/getdoctors",getDoctors)

router.use("/:id", checkValidUser);

// DP update
router.post("/:id/updatedp", UpdateDp);

// Info update
router.post("/:id/update",Update);

// Get Info
router.get("/:id/getinfo", getInfo);

// Get upcoming
router.get("/:id/upcoming",getUpcoming);
// Past appointments
router.get("/:id/past",getPast)

module.exports = router;