SET NAMES 'utf8mb4';

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


INSERT INTO books (title, author, publication_year, genre, description) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Novel', 'A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'),
('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 'A novel about the serious issues of rape and racial inequality, narrated by the young Scout Finch.'),
('1984', 'George Orwell', 1949, 'Dystopian', 'A novel that presents a dystopian future under a totalitarian regime.'),
('Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.'),
('Moby-Dick', 'Herman Melville', 1851, 'Adventure', 'A novel about the voyage of the whaling ship Pequod and its captain, Ahab, who is obsessed with revenge on Moby Dick, a white whale.')
;
