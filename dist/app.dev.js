"use strict";

var express = require("express");

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var dotenv = require("dotenv");

dotenv.config();
var app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE_URL).then(function () {
  return console.log("Connected to MongoDB");
})["catch"](function (err) {
  return console.error(err);
});

var booksRouter = require("./routes/books");

app.use("/books", booksRouter);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=app.dev.js.map
