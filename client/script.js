// Function to delete a book
function deleteBook(id) {
    fetch(`/api/books/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Book deleted successfully');
            getBooks(); 
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


function getBooks() {
    fetch('/api/books')
    .then(response => response.json())
    .then(data => {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';
        data.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${book.title}</strong>
                <div class="author">by ${book.author}</div>
                <div class="description">${book.description}</div>
                <div class="buttons">
                    <button class="btn-edit" onclick="editBook(${book.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteBook(${book.id})">Delete</button>
                </div>
            `;
            bookList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error getting books. Please try again.');
    });
}


function filterBooks() {
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const searchTerm = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    const bookList = document.getElementById('book-list');
    const books = Array.from(bookList.children);
    books.forEach(book => {
        const title = book.querySelector('strong').textContent.toLowerCase();
        const author = book.querySelector('.author').textContent.toLowerCase();

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
                <strong>${data.title}</strong>
                <div class="author">by ${data.author}</div>
                <div class="description">${data.description}</div>
                <div class="buttons">
                    <button class="btn-edit" onclick="editBook(${data.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteBook(${data.id})">Delete</button>
                </div>
            `;
            bookList.appendChild(li);
            getBooks(); 
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding book. Please try again.');
        });
    });

    searchInput.addEventListener('input', filterBooks);
    filterSelect.addEventListener('change', filterBooks);

    getBooks(); 

    
    const accordionButton = document.querySelector('.accordion-button');
    const collapseOne = document.getElementById('collapseOne');

    accordionButton.addEventListener('click', () => {
        if (collapseOne.classList.contains('show')) {
            collapseOne.classList.remove('show');
        } else {
            collapseOne.classList.add('show');
        }
    });
});