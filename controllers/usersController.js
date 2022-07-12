const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const response = require("../helpers/response");
const { getObjectWithFields } = require("../helpers");

const USER_FIELDS = ["name", "username", "password"];
const User = mongoose.model(process.env.USER_MODEL_NAME);

const _hashField = (field, salt) => {
  return bcrypt.hash(field, salt)
}

const _generateSalt = () => {
  return bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
}

const _validateReqBody = (requestBody) => {
  console.log(requestBody);
  return getObjectWithFields(requestBody, USER_FIELDS);
}

const _createUser = (user) => {
  return User.create(user)
}

const _checkUserPassword = (password, user) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(password, user.password).then((matched) => {
      return matched ? resolve(user) : reject(process.env.PASSOWRD_VALIDATION_MSG)
    }).catch(e => reject(e))
  })

}

const _generateToken = (user) => {
  const token = jwt.sign({ name: user.name }, progess.env.JWT_PRIVATE_KEY, { expiresIn: 3000 });
  return token;
}

const registerUser = function (req, res) {
  const { password } = req.body;
  return _generateSalt()
    .then(salt => _hashField(password, salt))
    .then((hashedPassword) => _validateReqBody({ ...req.body, password: hashedPassword }))
    .then(_createUser)
    .then((user) => response.success(res, process.env.CREATED_STATUS, user))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error))
};

const loginUser = function (req, res) {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => _checkUserPassword(password, user))
    .then(_generateToken)
    .then((user) => response.success(res, process.env.OK_STATUS, user))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};


module.exports = {
  registerUser,
  loginUser,
};
