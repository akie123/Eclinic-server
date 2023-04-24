const mongoose = require('mongoose')
const { state } = require("./constants");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: state,
  },
  history:{
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    default:
      "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
  },
  socketId:{
    type:String,
    required: false
  }
});

module.exports = mongoose.model('patient',patientSchema)