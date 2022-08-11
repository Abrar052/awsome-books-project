import Library from './js/list.js';

const library = new Library();

// BOOK ELEMENT

const listOfBooksElement = document.querySelector('#books .list-books');

function deleteBook(parentContainer, id) {
  parentContainer.remove();
  library.remove(id);
}

function CreateBookItemHTML(id, title, author) {
  const divContainer = document.createElement('div');
  const bookTitleAndAuthor = document.createElement('p');
  const deleteBookBtn = document.createElement('button');

  divContainer.id = `Book-${id}`;
  divContainer.classList.add('details');

  bookTitleAndAuthor.innerText = `"${title}" by ${author}`;
  bookTitleAndAuthor.classList.add('title');
  bookTitleAndAuthor.classList.add('author');

  deleteBookBtn.innerText = 'Remove';
  deleteBookBtn.classList.add('delete');

  deleteBookBtn.addEventListener('click', () => {
    deleteBook(divContainer, id);
  });

  divContainer.appendChild(bookTitleAndAuthor);
  divContainer.appendChild(deleteBookBtn);

  return divContainer;
}

function AddBookToContainer(book) {
  listOfBooksElement.appendChild(CreateBookItemHTML(book.id, book.title, book.author));
}

function createBookListing() {
  library.books.forEach((book) => {
    AddBookToContainer(book);
  });
}

// ADD book from

const addBookForm = document.querySelector('#book-form');
const bookTitleInput = addBookForm.querySelector('#title');
const bookAuthorInput = addBookForm.querySelector('#author');

function addBook(e) {
  e.preventDefault();
  AddBookToContainer(library.createBookAndAdd(bookTitleInput.value, bookAuthorInput.value));
  return false;
}

function addBookButtonLIstener() {
  addBookForm.addEventListener('submit', addBook);
}

// INITS

function init() {
  library.initBookStorage();
  createBookListing();
  addBookButtonLIstener();
}

window.addEventListener('load', init);