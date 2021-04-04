let myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
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
  let book = new Book(title, author);
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
  line.appendChild(authorCell);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.id = `${i++}`;
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", removeBook);
  line.appendChild(deleteButton);
  table.appendChild(line);
}

function pressDelete(e) {
  const book = e.target.parentElement;
  book.remove();
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