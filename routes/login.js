const { Router } = require("express");
const router = Router();
const LoginController = require("../controllers/login")
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and generate a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - password
 *             properties:
 *               number:
 *                 type: string
 *                 format: number
 *                 description: User number
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *     responses:
 *       200:
 *         description: Successfully authenticated user and generated token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token to be used for authenticated requests
 *       401:
 *         description: Invalid number or password
 *       500:
 *         description: Internal server error
 */
router.post("/",(req,res,next) => {
    if(req.body && req.body.number && req.body.password)
        next()
    else
        res.sendStatus(400)
},LoginController)

module.exports = router;