const mongoose = require("mongoose");
const Movie = mongoose.model(process.env.MOVIE_MODEL_NAME);

const { getObjectWithFields, updateDocumentWithFields } = require("../helpers");
const response = require("../helpers/response");
const FIELDS = ["title", "year"];

const saveMovie = (movie) => {
  return movie.save()
}

const getAwards = function (req, res) {
  const { movieId } = req.params;
  Game.findById(movieId)
    .then((movie) => response.success(res, process.env.OK_STATUS, movie.awards))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

const deleteAwards = function (req, res) {
  const { movieId } = req.params;
  Game.findById(movieId)
    .then((movie) => {
      movie.awards = [];
      saveMovie(res, movie)
    })
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

const addAward = function (req, res) {
  const { movieId } = req.params;
  const newAward = getObjectWithFields(req.body, FIELDS);
  Movie.findById(movieId)
    .then((movie) => {
      movie.awards = (movie.awards ?? []).push(newAward);
      movie
        .save()
        .then((movie) => response.success(res, process.env.OK_STATUS, movie))
        .catch((error) => response.fail(res, error));
    })
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

const getAward = function (req, res) {
  const { awardId, movieId } = req.params;
  Game.findById(movieId)
    .then((movie) =>
      response.success(res, process.env.OK_STATUS, movie.awards.id(awardId))
    )
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

const updateOne = function (req, res, updateType) {
  const { movieId, awardId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      const award = updateDocumentWithFields(
        movie.awards.id(awardId),
        req.body,
        FIELDS,
        updateType
      );
      Movie.findOneAndUpdate(
        { _id: movieId, "awards._id": awardId },
        {
          $set: { "awards.$": award },
        }
      )
        .then((movie) => handleResponse(res, process.env.OK_STATUS, err, movie))
        .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
    })
    .catch((error) => response.fail(res, error));
};

const fullUpdateAward = function (req, res) {
  updateOne(req, res, process.env.DOCUMENT_FULL_UPDATE);
};

const partialUpdateAward = function (req, res) {
  updateOne(req, res, process.env.DOCUMENT_PARTIAL_UPDATE);
};

const deleteAward = function (req, res) {
  const { movieId, awardId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      movie.awards.id(awardId).remove();
      movie
        .save()
        .then((movie) => response.success(res, process.env.OK_STATUS, movie))
        .catch((error) => response.fail(res, error));
    })
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

module.exports = {
  getAwards,
  deleteAwards,
  addAward,
  getAward,
  fullUpdateAward,
  partialUpdateAward,
  deleteAward,
};
