const jwt = require('jsonwebtoken');
const response = require('../helpers/response')

const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        if (jwt.verify(token, process.env.JWT_PRIVATE_KEY))
            return next();
        response.fail(res, process.env.NOT_AUTHORIZED_STATUS, process.env.UNAUTHARIZED_MSG);
    } else {
        response.fail(res, process.env.NOT_AUTHORIZED_STATUS, process.env.NO_TOKEN_PROVIDED_MSG);
    }
}

module.exports = {
    authenticate
}