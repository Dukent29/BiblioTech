CREATE DATABASE IF NOT EXISTS bibliotech_db;  
USE bibliotech_db;  

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,  
    author VARCHAR(255),  
    publication_year INT,  
    genre VARCHAR(255),   
    description TEXT,       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);


ALTER TABLE books ADD INDEX (title);
ALTER TABLE books ADD INDEX (author);
ALTER TABLE books ADD INDEX (isbn);