const { Router } = require("express");
const router = Router();
const { checkValidToken, checkValidUser } = require("../utils/jwt");
const cancel = require("../controllers/cancel")
// Jwt Middleware
router.use(checkValidToken);

// Cancel Slot
router.post("/",cancel)

module.exports = router;