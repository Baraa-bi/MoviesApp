const jwt = require('jsonwebtoken');
const util = require('util');
const response = require('../helpers/response')

const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
        return response.fail(res, process.env.NOT_AUTHORIZED_STATUS, process.env.NO_TOKEN_PROVIDED_MSG);

    const verifyToken = util.promisify(jwt.verify);
    const token = authorizationHeader.split(' ')[1];

    verifyToken(token, process.env.JWT_PRIVATE_KEY)
        .then(() => next())
        .catch(() => response.fail(res, process.env.NOT_AUTHORIZED_STATUS, process.env.UNAUTHARIZED_MSG))
}

module.exports = { authenticate }