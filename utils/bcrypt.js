const bcrypt = require('bcrypt')

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

// First argument is unhashed password and the second argument takes in a hashed password.
function comparePasswords(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

module.exports = { hashPassword, comparePasswords };