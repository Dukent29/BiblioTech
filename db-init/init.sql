CREATE DATABASE IF NOT EXISTS bibliotech_db;  -- Create the database if it doesn't exist
USE bibliotech_db;  -- Select the database

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each book
    title VARCHAR(255) NOT NULL,  -- Title of the book (required)
    author VARCHAR(255),  -- Author of the book
    isbn VARCHAR(20),  -- ISBN (International Standard Book Number)
    publication_year INT,  -- Year of publication
    genre VARCHAR(255),   -- Optional: Genre of the book
    description TEXT,       -- Optional: A brief description
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp of last update
);

-- Optional: Add indexes for faster searching
ALTER TABLE books ADD INDEX (title);
ALTER TABLE books ADD INDEX (author);
ALTER TABLE books ADD INDEX (isbn);