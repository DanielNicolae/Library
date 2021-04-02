let myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary() {
  let title = document.getElementById("titleInsert").innerText;
  let author = document.getElementById("authorInsert").innerText;
  let book = new Book(title, author);
  myLibrary.push(book);
}

function insertBook(title, author) {
  const table = document.getElementById("library");
  const line = document.createElement("tr");
  const titleCell = document.createElement("td");
  const authorCell = document.createElement("td");
  titleCell.innerText = title;
  authorCell.innerText = author;
  line.innerHTML += titleCell;
  line.innerHTML += authorCell;
}