"use strict";

var express = require("express");

var router = express.Router();

var Book = require("../models/Book");

var nodemailer = require("nodemailer"); // Email configuration


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
}); // Add a new book

router.post("/add", function _callee(req, res) {
  var _req$body, title, author, publishedYear, genre, availableCopies, email, newBook, mailOptions;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, author = _req$body.author, publishedYear = _req$body.publishedYear, genre = _req$body.genre, availableCopies = _req$body.availableCopies, email = _req$body.email;
          _context.prev = 1;
          newBook = new Book({
            title: title,
            author: author,
            publishedYear: publishedYear,
            genre: genre,
            availableCopies: availableCopies
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(newBook.save());

        case 5:
          // Send confirmation email
          mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Book Added Successfully",
            text: "The book \"".concat(title, "\" has been added to the library.")
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return console.log(error);
            }

            console.log("Email sent: " + info.response);
          });
          res.status(201).json(newBook);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.status(400).json({
            message: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // View all books

router.get("/", function _callee2(req, res) {
  var books;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Book.find());

        case 3:
          books = _context2.sent;
          res.json(books);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // View a single book by ID

router.get("/:id", function _callee3(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context3.sent;

          if (!(book == null)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Book not found"
          }));

        case 6:
          res.json(book);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Update a book

router.patch("/:id", function _callee4(req, res) {
  var book, updatedBook;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context4.sent;

          if (!(book == null)) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Book not found"
          }));

        case 6:
          if (req.body.title != null) {
            book.title = req.body.title;
          }

          if (req.body.author != null) {
            book.author = req.body.author;
          }

          if (req.body.publishedYear != null) {
            book.publishedYear = req.body.publishedYear;
          }

          if (req.body.genre != null) {
            book.genre = req.body.genre;
          }

          if (req.body.availableCopies != null) {
            book.availableCopies = req.body.availableCopies;
          }

          _context4.next = 13;
          return regeneratorRuntime.awrap(book.save());

        case 13:
          updatedBook = _context4.sent;
          res.json(updatedBook);
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            message: _context4.t0.message
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
}); // Delete a book

router["delete"]("/:id", function _callee5(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context5.sent;

          if (!(book == null)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Book not found"
          }));

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(book.remove());

        case 8:
          res.json({
            message: "Book deleted"
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = router;
//# sourceMappingURL=books.dev.js.map
