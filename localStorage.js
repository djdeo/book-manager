class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null ){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(el){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book === el) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

class UI {
    static listAll() {
        const books = Store.getBooks();
        books.forEach(book =>
          UI.addBookToList(book)
        );
    }
    static addBookToList(book){
        const ul = document.querySelector('ul');
        const li = document.createElement('li');

        li.innerHTML = `
            <span class="name">${book}</span><span class="delete">delete</span>
        `;
        ul.appendChild(li);
    }
    static deleteBook(el){
        if (el.classList.contains('delete')) {
            el.parentElement.remove()
        }
    }
    static showAlert(msg, className) {
        const p = document.querySelector('p.info');

        p.classList.add(`info-${className}`);
        p.innerText = msg;
        setTimeout(() => {
            p.innerHTML = '';
            p.classList.remove(`info-${className}`);
        }, 1500);
    }
    static clearField(){
        document.querySelector('#title').value = '';
    }
}


document.addEventListener('DOMContentLoaded', UI.listAll());
// document.addEventListener('DOMContentLoaded', () => console.log(Store.getBooks()));
document.querySelector('#add-book').addEventListener('submit', (e)=>{
    e.preventDefault();
    const book = document.querySelector('#title').value;
    if(book === '') {
        UI.showAlert('Please add a book to start', 'danger')
    } else {
        UI.addBookToList(book);
        UI.clearField();
        UI.showAlert('New book added', 'success');
        Store.addBook(book);
    }
})

document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
    UI.showAlert('The book is deleted', 'danger');
    Store.removeBook(e.target.previousElementSibling.textContent);
})

document.querySelector('#search-books').addEventListener('keyup', (e) => {
    const list = document.querySelector("#book-list ul");
    const books = list.querySelectorAll("li");
    books.forEach(book=>{
        const title = book.firstElementChild.textContent;
        if (title.toLowerCase().indexOf(e.target.value) != -1) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    })
})

