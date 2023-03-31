const mongoose = require("mongoose");
const { councils, state, specialization } = require("./constants")

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"]
  },
  dob: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,

  },
  reg: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  stateC: {
    type: String,
    required: true,
    // enum: councils
  },
  spec: {
    type: String,
    required: true,

  },
  fees: {
    type: Number,
    required: true,

  },
  verified: {
    type: Boolean,
    required: true
  },
  qualification:{
    type:String,
    required: true
  },
  appointment : {
    type : Array ,
    "default" : []
  },
  profilePic: {
    type: String,
    default:
      "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
  },
});

module.exports = mongoose.model("doctor", doctorSchema);