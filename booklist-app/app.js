class Book {
    constructor(title, author, note) {
        this.title = title;
        this.author = author;
        this.note = note;
    }
}

// Working with Local Storage

class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(note) {
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if (book.note === note) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

class UI {
    static displayBooks() {
        const books = Storage.getBooks(); // this is where we would get the books from the database

        books.forEach((book) => UI.addBookToList(book)); // add each book to the list
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.note}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#note").value = "";
    }

    static showAlert(message, className) {
        const divAlert = document.createElement("div");
        divAlert.className = `alert alert-${className}`;
        divAlert.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(divAlert, form);

        // vashish the alert message

        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }

    static deleteBook(element) {
        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
        }
    }
}

// display books when the page loads
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event to add a book to the book list
document.querySelector("#book-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const note = document.querySelector("#note").value;

    // Simple validation

    if (title === "" || author === "" || note === "") {
        UI.showAlert("Please fill in all fields!", "danger");
    } else {
        // Linking to the class book
        const book = new Book(title, author, note);

        // Add book to UI
        UI.addBookToList(book);

        // Linking to localStorage
        Storage.addBook(book);

        // Show success message
        UI.showAlert("Book added!", "success");

        // Clear fields
        UI.clearFields();
    }
});

// Event to delete a book
document.querySelector("#book-list").addEventListener("click", (event) => {
    UI.deleteBook(event.target);
    UI.showAlert("Book removed!", "success");

    Storage.removeBook(event.target.parentElement.previousElementSibling.textContent);
});
