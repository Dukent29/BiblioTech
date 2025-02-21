// Function to delete a book
function deleteBook(id) {
    fetch(`/api/books/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Book deleted successfully');
            getBooks(); // Refresh the book list
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Error deleting book');
            });
        }
    })
    .catch(error => {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
    });
}

// Function to fetch and display books
function getBooks() {
    fetch('/api/books')
    .then(response => response.json())
    .then(data => {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';
        data.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${book.title}</strong> by ${book.author}
                <button onclick="deleteBook(${book.id})">Delete</button>
                <button onclick="editBook(${book.id})">Edit</button>
            `;
            bookList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error getting books. Please try again.');
    });
}

// Function to filter books based on search input and filter selection
function filterBooks() {
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const searchTerm = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    const bookList = document.getElementById('book-list');
    const books = Array.from(bookList.children);
    books.forEach(book => {
        const title = book.querySelector('strong').textContent.toLowerCase();
        const author = book.querySelector('span').textContent.toLowerCase();

        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            book.style.display = '';
        } else {
            book.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('add-book-form');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const publicationYear = document.getElementById('publication_year').value;
        const genre = document.getElementById('genre').value;
        const description = document.getElementById('description').value;

        fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                publicationYear,
                genre,
                description
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            const bookList = document.getElementById('book-list');
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${data.title}</strong> by ${data.author}
                <button onclick="deleteBook(${data.id})">Delete</button>
                <button onclick="editBook(${data.id})">Edit</button>
            `;
            bookList.appendChild(li);
            getBooks(); // Refresh the book list
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding book. Please try again.');
        });
    });

    searchInput.addEventListener('input', filterBooks);
    filterSelect.addEventListener('change', filterBooks);

    getBooks(); // Initial fetch of books
});