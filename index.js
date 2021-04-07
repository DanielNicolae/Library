let myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary() {
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
  let book = new Book(title, author, read);
  myLibrary.push(book);
  // local storage
  window.localStorage.setItem("library", JSON.stringify(myLibrary));

  insertBook(title, author);
  document.getElementById("titleInsert").value = "";
  document.getElementById("authorInsert").value = "";
}

// Variable for the id of the delete button
let i = 0;

const tableBody = document.querySelector("#tbody");
tableBody.addEventListener("click", pressDelete);

function insertBook(title = "-", author = "-") {
  let table = document.getElementById("tbody");
  let line = document.createElement("tr");
  let titleCell = document.createElement("td");
  let authorCell = document.createElement("td");
  titleCell.innerText = title;
  authorCell.innerText = author;
  line.appendChild(titleCell);

  const readButton = document.createElement("button");
  readButton.innerText = "Read";
  readButton.classList.add("notRead");
  readButton.addEventListener("click", readBook);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.id = `${i++}`;
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", removeBook);

  line.appendChild(deleteButton);
  table.appendChild(line);
}

function readBook(e) {
  const book = e.target.parentElement;
  book.classList.add("read");
  return e.target.id;
}

function pressDelete(e) {
  const book = e.target.parentElement;
  book.classList.add("fall");
  book.addEventListener("animationend", function () {
    book.remove();
  });
  return e.target.id;
}

function removeBook(e) {
  const i = pressDelete(e);
  myLibrary.splice(i, 1);
  // reset local storage
  window.localStorage.setItem("library", JSON.stringify(myLibrary));
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