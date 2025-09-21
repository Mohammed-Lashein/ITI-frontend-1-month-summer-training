import { BookMapper } from '../utils/BookMapper'
import Book from './Book'

function Books({books, setBooks}) {
  function toggleReadStatus(bookId) {
    console.log('this is bookId', bookId)
    const updatedBooks = books.map((book) => {
      if(book.id === bookId) {
        return {
          ...BookMapper.toStorage(book),
          isRead: !book.isRead
        }
      }
      return BookMapper.toStorage(book)
    })
    setBooks(updatedBooks)
    BookMapper.updateBooks(updatedBooks)
  }
  function removeBook(id) {
    const updatedBooks = books.filter((book) => book.id !== id)
    setBooks(updatedBooks)
    BookMapper.updateBooks(updatedBooks)
  }
  return <section className='books-container'>
    {books.map((book) => <Book book={book} key={book.id} setBooks={setBooks} toggleReadStatus={toggleReadStatus} removeBook={removeBook}/>)}
  </section>
}
export default Books