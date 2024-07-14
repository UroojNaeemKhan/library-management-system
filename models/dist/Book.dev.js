"use strict";

var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  genre: String,
  availableCopies: Number
});
module.exports = mongoose.model("Book", bookSchema);
//# sourceMappingURL=Book.dev.js.map
