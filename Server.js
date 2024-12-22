const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Books = require("./BooksSchema"); // Assuming you have this schema

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const MONG_URI = "mongodb://localhost:27017/BooksData";
mongoose.connect(MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
    console.log("MongoDB connected successfully!");
});

// Display all books
app.get("/allbooks", async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (error) {
        res.status(500).send("Error retrieving books: " + error.message);
    }
});

// Get a single book by ID
app.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Error retrieving book: " + error.message);
    }
});

// Add a book
app.post("/addbooks", async (req, res) => {
    try {
        const newBook = new Books(req.body);
        await newBook.save();
        res.status(200).json({ message: "Book added successfully!" });
    } catch (error) {
        res.status(400).send("Error adding book: " + error.message);
    }
});

// Update a book
app.post("/updatebook/:id", async (req, res) => {
    try {
        const updatedBook = await Books.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (updatedBook) {
            res.status(200).json({ message: "Book updated successfully!" });
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Error updating book: " + error.message);
    }
});

// Delete a book
app.post("/deleteBook/:id", async (req, res) => {
    try {
        const deletedBook = await Books.findByIdAndDelete(req.params.id);
        if (deletedBook) {
            res.status(200).send("Book deleted successfully!");
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Error deleting book: " + error.message);
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
