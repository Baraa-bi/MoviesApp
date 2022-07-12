const mongoose = require("mongoose");
const awardsModel = require("./award.model");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  awards: {
    type: [awardsModel],
    required: true,
  },
  numberOfDirectors: {
    min: 1,
    max: 3000,
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

mongoose.model(process.env.MOVIE_MODEL_NAME, movieSchema, process.env.MOVIES_COLLECTION_NAME);
