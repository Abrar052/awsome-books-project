let library = {
  nextId: 0, // return to 0;
  books: [],
  add: (title, author) => {
    const newBook = {
      id: library.nextId,
      title,
      author,
    };

    library.books.push(newBook);

    library.nextId += 1;
    return newBook;
  },
  remove: (id) => {
    library.books = library.books.filter((book) => book.id !== id);
  },
};

// Book local storage

/* Check for storage Availability copy form documentation */
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && (storage && storage.length !== 0);
  }
}

function getStoreFormData(key = 'Library-data') {
  return JSON.parse(localStorage.getItem(key));
}

function updateStoreFormData(formObj, key = 'Library-data') {
  localStorage.setItem(
    key,
    JSON.stringify(formObj),
  );
}

function initBookStorage() {
  if (!storageAvailable('localStorage')) return;
  library = Object.assign(library, getStoreFormData());
}

// BOOK ELEMENT

const listOfBooksElement = document.querySelector('#books .list-books');

function deleteBook(parentContainer, id) {
  parentContainer.remove();
  library.remove(id);
  updateStoreFormData(library);
}

function CreateBookItemHTML(id, title, author) {
  const divContainer = document.createElement('div');
  const bokkTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const deleteBookBtn = document.createElement('button');
  const hr = document.createElement('hr');

  divContainer.id = `Book-${id}`;

  bokkTitle.innerText = title;
  bokkTitle.classList.add('book-title');
  bookAuthor.innerText = author;
  bokkTitle.classList.add('book-author');

  deleteBookBtn.innerText = 'Remove';

  deleteBookBtn.addEventListener('click', () => {
    deleteBook(divContainer, id);
  });

  divContainer.appendChild(bokkTitle);
  divContainer.appendChild(bookAuthor);
  divContainer.appendChild(deleteBookBtn);
  divContainer.appendChild(hr);

  return divContainer;
}

function AddBookToContainerElement(book) {
  listOfBooksElement.appendChild(CreateBookItemHTML(book.id, book.title, book.author));
}

function createBookListing() {
  library.books.forEach((book) => {
    AddBookToContainerElement(book);
  });
}

// ADD book from

const addBookForm = document.querySelector('#book-form');
const bookTitleInput = addBookForm.querySelector('#title');
const bookAuthorInput = addBookForm.querySelector('#author');

function addBook(e) {
  e.preventDefault();
  AddBookToContainerElement(library.add(bookTitleInput.value, bookAuthorInput.value));
  updateStoreFormData(library);
  return false;
}

function addBookButtonLIstener() {
  addBookForm.addEventListener('submit', addBook);
}

// INITS

function init() {
  initBookStorage();
  if (library) createBookListing();
  addBookButtonLIstener();
}

window.addEventListener('load', init);