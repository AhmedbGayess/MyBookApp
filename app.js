const addBtn = document.querySelector("#add");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author")
const bookCover = document.getElementById("book-cover");
const bookList = document.getElementById("book-list");
const emptyList = document.querySelector("#empty-list");

// Get books from localStorage
const getStoredBooks = function () {
    const storedBooks = localStorage.getItem("Books")

    if (storedBooks !== null) {
        return JSON.parse(storedBooks)
    } else {
        return []
    }
}

let myBooks = getStoredBooks()


const renderBooks = function (myBooks) {
    bookList.innerHTML = ""
    myBooks.forEach(function (book) {
        // Book Row
        const newBookRow = document.createElement("div")
        newBookRow.classList = "row"

        // Book title
        const newBookTitle = document.createElement("div")
        newBookTitle.textContent = book.title
        newBookTitle.classList = "col list"
        newBookRow.appendChild(newBookTitle)

        // Book Author
        const newBookAuthor = document.createElement("div")
        newBookAuthor.textContent = book.author
        newBookAuthor.classList = "col list"        
        newBookRow.appendChild(newBookAuthor)

        // Book Cover
        const imageCol = document.createElement("div")
        imageCol.classList = "col"        
        const newBookCover = document.createElement("img")
        newBookCover.setAttribute("src", book.cover)
        newBookCover.classList = "cover"
        imageCol.appendChild(newBookCover)
        newBookRow.appendChild(imageCol)

        // Delete button
        const deleteCol = document.createElement("div")
        deleteCol.classList = "col list"
        const deleteBtn = document.createElement("button")
        deleteBtn.classList = "btn delete"
        deleteBtn.innerHTML = 'Delete <i class="far fa-trash-alt"></i>'
        deleteCol.appendChild(deleteBtn)
        newBookRow.appendChild(deleteCol)

        deleteBtn.addEventListener("click", function () {
            deleteBook(book.id)
            saveBooks(myBooks)
            renderBooks(myBooks)   
        })


        bookList.appendChild(newBookRow)    
        
    })
}

renderBooks(myBooks)

// Delete single book
const deleteBook = function (id) {
    const index = myBooks.findIndex(function (book) {
        return book.id === id
        })
        
        if (index > -1) {
            myBooks.splice(index, 1)
    }
}

// Store the apdated array in localStorage
const saveBooks = function (myBooks) {
    localStorage.setItem("Books", JSON.stringify(myBooks))
}

addBtn.addEventListener("click", function (e) {
    e.preventDefault()
    // Create book object and push it into the array
    myBooks.push({
        id: uuidv4(),
        title: bookTitle.value,
        author: bookAuthor.value,
        cover: bookCover.value
    })

    saveBooks(myBooks)

    
    renderBooks(myBooks)
    bookTitle.value = ""
    bookAuthor.value = ""
    bookCover.value = ""

})

emptyList.addEventListener("click", function () {
    localStorage.clear()
    myBooks = []
    renderBooks(myBooks)
})