const forms = document.forms;
const list = document.querySelector("#book-list ul");
const searchBar = forms["search-books"].querySelector("input");
const hideBox = document.querySelector("#hide");
const addForm = forms["add-book"];

// info message
function infoMessage(msg) {
  const info = document.querySelector(".info");
  info.style.display = "block";
  info.innerText = msg;
  setTimeout(() => {
    info.innerText = "";
    info.style.display = "none";
  }, 1500);
}

// filterbook
function filterBook(e) {
  const books = [].slice.call(list.querySelectorAll("li"));
  books.forEach(book => {
    const title = book.firstElementChild.textContent;
    if (title.toLowerCase().indexOf(e.target.value) != -1) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}

// deletebook
function deleteBook(e) {
  if (e.target.className == "delete") {
    const li = e.target.parentElement;
    li.parentElement.removeChild(li);
  }
  infoMessage("Deleted one book");
}

// hidebook
function hideBook() {
  hideBox.checked
    ? (list.style.display = "none")
    : (list.style.display = "initial");
}

// add book
addForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // create elements
  const value = addForm.querySelector('input[type="text"]').value;
  const li = document.createElement("li");
  const bookName = document.createElement("span");
  const deleteBtn = document.createElement("span");

  // add text content
  bookName.textContent = value;
  deleteBtn.textContent = "delete";

  // add classes
  bookName.classList.add("name");
  deleteBtn.classList.add("delete");

  // append to DOM
  li.appendChild(bookName);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  addForm.querySelector('input[type="text"]').value = "";
  infoMessage("One book added");
});

// event listeners
searchBar.addEventListener("keyup", e => filterBook(e));
list.addEventListener("click", e => deleteBook(e));
hideBox.addEventListener("change", () => hideBook());
