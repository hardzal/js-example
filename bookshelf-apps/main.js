const books = [];
const RENDER_EVENT = 'render-books';
const SAVED_EVENT = 'saved-books';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function generatedId() {
    return +new Date(); // casting to number date
}


function generateBooksObject(id, title, author, year, isCompleted) {
    return {
        id, 
        title, 
        author,
        year, 
        isCompleted
    }
}


function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert(`Browser kamu tidak mendukung local storage`);
        return false;
    }

    return true;
}


function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY); // mengamnbil data storage
    let data = JSON.parse(serializedData); // mengubah json menjadi object
   
    if (data !== null) {
      for (const book of data) {
        books.push(book);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function saveData() {
    if(isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function findBook(bookId) {
    for (const bookItem of books) {
        if(bookItem.id === bookId) {
            return bookItem;
        }
    }

    return null;
}

function findBookIndex(bookId) {
    for(const index in books) {
        if(books[index].id === bookId) {
            return index;
        }
    }

    return -1;
}


function makeBook(bookObject) {
    const {id, title, author, year, isCompleted}= bookObject;

    const textTitle = document.createElement('h3');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = author;

    const textYear = document.createElement('p');
    textYear.innerText = year;

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(textTitle, textAuthor, textYear);

    const containerButton = document.createElement('div');
    containerButton.classList.add('action');
    containerButton.setAttribute('id', `book-${id}`);

    if(isCompleted) {
        const doneButton = document.createElement('button');
        doneButton.classList.add('blue');
        doneButton.innerHTML = "Baca kembali";
        doneButton.addEventListener('click', function() {
            undoBookFromCompleted(id);
        });
        containerButton.append(doneButton);
    } else {
        const undoneButton = document.createElement('button');
        undoneButton.classList.add('green');
        undoneButton.innerHTML = "Selesai Baca";
        undoneButton.addEventListener('click', function() {
            addBookToCompleted(id);
        });

        containerButton.append(undoneButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerHTML = "Hapus buku";
    deleteButton.addEventListener('click', function() {
        removeBookToCompleted(id);
    });

    containerButton.append(deleteButton);

    container.append(containerButton);
    return container;
}

function addBook() {
    const textTitle = document.getElementById('inputBookTitle').value;
    const textAuthor = document.getElementById('inputBookAuthor').value;
    const textYear = document.getElementById('inputBookYear').value;
    const valueCompleted = document.getElementById('inputBookIsComplete').checked;

    const generateId = generatedId();
    const bookObject = generateBooksObject(generateId, textTitle, textAuthor, textYear, valueCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToCompleted(bookId) {
    const bookObject = findBook(bookId);
    if(bookObject === null) return;
    console.log( bookObject.isCompleted);
    bookObject.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeBookToCompleted(bookId) {
    const bookObject = findBookIndex(bookId);
    if(bookObject == -1) return;

    books.splice(bookObject, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoBookFromCompleted(bookId) {
    const bookObject = findBook(bookId);
    if(bookObject === null) return;
    bookObject.isCompleted = false;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function searchBook(keyword) {
    const findTitle = keyword;
    const bookObject = books.filter((item) => item.title.toLowerCase() == findTitle);

    if(bookObject === null) return;

    document.dispatchEvent(new Event(RENDER_EVENT));

    return bookObject;
}   

document.addEventListener(SAVED_EVENT, function() {
    console.log("Berhasil menambahkan data!");
});

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
        alert("Berhasil menambahkan buku!");
        document.getElementById("inputBook").reset();
    }); 

    if(isStorageExist()) {
        loadDataFromStorage();
    }
});


document.addEventListener(RENDER_EVENT, function() {
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    const completedBookList = document.getElementById('completeBookshelfList');

    uncompletedBookList.innerHTML = '';
    completedBookList.innerHTML = '';

    for(const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if(bookItem.isCompleted) {
            completedBookList.append(bookElement);
        } else {
            uncompletedBookList.append(bookElement);
        }
    }
    
    const searchContainer = document.getElementById('searchedBook');
    const searchForm = document.getElementById('searchBook');
    searchContainer.innerHTML = '';
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('searchBookTitle').value;
        const bookList = searchBook(title);
        if(bookList.length === 0) {
            alert("Buku tidak ditemukan!");
        }
        for(const item of bookList) {
            const bookFound = makeBook(item);
            searchContainer.append(bookFound);
        }
    });

});


