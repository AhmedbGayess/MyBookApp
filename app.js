var addBtn = document.querySelector("#add");
var bookTitle = document.getElementById("book-title");
var bookCover = document.getElementById("book-cover");
var bookList = document.getElementById("book-list");
var emptyList = document.querySelector("#empty-list");
var myBooks = [];

addBtn.addEventListener("click", function(event){
    event.preventDefault();
    myBooks.push( {title: bookTitle.value, cover: bookCover.value});
    clearBooks();
    addBooks();
    bookTitle.value = "";
    bookCover.value = "";
    console.log(myBooks);
})

document.querySelector("body").addEventListener("click", function(e) {
    if(e.target.classList.contains("delete-btn")){
        for (var i =0; i < myBooks.length; i++)
         myBooks.splice(i,1);
   }
   clearBooks()
   addBooks()
   console.log(myBooks);   
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

function addBooks() {
    for(i = 0; i < myBooks.length; i++){
        var newBook = bookList.appendChild(document.createElement("li"));
        newBook.classList.add("list-group-item")
        var newBookTitle = document.createElement("p");
        newBookTitle.innerHTML = myBooks[i].title;
        newBookTitle.classList.add("li-content")
        var newBookCover = document.createElement("img");
        newBookCover.src = myBooks[i].cover;
        newBookCover.classList.add("cover")
        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "delete-btn", "li-content")
        var deleteBtnName = document.createTextNode("Delete Book");
        deleteBtn.appendChild(deleteBtnName);
        newBook.appendChild(newBookTitle);
        newBook.appendChild(newBookCover);
        newBook.appendChild(deleteBtn); 
    };
};