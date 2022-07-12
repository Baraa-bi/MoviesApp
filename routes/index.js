const router = require("express").Router();

const { authenticate } = require('../controllers/authentication.controller');

const usersRoute = require("./users.route");
const moviesRoute = require("./movies.route");
const awardsRoute = require("./awards.route");


router.use(usersRoute);
router.use(moviesRoute);
router.use(authenticate, awardsRoute);

module.exports = router;
