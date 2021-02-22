const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  storyline: String,
  genre: String,
  release_year: Number,
  runtime: Number
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;