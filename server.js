const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { accessLogStream } = require("./utils/morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Routers
const PatientRouter = require("./routes/patient");
const DoctorRouter = require("./routes/doctor");
const AdminRouter = require("./routes/admin");
const LoginRouter = require("./routes/login");
const RegisterRouter = require("./routes/register");
const ContactusRouter = require("./routes/contactus");
const CancelRouter = require("./routes/cancel");
const VerifyRouter = require("./routes/verify");
const PrescriptionRouter = require("./routes/prescription");
// constanst
const { MONGO_URI, PORT } = require("./constants");


// Middlewares
app.use(cors()); // cors middleware
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(express.json({ limit: "2mb" }), (err, req, res, next) => {
  // bodyparse middle ware checks for valid body format
  if (err) res.sendStatus(400);
  else next();
});

// Connection to Database

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`);
    });
  });


const Doctor = require("./models/doctor");

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
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
const Patient = require("./models/patient");


// Routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// Routes
app.use("/verify", VerifyRouter);
app.use("/login", LoginRouter); // Login Router
app.use("/register", RegisterRouter); // Register Router
app.use("/cancel", CancelRouter);
app.use("/contact-us", ContactusRouter); // Contact us Router
app.use("/patient", PatientRouter); // Patient Router
app.use("/doctor", DoctorRouter); // Doctor Router
app.use("/admin", AdminRouter); // Admin Router
app.use("/prescription", PrescriptionRouter); // Prescription Router

app.post("/addIdP", (req, res) => {

  Patient.findByIdAndUpdate(req.body.id, { socketId: req.body.sid })
      .then(() => {
        res.json({ status: "success" });
      })
      .catch((err) => {
        res.json({ status: "failed" });
      });
});
app.post("/addIdD", (req, res) => {
  Doctor.findByIdAndUpdate(req.body.id, { socketId: req.body.sid })
      .then(() => {
        res.json({ status: "success" });
      })
      .catch((err) => {
        res.json({ status: "failed" });
      });
});

app.get("/pat/:idP", async (req, res) => {
  Patient.findById(req.params.idP)
      .then((pat) => {
        if (pat) res.status(201).json({ socket: pat.socketId });
        else res.status(201).json({ socket: "" });
      })
      .catch((err) => {
        res.status(201).json({ socket: "" });
      });
});

app.use("*", (req, res) => {
  res.sendStatus(404); // No path found
});

module.exports = app;
