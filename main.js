const addBookForm = document.getElementById('add-book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const unfinishedBooksList = document.getElementById('unfinished-books');
const finishedBooksList = document.getElementById('finished-books');

let books = [];

function addBook(event) {
  event.preventDefault();
  const id = +new Date();
  const title = titleInput.value;
  const author = authorInput.value;
  const year = yearInput.value;
  const isComplete = false;

  const book = { id, title, author, year, isComplete };
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));

  renderBooks();
  addBookForm.reset();
}

function removeBook(event) {
  const bookId = event.target.dataset.id;
  books = books.filter(book => book.id !== +bookId);

  localStorage.setItem('books', JSON.stringify(books));

  renderBooks();
}

function toggleComplete(event) {
  const bookId = event.target.dataset.id;
  const bookIndex = books.findIndex(book => book.id === +bookId);
  books[bookIndex].isComplete = !books[bookIndex].isComplete;

  localStorage.setItem('books', JSON.stringify(books));

  renderBooks();
}

function renderBooks() {
  unfinishedBooksList.innerHTML = '';
  finishedBooksList.innerHTML = '';

  books.forEach(book => {
    const bookElement = document.createElement('li');
    bookElement.classList.add('book-item');
    bookElement.dataset.id = book.id;

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = `Penulis: ${book.author}`;

    const bookYear = document.createElement('p');
    bookYear.innerText = `Tahun: ${book.year}`;

    const bookAction = document.createElement('div');
    bookAction.classList.add('book-action');

    const removeButton = document.createElement('button');
    removeButton.classList.add('delete-button');
    removeButton.innerText = 'Hapus buku';
    removeButton.dataset.id = book.id;
    removeButton.addEventListener('click', removeBook);

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.innerText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    toggleButton.dataset.id = book.id;
    toggleButton.addEventListener('click', toggleComplete);

    bookAction.appendChild(removeButton);
    bookAction.appendChild(toggleButton);

    bookElement.appendChild(bookTitle);
    bookElement.appendChild(bookAuthor);
    bookElement.appendChild(bookYear);
    bookElement.appendChild(bookAction);

    if (book.isComplete) {
      finishedBooksList.appendChild(bookElement);
    } else {
      unfinishedBooksList.appendChild(bookElement);
    }
  });
}

function init() {
  const storedBooks = localStorage.getItem('books');

  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
}

addBookForm.addEventListener('submit', addBook);

init();
