let myLibrary = [];

function Book(id, title, author, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.read = read;
}

let bookId = 0;

function addBookToLibrary() {
  id = bookId++;
  let title = "";
  if (document.getElementById("titleInsert").value) {
    title = document.getElementById("titleInsert").value;
  } else {
    title = "-";
  }
  let author = "";
  if (document.getElementById("authorInsert").value) {
    author = document.getElementById("authorInsert").value;
  } else {
    author = "-";
  }
  let read = false;
  let book = new Book(id, title, author, read);
  myLibrary.push(book);
  resetLocalStorage();

  insertBook(title, author);
  document.getElementById("titleInsert").value = "";
  document.getElementById("authorInsert").value = "";
}


function insertBook(title = "-", author = "-") {
  let table = document.getElementById("tbody");
  let line = document.createElement("tr");
  let titleCell = document.createElement("td");
  let authorCell = document.createElement("td");
  line.id = `${bookId}`;
  titleCell.innerText = title;
  authorCell.innerText = author;

  const readButton = document.createElement("button");
  readButton.innerText = "Read";
  readButton.classList.add("readButton");
  readButton.classList.add("notPressedReadButton");
  readButton.addEventListener("click", setReadBook);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", removeBook);

  line.appendChild(readButton);
  line.appendChild(titleCell);
  line.appendChild(authorCell);
  line.appendChild(deleteButton);
  table.appendChild(line);
}

function resetLocalStorage() {
  window.localStorage.setItem("library", JSON.stringify(myLibrary));
}

function readBook(e) {
  const book = e.target.parentElement;
  if (!book.read) {
    book.read = true;
    resetLocalStorage();
    book.classList.add("read");
    e.target.classList.add("pressedReadButton");
    e.target.classList.remove("notPressedReadButton");
  } else {
    book.read = false;
    resetLocalStorage();
    book.classList.remove("read");
    e.target.classList.remove("pressedReadButton");
    e.target.classList.add("notPressedReadButton");
  }
  return book.id;
}

function setReadBook(e) {
  const id = readBook(e);
  myLibrary[id].read = !myLibrary[id].read;
  resetLocalStorage();
}

function pressDelete(e) {
  const book = e.target.parentElement;
  book.classList.add("fall");
  book.addEventListener("animationend", function () {
    book.remove();
  });
  console.log(book.id);
  return book.id;
}

function removeBook(e) {
  const i = pressDelete(e);
  myLibrary.splice(i, 1);
  resetLocalStorage();
}

function init() {
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    addBookToLibrary();
  });
  const localStorage = window.localStorage.getItem("library");
  const parseLocalStorage = JSON.parse(localStorage);
  if (localStorage) {
    parseLocalStorage.forEach(book => {
      myLibrary.push(book);
      insertBook(book.title, book.author);
    });
  }
}

init();