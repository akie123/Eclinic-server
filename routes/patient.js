const { Router } = require("express");
const router = Router();
const { checkValidToken, checkValidUser } = require("../utils/jwt");
const {UpdateDp,Update} = require("../controllers/update");
const { getInfo } = require("../controllers/getinfo");
const appointment = require("../controllers/appointment")
const {getDoctors,getUpcoming,getPast} = require("../controllers/getP")
// Jwt Middleware
router.use(checkValidToken);
/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - number
 *         - password
 *         - gender
 *         - city
 *         - state
 *
 *
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the doctor
 *         name:
 *           type: string
 *           description: doctor's name
 *         email:
 *           type: string
 *           description: doctor's email
 *         number:
 *           type: number
 *           description: doctor's phone number
 *         password:
 *           type: string
 *           description: doctor's password
 *         gender:
 *           type: string
 *           description: doctor's gender
 *         city:
 *           type: string
 *           description: doctor's city
 *         state:
 *           type: string
 *           description: doctor's state
 *
 */

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: The patients managing API
 */

/**
 * @swagger
 * /doctor/{id}/updateschedule:
 *  post:
 *      summary: To return a particular user based on his email
 *      description: To return a particular user based on his email
 *      tags : [Patients]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          appointments:
 *                              type: Array
 *      responses:
 *          200:
 *              description: To return a particular user based on his email
 *              content:
 *                  Schedule got updated
 */
// Add slot
router.post("/appointment",appointment)
/**
 * @swagger
 * /patient/getdoctors:
 *   get:
 *     summary: Returns the list of all the doctors
 *     security:
 *      - bearerAuth: []
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: The list of the patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/getdoctors",getDoctors)

router.use("/:id", checkValidUser);
/**
 * @swagger
 * /patients/{id}/updatedp:
 *  post:
 *      summary: To update the dp by ID
 *      description: To return a a object with given dp
 *      tags : [Patients]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          appointment:
 *                              type: Array
 *      responses:
 *          200:
 *              description: To updaate the dp of patient
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 */
// DP update
router.post("/:id/updatedp", UpdateDp);

// Info update
router.post("/:id/update",Update);
/**
 * @swagger
 * /patient/{id}/getInfo:
 *   get:
 *     summary: Returns the list of all the info
 *     security:
 *      - bearerAuth: []
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *     responses:
 *       200:
 *         description: The list of the info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// Get Info
router.get("/:id/getinfo", getInfo);
/**
 * @swagger
 * /patient/{id}/upcoming:
 *   get:
 *     summary: Returns the list of all the upcoming appointments
 *     security:
 *      - bearerAuth: []
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *     responses:
 *       200:
 *         description: The list of the upcoming appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// Get upcoming
router.get("/:id/upcoming",getUpcoming);
// Past appointments
router.get("/:id/past",getPast)

module.exports = router;