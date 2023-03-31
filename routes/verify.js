
const router = require('express').Router();
const verifyController = require('../controllers/verifyController');

router.post('/getcode', verifyController.getCode);
router.post('/verifycode', verifyController.verifyCode);

module.exports = router;