import { BookFactory } from './BookFactory.js';
import { BookMapper } from './BookMapper.js';

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
    bookDescription.className = 'book__author' // this is just a class with no corresponding css styles.
    // I am just adding that class to have declarative markup only
    bookDescription.textContent = this.author

    const bookPagesCount = document.createElement('p')
    bookPagesCount.className = 'book__pages-number' // same here
    bookPagesCount.textContent = this.pagesNumber

    const readStatusBtn = document.createElement('button')
    readStatusBtn.className = 'btn'
    readStatusBtn.classList.add(`${this.isRead ? 'btn-light-green' : 'btn-light-red'}`)
    readStatusBtn.textContent = this.isRead ? 'Read' : 'Not read'

    const removeBookButton = document.createElement('button')
    removeBookButton.className = 'btn'
    removeBookButton.textContent = 'Remove'
    removeBookButton.onclick = this.remove.bind(this)

    bookContainer.append(bookTitle, bookDescription, bookPagesCount, readStatusBtn, removeBookButton)
    return bookContainer
  }
  remove() {
    // get the books from data source
    const books = BookMapper.getBooks()
    // filter the books from the one with the required id
    const filteredBooks = books.filter((book) => book.id !== this.id)
    // console.log(filteredBooks)
    // update data source with new books value
    BookMapper.updateBooks(filteredBooks)
    // re-render the books
    BookFactory.renderBooks()
  }
}
