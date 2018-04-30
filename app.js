var addBtn = document.querySelector("#add");
var bookTitle = document.getElementById("book-title");
var bookCover = document.getElementById("book-cover");
var bookList = document.getElementById("book-list");
var emptyList = document.querySelector("#empty-list");
var deleteBtn = document.querySelector(".delete-btn");
var myBooks = [];



addBtn.addEventListener("click", function(event){
    event.preventDefault();
    myBooks.push( {title: bookTitle.value, cover: bookCover.value});
    createBook(bookTitle.value, bookCover.value);
    bookTitle.value = "";
    bookCover.value = "";
    // console.log(myBooks);
})

document.querySelector("body").addEventListener("click", function(e) {
    if(e.target.classList.contains("delete-btn")){
        for (var i =0; i < myBooks.length; i++) {
            if (myBooks[i].title === e.target.dataset.book) {
                myBooks.splice(i, 1);
                clearBooks();
                renderBook();
             }
        }
   }  
})

emptyList.addEventListener("click", function(){
    if (confirm('Are you sure you want to delete all your books from the list?')) {
        clearBooks();
    } 
})

function clearBooks() {
    while(bookList.firstChild){
      bookList.removeChild(bookList.firstChild);
    }
};

function renderBook() {
    for(i = 0; i < myBooks.length; i++){
        createBook(myBooks[i].title, myBooks[i].cover);        
    };
}

function createBook(title, cover) {
    var newBook = document.createElement("li");
    newBook.classList.add("list-group-item");
    var newBookTitle = document.createElement("p");
    newBookTitle.innerHTML = title;
    newBookTitle.classList.add("li-content")
    var newBookCover = document.createElement("img");
    newBookCover.src = cover;
    newBookCover.classList.add("cover")
    var deleteBtn = document.createElement("button");
    deleteBtn.dataset.book = title;
    deleteBtn.classList.add("btn", "btn-danger", "delete-btn", "li-content");
    var deleteBtnName = document.createTextNode("Delete Book");
    deleteBtn.appendChild(deleteBtnName);
    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookCover);
    newBook.appendChild(deleteBtn);
    addBooks(newBook);
}

function addBooks(newBook) {
    bookList.appendChild(newBook);
};

renderBook();