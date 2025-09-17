import { Book } from './Book.js'

export class BookMapper {
  /* 
    What are the BookMapper responsibilites?
    => 
    [1] get the data from a Book object and store it in the db
    [2] get the data from the db and return to us a Book instance
  */

    static toStorage(book) {
      const bookData = {
        id: book.id,
        title: book.title,
        author: book.author,
        pagesNumber: book.pagesNumber,
        isRead: book.isRead
      }
      return bookData
    }

    static fromStorage({id, title, author, pagesNumber, isRead}) {
      return new Book(id, title, author, pagesNumber, isRead)
    }

    static addBook(book) {
      const bookData = BookMapper.toStorage(book);
    const books = JSON.parse(sessionStorage.getItem('books')) || []
    const updatedBooks = books.concat(bookData)
    sessionStorage.setItem('books', JSON.stringify(updatedBooks))
    }
    static getBooks() {
    const books = JSON.parse(sessionStorage.getItem('books')) || []
    const booksInstances = books.map((book) => BookMapper.fromStorage(book))
    return booksInstances
  }

}