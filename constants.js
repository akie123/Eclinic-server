require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = { MONGO_URI, PORT, SECRET_TOKEN };
