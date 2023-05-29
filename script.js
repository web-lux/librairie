const modal = document.getElementById("modal");
const form = document.getElementById("form");
const bookDisplay = document.getElementById("book-container")

class Book {
    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function renderModal() {
    modal.classList.toggle("visible")
};    

form.addEventListener("submit", addBookFromInput);

let myLibrary = [new Book("Le château de Hurle", "Diana Wynne Jones", 432, true), new Book("Intelligence Artificielles", "Fibretigre, Arnold Zephir, Héloïse Chochois", 192, false)];
renderBooks()

function addBookFromInput(event) {
    event.preventDefault();
    addBookToLibrary(new Book(...getBookByForm()));
    renderBooks()
};

function getBookByForm() {
    const formInputValue = [];
    const formInput = [...document.getElementsByClassName("form__input")];
    formInput.forEach(input => {
        if (input.value === "true") {
            formInputValue.push(true)
        } else if (input.value === "false") {
            formInputValue.push(false)
        } else {
        formInputValue.push(input.value)
        }
    });
    console.log(formInputValue)
    return formInputValue
}

function addBookToLibrary(book) {
    myLibrary.push(book)
};

function renderBooks() {
    let bookDisplayHtml = ``;
    myLibrary.forEach((book) => {
        bookDisplayHtml += `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <button type="button" class="${book.isRead ? "--read" : "--to-read"}" onclick="changeButtonState(this)" data-index="${myLibrary.indexOf(book)}">${book.isRead ? "Déjà lu" : "À lire"}</button>
                <div onclick="deleteBook(${myLibrary.indexOf(book)})" class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
            </td>
        </tr>
        `
    });
    bookDisplay.innerHTML = bookDisplayHtml;
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderBooks()
}

function changeButtonState(element) {
        myLibrary[element.dataset.index].isRead = !myLibrary[element.dataset.index].isRead;
        element.classList = myLibrary[element.dataset.index].isRead ? "--read" : "--to-read";
        element.textContent = myLibrary[element.dataset.index].isRead ? "Déjà lu" : "À lire";
}

function toggleTheme() {
    const root = document.documentElement;
    if (root.classList == "light") {
        root.classList = "dark"
    } else {
        root.classList = "light"
    }
}