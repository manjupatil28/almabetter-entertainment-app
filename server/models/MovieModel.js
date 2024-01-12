const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    category: String,
    rating: String,
    isTrending: Boolean,
  });
 module.exports = mongoose.model('Movie', movieSchema);