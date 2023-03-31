const jwt = require("jsonwebtoken");
const SECRET_TOKEN = require("../constants");

const generateToken = (data) => {
  return jwt.sign(data, `${SECRET_TOKEN}`);
};

const checkValidToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) res.sendStatus(401); // unauthorized
  else {
    jwt.verify(token,`${SECRET_TOKEN}`, (err, user) => {
      if (err) {
        res.sendStatus(403);  // forbidden 
      }
      else {
        req.user = user;      // If valid jwt token sets a new field in request object as user and decrypted jwt token.
        next();
      }
    });
  }
};

const checkValidUser = (req,res,next) => {
   const { id } = req.params;
   if (id === req.user.id) {
     next();
   } else {
     res.status(403).send({
       err: "Unauthorized to view this page",
     });
   }
}

module.exports = {generateToken,checkValidToken,checkValidUser}