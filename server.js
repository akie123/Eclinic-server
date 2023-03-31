const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const {accessLogStream} = require("./utils/morgan")
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")

// Routers
const PatientRouter = require("./routes/patient")
const DoctorRouter = require("./routes/doctor")
const AdminRouter = require("./routes/admin")
const LoginRouter = require("./routes/login")
const RegisterRouter = require("./routes/register")
const ContactusRouter = require("./routes/contactus")
const CancelRouter = require("./routes/cancel")
const VerifyRouter =require("./routes/verify")

// constanst
const { MONGO_URI,PORT } = require('./constants')

// Middlewares
app.use(cors())      // cors middleware
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(express.json({ limit: "2mb" }), (err, req, res, next) => {
  // bodyparse middle ware checks for valid body format
  if (err) 
    res.sendStatus(400);
  else 
    next();
});

// Connection to Database

mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT,() => {
        console.log(`Server Running on PORT ${PORT}`)
    })
})




const cron = require('node-cron');
const Doctor = require('./models/doctor');

cron.schedule('0 0 * * *', async () => {
    let docs = await Doctor.find({});

    for (let i = 0; i < docs.length; i++) {
        for (let j = 0; j < docs[i].appointment.length; j++) {
            const appointmentDate = docs[i].appointment[j].date;
            const currentDate = new Date().toDateString();

            if (docs[i].appointment[j].patientId!="" && appointmentDate != currentDate) {
                docs[i].appointment[j].avb = true;
                docs[i].appointment[j].patientId="";
            }
        }

        await docs[i].save();
    }
});
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Clinic",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],

};

const specs = swaggerJsDoc(options);

// const accountSid = "ACe3a758fd297164b3e3131ec6d89e354e";
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const verifySid = "VAb22e3cff8d2974f20a8e884b7dc6fad0";
// const client = require("twilio")(accountSid, authToken);
//
// app.post("/verify",(req,res)=>{
//     client.verify.v2
//         .services(verifySid)
//         .verifications.create({ to: `+91${req.body.number}`, channel: "sms" })
//         .then((data)=>{
//             res.status(200).send(data);
//         })
//         .catch((err)=>{
//             res.status(404).send(err)
//         })
// })

// Routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// Routes
app.use('/verify', VerifyRouter);
app.use("/login",LoginRouter)           // Login Router
app.use("/register",RegisterRouter)     // Register Router
app.use("/cancel",CancelRouter)
app.use("/contact-us",ContactusRouter)  // Contact us Router
app.use("/patient",PatientRouter)       // Patient Router
app.use("/doctor",DoctorRouter)         // Doctor Router
app.use("/admin",AdminRouter)           // Admin Router
app.use("*",(req,res) => {
  res.sendStatus(404)                   // No path found
})
