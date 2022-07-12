const router = require("express").Router();
const { authenticate } = require('../controllers/authentication.controller')
const {
  getMovies,
  getMovie,
  addMovie,
  fullUpdateMovie,
  partialUpdateMovie,
  deleteMovie,
  getMoviesPageCount,
} = require("../controllers/movies.controller");


router.route(process.env.MOVIES_ROUTE).get(getMovies).post(authenticate, addMovie);

router.route(process.env.MOVIES_COUNT_ROUTE).get(getMoviesPageCount)

router
  .route(process.env.MOVIE_ROUTE)
  .get(getMovie)
  .put(authenticate, fullUpdateMovie)
  .patch(authenticate, partialUpdateMovie)
  .delete(authenticate, deleteMovie);

module.exports = router;
