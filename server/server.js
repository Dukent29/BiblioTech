const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000; // Use environment variable or default

// Function to connect to the database with retry logic
const connectWithRetry = () => {
    // Create a MySQL connection pool (using environment variables)
    const db = mysql.createPool({
        host: "db",
        user: "root",
        password: "root",
        database: "bibliotech_db",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            console.log("Retrying in 5 seconds...");
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log("Connected to MySQL!");
            connection.release(); // Release the connection back to the pool
        }
    });

    return db;
}

const db = connectWithRetry(); // Establish the database connection

// Middleware
app.use(express.json());

// Book API Routes
app.post("/books", (req, res) => {
    const { title, author, isbn, publication_year, genre, description } = req.body;

    const query = 'INSERT INTO books (title, author, isbn, publication_year, genre, description) VALUES (?,?,?,?,?,?)';
    db.query(query, [title, author, isbn, publication_year, genre, description], (err, results) => {
        if (err) {
            console.error("Error adding book:", err);
            res.status(500).json({ error: "Failed to add book" });
            return;
        }
        res.status(201).json({ message: "Book added successfully", bookId: results.insertId });
    });
});

// Get all books (GET /books)
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
      if (err) {
          console.error("Error retrieving books:", err);
          res.status(500).json({ error: "Failed to retrieve books" });
          return;
      }
      res.json(results);
  });
});

// Update a book (PUT /books/:id)
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, author, isbn, publication_year, genre, description } = req.body;

  const query = "UPDATE books SET title =?, author =?, isbn =?, publication_year =?, genre =?, description =? WHERE id =?";
  db.query(query, [title, author, isbn, publication_year, genre, description, bookId], (err, results) => {
      if (err) {
          console.error("Error updating book:", err);
          res.status(500).json({ error: "Failed to update book" });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: "Book not found" });
          return;
      }
      res.json({ message: "Book updated successfully" });
  });
});

// Get a specific book by ID (GET /books/:id)
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("SELECT * FROM books WHERE id =?", [bookId], (err, results) => {
      if (err) {
          console.error("Error retrieving book:", err);
          res.status(500).json({ error: "Failed to retrieve book" });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ error: "Book not found" });
          return;
      }
      res.json(results);
  });
});

// Delete a book (DELETE /books/:id)
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("DELETE FROM books WHERE id =?", [bookId], (err, results) => {
      if (err) {
          console.error("Error deleting book:", err);
          res.status(500).json({ error: "Failed to delete book" });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: "Book not found" });
          return;
      }
      res.json({ message: "Book deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});