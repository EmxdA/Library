const container = document.querySelector("#container");
const addBookBtn = document.querySelector("#add-book");
const formContainer = document.querySelector("#add-book-form-container");
const submitBook = document.querySelector("#submit");
const titleForm = document.querySelector("#title-form");
const authorForm = document.querySelector("#author-form");
const pagesForm = document.querySelector("#pages-form");
const statusForm = document.querySelector("#status-form");

let library = [];
let objects = [];

function Book(title, author, pages, stat) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.stat = stat;
}

let addBookToLibrary = () => {
  let title = titleForm.value;
  let author = authorForm.value;
  let pages = pagesForm.value;
  let status = statusForm.checked;

  objects.push(title);

  objects[objects.length - 1] = new Book(title, author, pages, status);

  library.push(objects[objects.length - 1]);

  formContainer.setAttribute("style", "visibility: hidden;");
  displayBooks();
};

let deleteBooks = (index) => {
  library.splice(index, 1);
  console.log(index);
  displayBooks();
};

let displayBooks = () => {
  container.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    let bookName = document.createElement("h2");
    let bookAuthor = document.createElement("h3");
    let bookPages = document.createElement("p");
    let button = document.createElement("button");
    let statusButton = document.createElement("button");

    bookName.textContent = library.slice(i,i+1).map((ele) => ele.title);
    bookAuthor.textContent = library.slice(i, i+1).map((ele) => ele.author);
    bookPages.textContent = library.slice(i, i+1).map((ele) => ele.pages);
    button.textContent = "Delete";

    let statusOfBook = library.map((ele) => ele.stat);
    if (statusOfBook[i]) {
      statusButton.textContent = "Completed";
    } else {
      statusButton.textContent = "Not Completed";
    }
    button.setAttribute("id", i + 1);
    container.append(
      bookName,
      bookAuthor,
      bookPages,
      button,
      statusButton
    );

    button.addEventListener("click", () => {
      deleteBooks(i);
    });
  }
};

addBookBtn.addEventListener("click", () => {
  formContainer.setAttribute("style", "visibility: unset;");
});

submitBook.addEventListener("click", addBookToLibrary);

displayBooks();
