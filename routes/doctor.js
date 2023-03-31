const { Router } = require("express");
const router = Router();
const { checkValidToken, checkValidUser } = require("../utils/jwt");
const { UpdateDp, Update } = require("../controllers/update");
const {getInfo} = require("../controllers/getinfo")
const {getSchedule,updateSchedule,getUpcoming,getPast} = require("../controllers/getD")

router.use(checkValidToken); // Jwt Middleware

router.use("/:id", checkValidUser);
/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - number
 *         - password
 *         - gender
 *         - city
 *         - state
 *         - profilePic
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
 *         profilePic:
 *           type: string
 *           description: doctor's state
 *
 */

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: The doctors managing API
 */

/**
 * @swagger
 * /doctor/{id}/updatedp:
 *  post:
 *      summary: To update the dp by ID
 *      description: To return a a object with given dp
 *      tags : [Doctors]
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
 *                          appointment:
 *                              type: Array
 *      responses:
 *          200:
 *              description: To return a particular user based on his email
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 */

router.post("/:id/updatedp", UpdateDp);

/**
 * @swagger
 * /doctor/{id}/update:
 *  post:
 *      summary: To update the fields by ID
 *      description: To return  a object with given fields
 *      tags : [Doctors]
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
 *                          appointment:
 *                              type: Array
 *      responses:
 *          200:
 *              description: To return a particular user based on his email
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 */
// Info update
router.post("/:id/update",Update);
/**
 * @swagger
 * /doctor/{id}/getInfo:
 *   get:
 *     summary: Returns the list of all the info
 *     security:
 *      - bearerAuth: []
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor id
 *     responses:
 *       200:
 *         description: The list of the info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// Get info
router.get("/:id/getinfo",getInfo)
/**
 * @swagger
 * /doctor/{id}/upcoming:
 *   get:
 *     summary: Returns the list of all the upcoming appointments
 *     security:
 *      - bearerAuth: []
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor id
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
/**
 * @swagger
 * /doctor/{id}/getschedule:
 *   get:
 *     summary: Returns the list of all the schedules
 *     security:
 *      - bearerAuth: []
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor id
 *     responses:
 *       200:
 *         description: The list of the schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// Schedule Manager
router.get("/:id/getschedule",getSchedule)
/**
 * @swagger
 * /doctor/{id}/updateschedule:
 *  post:
 *      summary: To return a particular user based on his email
 *      description: To return a particular user based on his email
 *      tags : [Doctors]
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
// Update Schedule Manager
router.post("/:id/updateschedule",updateSchedule)
// Past appointments
router.get("/:id/past",getPast)
module.exports = router;