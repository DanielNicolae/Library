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
  deleteButton.className = "delete";
  deleteButton.innerText = "X";
  line.appendChild(deleteButton);
  table.appendChild(line);
}

function removeBook(book) {
  const i = myLibrary.indexOf(book);
  myLibrary.splice(i, 1);
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