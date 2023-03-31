const rfs = require("rotating-file-stream");
const path = require("path");

// create a rotating write stream
module.exports.accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
