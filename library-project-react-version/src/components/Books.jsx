import Book from './Book'

function Books({books, setBooks}) {
	return <section className='books-container'>
    {books.map((book) => <Book book={book} key={book.id} setBooks={setBooks}/>)}
  </section>
}
export default Books