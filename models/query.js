const mongoose = require("mongoose");

const queriesSchema = mongoose.Schema({
  phonenumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("queries",queriesSchema);