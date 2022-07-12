const router = require("express").Router();

const {
  getMovies,
  getMovie,
  addMovie,
  fullUpdateMovie,
  partialUpdateMovie,
  deleteMovie,
  getMoviesPageCount,
} = require("../controllers/moviesController");

router.route(process.env.MOVIES_ROUTE).get(getMovies).post(addMovie);

router.route(process.env.MOVIES_COUNT_ROUTE).get(getMoviesPageCount)

router
  .route(process.env.MOVIE_ROUTE)
  .get(getMovie)
  .put(fullUpdateMovie)
  .patch(partialUpdateMovie)
  .delete(deleteMovie);

module.exports = router;
