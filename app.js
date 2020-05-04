class Book{
	constructor(title,author,isbn){
		this.title = title;
		this.author = author;
		this.isbn  = isbn;
	}
}

class UI{
	
	static displayBooks (){
		const storedBooks = [
			{
				'title':'The power of now',
				'author':'Ekart',
				'isbn':483973895
			},
			{
				'title':'The monk who sold his ferrari',
				'author':'Robin Sharma',
				'isbn':583958574
			}
		];
		
		storedBooks.forEach((book) => UI.addBookToList(book));
	}


	static addBookToList(book){
		const list = document.querySelector('#book-list');
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href = "#" class = "btn btn-danger delete">Delete</a></td>
		`;
		list.appendChild(row);
	}

	static clearFields(){
		 document.getElementById('author').value = '';
		 document.getElementById('title').value = '';
		 document.getElementById('isbn').value = '';
		
	}

	static deleteBook(element){
		if(element.classList.contains('delete')){
			element.parentElement.parentElement.remove();
		};
	}

	static showAlert(message,alert){
		const div = document.createElement('div');
		div.className = `alert alert-${alert}`;
		div.appendChild(document.createTextNode(message));
		const container = document.getElementsByClassName('container')[0];
		const form = document.getElementById('book-form');
		container.insertBefore(div,form);
		setTimeout(()=>document.getElementsByClassName('alert')[0].remove(),3000);
	}
}

document.addEventListener("DOMContetntLoaded",UI.displayBooks());

document.getElementById('book-form').addEventListener('submit',(e)=>{
	
	e.preventDefault();
	console.log('here');
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;
	if(title === '' || author === '' || isbn === '') UI.showAlert('Please fill in all the fields','danger');
	else{
	const book = new Book(title,author,isbn);
	UI.addBookToList(book);
	UI.showAlert('Book added successfully','success');
	UI.clearFields();
	}
	
});

document.getElementById('book-list').addEventListener('click',(e) => {
	console.log(e.target);
	UI.deleteBook(e.target);
})