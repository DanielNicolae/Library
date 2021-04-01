let myLibrary = [];

function Book() {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary.prototype = Object.create(Book.prototype);