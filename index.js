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

function refreshTime() {
  const timeDisplay = document.getElementById('date-time');
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateString = new Date().toLocaleString('en-us', dateOptions);
  timeDisplay.textContent = dateString;
}

function initTime() {
  refreshTime();
  setInterval(refreshTime, 1000);
}

const sectionList = document.getElementById('books');
const addBookSection = document.getElementById('add-book');
const contactSection = document.getElementById('contact-us');

const listMenu = document.getElementById('list-menu');
const addMenu = document.getElementById('add-menu');
const contactMenu = document.getElementById('contact-menu');

function removeActiveLink() {
  listMenu.classList.remove('active');
  addMenu.classList.remove('active');
  contactMenu.classList.remove('active');
}

function clickOnList(e) {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  sectionList.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
}

function clickOnAdd(e) {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  sectionList.style.display = 'none';
  addBookSection.style.display = 'block';
  contactSection.style.display = 'none';
}

function clickOnContact(e) {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  sectionList.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'block';
}

function addNavListeners() {
  listMenu.addEventListener('click', clickOnList);
  addMenu.addEventListener('click', clickOnAdd);
  contactMenu.addEventListener('click', clickOnContact);
}

// INITS

function init() {
  library.initBookStorage();
  createBookListing();
  addBookButtonLIstener();
  addNavListeners();
  initTime();
}

window.addEventListener('load', init);