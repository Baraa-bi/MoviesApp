const mongoose = require("mongoose");
const request = require("../helpers/request");
const response = require("../helpers/response");
const { getObjectWithFields, updateDocumentWithFields } = require("../helpers");
const Movie = mongoose.model(process.env.MOVIE_MODEL_NAME);

const MOVIE_FIELDS = ["title", "image", "description", "numberOfDirectors", "awards"];


const findAllMovies = () => {
  return Movie.find().sort({ _id: -1 });
}
const findMoviesByTitle = (movieTitle) => {
  return Movie.find({ title: { $regex: movieTitle, $options: 'i' } });
}

const countAllMovies = () => {
  return Movie.count();
}
const countMoviesByTitle = (movieTitle) => {
  return Movie.count({ title: { $regex: movieTitle, $options: 'i' } });
}

const getMoviesCount = (req) => {
  const movieTitle = req.query?.movieTitle ?? ''
  if (movieTitle.length)
    return countMoviesByTitle(movieTitle.toLowerCase())
  return countAllMovies()
}

const findMovies = (req) => {
  const movieTitle = req.query?.movieTitle ?? ''
  if (movieTitle.length)
    return findMoviesByTitle(movieTitle.toLowerCase())
  return findAllMovies()
}

const getMovies = function (req, res) {
  request.validateCountOffset(req)
    .then(({ count, offset }) => findMovies(req).skip(offset).limit(count))
    .then((movies) => response.success(res, process.env.OK_STATUS, movies))
    .catch((err) => response.fail(res, process.env.ERROR_STATUS, err));
}

const getMoviesPageCount = (req, res) => {
  getMoviesCount(req).then((count) => {
    const pagesCount = parseInt(count, process.env.BASE_10) / parseInt(process.env.DEFAULT_COUNT_VALUE, process.env.BASE_10)
    response.success(res, process.env.OK_STATUS, pagesCount);
  }).catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
}

const addMovie = function (req, res) {
  const newMovie = getObjectWithFields(req.body, MOVIE_FIELDS);
  Movie.create(newMovie)
    .then((movie) => response.success(res, process.env.CREATED_STATUS, movie))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
}

const getMovie = function (req, res) {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => response.success(res, process.env.OK_STATUS, movie))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
}

const updateOne = function (req, res, updateType) {
  const { movieId } = req.params;
  Movie.findById(movieId).then((movie) => {
    movie = updateDocumentWithFields(movie, req.body, MOVIE_FIELDS, updateType);
    movie
      .save()
      .then((movie) => response.success(res, process.env.OK_STATUS, movie))
      .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
  });
}

const fullUpdateMovie = function (req, res) {
  updateOne(req, res, process.env.DOCUMENT_FULL_UPDATE);
}

const partialUpdateMovie = function (req, res) {
  updateOne(req, res, process.env.DOCUMENT_PARTIAL_UPDATE);
}

const deleteMovie = function (req, res) {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then((movie) => response.success(res, process.env.OK_STATUS, movie))
    .catch((error) => response.fail(res, process.env.ERROR_STATUS, error));
}

module.exports = {
  getMovies,
  addMovie,
  getMovie,
  fullUpdateMovie,
  getMoviesPageCount,
  partialUpdateMovie,
  deleteMovie,
}