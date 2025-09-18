function generateBookId() {
  let count = 0;
  return function() {
    return count++;
  } 
}
const bookIdGenerator = generateBookId()
export class Book {
  #id;
  constructor(id, title, author, pagesNumber, isRead) {
    this.#id = id ?? bookIdGenerator()
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isRead = isRead
  }
  get id() {
    return this.#id;
  }
  render() {
    const bookContainer = document.createElement('article')
    bookContainer.className = 'book'

    const bookTitle = document.createElement('p')
    bookTitle.className = 'book__title'
    bookTitle.textContent = this.title

    const bookDescription = document.createElement('p')
    // You need to change the book description to book author here and in the css file
    bookDescription.className = 'book__description'
    bookDescription.textContent = this.author

    const bookPagesCount = document.createElement('p')
    bookPagesCount.className = 'book__pages-count'
    // maybe rename the class book__pages-count to book__pages-number
    bookPagesCount.textContent = this.pagesNumber

    const readStatusBtn = document.createElement('button')
    readStatusBtn.className = 'btn'
    // add the specific styles according to conditions later
    readStatusBtn.classList.add(`${this.isRead ? 'btn-light-green' : 'btn-light-red'}`)
    readStatusBtn.textContent = this.isRead ? 'Read' : 'Not read'

    const removeBookButton = document.createElement('button')
    removeBookButton.className = 'btn'
    removeBookButton.textContent = 'Remove'

    bookContainer.append(bookTitle, bookDescription, bookPagesCount, readStatusBtn, removeBookButton)
    return bookContainer
  }
}
