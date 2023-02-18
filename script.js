const container = document.querySelector("#container");
const addBookBtn = document.querySelector("#add-book");
const formContainer = document.querySelector("#add-book-form-container");
const submitBook = document.querySelector("#submit");
const titleForm = document.querySelector("#title-form");
const authorForm = document.querySelector("#author-form");
const pagesForm = document.querySelector("#pages-form");
const statusForm = document.querySelector("#status-form");
const form = document.querySelector("form");
const background = document.querySelector("#background-container");

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
    let newContainer = document.createElement("div");
    let bookName = document.createElement("h2");
    let bookAuthor = document.createElement("h3");
    let bookPages = document.createElement("p");
    let button = document.createElement("button");
    let statusButton = document.createElement("button");

    bookName.setAttribute("id", "book-name");
    bookAuthor.setAttribute("id", "book-author");
    bookPages.setAttribute("id", "book-pahes");
    button.setAttribute("id", "delete-btn");
    statusButton.setAttribute("id", "status-btn");

    bookName.textContent = library[i].title;
    bookAuthor.textContent = "Author: " + library[i].author;
    bookPages.textContent = "Pages: " + library[i].pages;
    button.textContent = "Delete";

    let statusOfBook = library.map((ele) => ele.stat);

    newContainer.setAttribute(
      "style",
      "width: 340px; height: 250px; margin: 10px 20px; box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; text-align: center; border-radius: 20px;"
    );

    button.setAttribute("style", "display: inline-block; margin: 20px 10px;");
    statusButton.setAttribute("style", "display: inline-block;");

    newContainer.append(bookName, bookAuthor, bookPages, button, statusButton);


    if (statusOfBook[i]) {
      statusButton.textContent = "Read";
      statusButton.setAttribute("style", "background-color: green;");
    } else {
      statusButton.textContent = "Not Read";
      statusButton.setAttribute("style", "background-color: #ef233c;");
    }

    container.appendChild(newContainer);

    button.addEventListener("click", () => {
      deleteBooks(i);
    });

    statusButton.addEventListener("click", () => {
      if (statusButton.textContent === "Read") {
        library[i].stat = false;
        statusButton.textContent = "Not Read";
        statusButton.setAttribute("style", "background-color: #ef233c;");
      } else {
        library[i].stat = true;
        statusButton.textContent = "Read";
        statusButton.setAttribute("style", "background-color: green;");
      }
    });
  }
};

addBookBtn.addEventListener("click", () => {
  background.setAttribute("style", "filter: blur(5px) brightness(0.9); pointer-events: none;")
  formContainer.setAttribute("style", "visibility: unset; ");
});


submitBook.addEventListener("click", (e) => {
  if (
    titleForm.checkValidity() &
    authorForm.checkValidity() &
    pagesForm.checkValidity()
  ) {
    e.preventDefault();
    addBookToLibrary();
    form.reset();
    background.setAttribute("style", "filter: none")
  }
});


displayBooks();
