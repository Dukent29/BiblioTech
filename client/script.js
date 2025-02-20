const addBookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const publicationYear = document.getElementById('publication-year').value;
    const genre = document.getElementById('genre').value;
    const description = document.getElementById('description').value;

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            author,
            isbn,
            publication_year: publicationYear,
            genre, // Include genre
            description // Include description
        }),
    })
      .then((response) => response.json())
      .then((data) => {
            console.log('Success:', data);
            const li = document.createElement('li');
            li.innerHTML = `
            **${data.title}** by ${data.author}
            <button onclick="deleteBook(${data.id})">Delete</button>
            <button onclick="editBook(${data.id})">Edit</button>
        `;
            bookList.appendChild(li);
        })
      .catch((error) => {
            console.error('Error:', error);
            alert('Error adding book. Please try again.');
        });
});

function getBooks() {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
            bookList.innerHTML = '';
            books.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    **${book.title}** by ${book.author}
                    <button onclick="deleteBook(${book.id})">Delete</button>
                    <button onclick="editBook(${book.id})">Edit</button>
                `;
                bookList.appendChild(li);
            });
        })
      .catch(error => {
            console.error('Error fetching books:', error);
        });
}

function deleteBook(bookId) {
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE',
    })
      .then(response => {
            if (response.ok) {
                console.log('Book deleted successfully');
                getBooks();
            } else {
                console.error('Error deleting book');
            }
        })
      .catch(error => {
            console.error('Error deleting book:', error);
        });
}

function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

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

searchInput.addEventListener('input', filterBooks);
filterSelect.addEventListener('change', filterBooks);

getBooks();