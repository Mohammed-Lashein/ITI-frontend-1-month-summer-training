import { Book } from './Book.js'
import { BookMapper } from './BookMapper.js'

export class BookFactory {
  static create(id, title, author, pagesNumber, isRead) {
    const book = new Book(id, title, author, pagesNumber, isRead)
    return book
  }
  static createFromFormData(data) {
    return new Book(null, data.title, data.author, data.pagesNumber, data.isRead)
  }
  static renderBooks() {
    const books = BookMapper.getBooks()
    const booksContainer = document.querySelector('.books-container')
    const booksElements = books.map((book) => book.render())
    
    booksContainer.append(...booksElements)
  }
}
