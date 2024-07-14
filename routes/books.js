const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const nodemailer = require("nodemailer");

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Add a new book
router.post("/add", async (req, res) => {
  const { title, author, publishedYear, genre, availableCopies, email } =
    req.body;
  try {
    const newBook = new Book({
      title,
      author,
      publishedYear,
      genre,
      availableCopies,
    });
    await newBook.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Book Added Successfully",
      text: `The book "${title}" has been added to the library.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a book
router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

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

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.remove();
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
