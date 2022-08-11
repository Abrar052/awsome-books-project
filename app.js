// Select Elements
const library = document.querySelector('.library');
const bookName = document.querySelector('.name');
const bookAuthor = document.querySelector('.author');

// Create Empty Array
const books= [];

class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
  
  // Method to load added Books
  static loadBooks(i) {
    library.innerHTML += `<div class="each-book">
    <div class="book-name">${books[i].name}</div>
    <div class="book-author">${books[i].author}<strong>&nbsp;by&nbsp;</strong></div>
    <button class="button" onclick="Book.removeBook(${i})">Remove</button>
    </div>`;
  }
  
    // Method to Remove Books
    static removeBook(i) {
      books.splice(i, 1);
      localStorage.setItem('books', JSON.stringify(books));
      Book.refreshBook();
    }
  
  static refreshBook() {
    library.innerHTML = '';
    for (let i = 0;i < books.length;i++) {
      library.innerHTML += `<div class="each-book">
    <div class="book-name">${books[i].name}<strong>&nbsp;by&nbsp;</strong></div>
    <div class="book-author">${books[i].author}</div>
    <button class="button" onclick="Book.removeBook(${i})">Remove</button>
    </div>`;
    }
  }
}

// Create Necessary Functions

const storedBooks = JSON.parse(localStorage.getItem('books'));

if(storedBooks) {
  books.push(...storedBooks);
  Book.refreshBook();
}

// Create Event Lisener
const addBook = document.querySelector('.submit');
addBook.addEventListener('click', () => {
  const libro = new Book(bookName.value, bookAuthor.value);
  books.push(libro);
  Book.loadBooks(books.length - 1);
  localStorage.setItem('books', JSON.stringify(books));
});

