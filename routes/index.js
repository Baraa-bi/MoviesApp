const router = require("express").Router();

const usersRoute = require("./users.route");
const moviesRoute = require("./movies.route");
const awardsRoute = require("./awards.route");


router.use(usersRoute);
router.use(moviesRoute);
router.use(awardsRoute);

module.exports = router;
