const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/usersController");

router.route(process.env.USERS_ROUTE).post(registerUser);
router.route(process.env.USER_LOGIN_ROUTE).post(loginUser);

module.exports = router;
