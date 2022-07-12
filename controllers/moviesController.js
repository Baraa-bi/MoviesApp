const mongoose = require("mongoose");
const request = require("../helpers/request");
const response = require("../helpers/response");
const { getObjectWithFields, updateDocumentWithFields } = require("../helpers");
const Movie = mongoose.model(process.env.MOVIE_MODEL_NAME);

const MOVIE_FIELDS = ["title", "image", "description", "numberOfDirectors", "awards"];

const getMovies = function (req, res) {
  request
    .validateCountOffset(req)
    .then(({ count, offset }) => {
      Movie.find()
        .skip(offset)
        .limit(count)
        .sort({ _id: -1 })
        .then((movies) => response.success(res, process.env.OK_STATUS, movies))
        .catch((error) => response.fail(res, error));
    })
    .catch((err) => {
      response.fail(res, process.env.ERROR_STATUS, err);
    });
};

const getMoviesPageCount = (req, res) => {
  Movie.count()
    .then((count) => {
      const pagesCount = parseInt(count, process.env.BASE_10) / parseInt(process.env.DEFAULT_COUNT_VALUE, process.env.BASE_10)
      response.success(res, process.env.OK_STATUS, pagesCount)
    })
    .catch((error) => response.fail(res, error));
}

const addMovie = function (req, res) {
  const newMovie = getObjectWithFields(req.body, MOVIE_FIELDS);
  Movie.create(newMovie)
    .then((movie) => response.success(res, process.env.CREATED_STATUS, movie))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

const getMovie = function (req, res) {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => response.success(res, process.env.OK_STATUS, movie))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

const updateOne = function (req, res, updateType) {
  const { movieId } = req.params;
  Movie.findById(movieId).then((movie) => {
    movie = updateDocumentWithFields(movie, req.body, MOVIE_FIELDS, updateType);
    movie
      .save()
      .then((movie) => response.success(res, process.env.OK_STATUS, movie))
      .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
  });
};

const fullUpdateMovie = function (req, res) {
  updateOne(req, res, process.env.DOCUMENT_FULL_UPDATE);
};

const partialUpdateMovie = function (req, res) {
  updateOne(req, res, process.env.DOCUMENT_PARTIAL_UPDATE);
};

const deleteMovie = function (req, res) {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then((movie) => response.success(res, process.env.OK_STATUS, movie))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
};

module.exports = {
  getMovies,
  addMovie,
  getMovie,
  fullUpdateMovie,
  getMoviesPageCount,
  partialUpdateMovie,
  deleteMovie,
};
