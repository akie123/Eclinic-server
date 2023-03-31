const { Router } = require("express");
const router = Router();
const { checkValidToken, checkValidUser } = require("../utils/jwt");
const { UpdateDp, Update } = require("../controllers/update");
const {getInfo} = require("../controllers/getinfo")
const {getSchedule,updateSchedule,getUpcoming,getPast} = require("../controllers/getD")

router.use(checkValidToken); // Jwt Middleware

router.use("/:id", checkValidUser);

router.post("/:id/updatedp", UpdateDp);

// Info update
router.post("/:id/update",Update);

// Get info
router.get("/:id/getinfo",getInfo)

// Get upcoming
router.get("/:id/upcoming",getUpcoming);

// Schedule Manager
router.get("/:id/getschedule",getSchedule)

// Update Schedule Manager
router.post("/:id/updateschedule",updateSchedule)
// Past appointments
router.get("/:id/past",getPast)
module.exports = router;