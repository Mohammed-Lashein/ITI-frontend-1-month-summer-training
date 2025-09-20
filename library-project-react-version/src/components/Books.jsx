import Book from './Book'


function Books({books}) {
	return <section className='books-container'>
    {books.map((book) => <Book book={book} key={book.id}/>)}
  </section>
}
export default Books