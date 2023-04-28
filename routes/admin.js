const {Router} = require('express')
const router = Router()
const { checkValidToken, checkValidUser } = require("../utils/jwt");

const Patient = require('../models/patient');
const Query = require('../models/query');
const Doctor = require('../models/doctor');
router.use(checkValidToken); // Jwt Middleware

router.get('/queries/:id', async (req, res) => {
    console.log('Fetching queries...');
    const {id} = req.params
    try {
        const query = await Query.findById(id);
        console.log(`Found one queries`);
        console.log(query)
        res.send(query);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.delete("/queries/:id", async (req, res) => {
  console.log("Fetching queries...");
  const { id } = req.params;
  try {
    const query = await Query.findByIdAndDelete(id);
    console.log(`Found one queries`);
    console.log(query);
    res.send(query);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

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
 * /admin/patients:
 *   get:
 *     summary: Returns the list of all the patients
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
router.get('/patients', async (req, res) => {
    console.log('Fetching patients...');
    try {
        const patients = await Patient.find();
        console.log(`Found ${patients.length} doctors`);
        res.send({ patients });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

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
 *   name: Doctors
 *   description: The doctors managing API
 */

/**
 * @swagger
 * /admin/doctors:
 *   get:
 *     summary: Returns the list of all the doctors
 *     security:
 *      - bearerAuth: []
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: The list of the doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get('/doctors', async (req, res) => {
    console.log('Fetching doctors...');
    try {
        const doctors = await Doctor.find({ verified: false });
        console.log(`Found ${doctors.length} doctors`);
        res.send({ doctors });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Query:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - number
 *         - query
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
 *         query:
 *           type: string
 *           description: doctor's password
 *
 */

/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: queries entered
 */

/**
 * @swagger
 * /admin/queries:
 *   get:
 *     summary: Returns the list of all the queries
 *     security:
 *      - bearerAuth: []
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The list of the queries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get('/queries', async (req, res) => {
    console.log('Fetching queries...');
    try {
        const queries = await Query.find();
        console.log(`Found ${queries.length} queries`);
        res.send({ queries });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
/**
 * @swagger
 * /admin/verifieddoctors:
 *   get:
 *     summary: Returns the list of all the verified doctors
 *     security:
 *      - bearerAuth: []
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: The list of the verified doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get('/verifieddoctors', async (req, res) => {
    console.log('Fetching doctors...');
    try {
        const doctors = await Doctor.find({ verified: true });
        console.log(`Found ${doctors.length} doctors`);
        res.send({ doctors });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

/**
 * @swagger
 * /admin/doctors/{id}:
 *  put:
 *    summary: Update the doctor by the id
 *    security:
 *     - bearerAuth: []
 *    tags: [Doctors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Doctor'
 *    responses:
 *      200:
 *        description: The doctor was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Doctor'
 *      404:
 *        description: The doctor was not found
 *      500:
 *        description: Some error happened
 */
router.put('/doctors/:id', (req, res) => {
    const id = req.params.id;
    Doctor.findByIdAndUpdate(id, { verified: true })
        .then((updatedDoctor) => {
            console.log('Doctor updated successfully');
            res.send(updatedDoctor);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Error updating doctor' });
        });

});

/**
 * @swagger
 * /admin/verifieddoctors/{id}:
 *   delete:
 *     summary: Remove the doctor by id
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
 *
 *     responses:
 *       200:
 *         description: The doctor was deleted
 *       404:
 *         description: The doctor was not found
 */

router.delete('/verifieddoctors/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Doctor.findByIdAndDelete({_id:id}).then((result)=>{
        console.log(result);
    })
});

/**
 * @swagger
 * /admin/patients/{id}:
 *   delete:
 *     summary: Remove the doctor by id
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
 *
 *     responses:
 *       200:
 *         description: The patient was deleted
 *       404:
 *         description: The patient was not found
 */

router.delete('/patients/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Patient.findByIdAndDelete({_id:id}).then((result)=>{
        console.log(result);
    })
});
module.exports = router