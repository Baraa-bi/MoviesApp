const router = require("express").Router();
const {
  getAwards,
  getAward,
  addAward,
  fullUpdateAward,
  partialUpdateAward,
  deleteAward,
} = require("../controllers/awardsController");

router.route(process.env.MOVIE_AWARDS_ROUTE).get(getAwards).post(addAward);

router
  .route(process.env.MOVIE_AWARD_ROUTE)
  .get(getAward)
  .put(fullUpdateAward)
  .patch(partialUpdateAward)
  .delete(deleteAward);

module.exports = router;
