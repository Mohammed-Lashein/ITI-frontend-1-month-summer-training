import { useState } from 'react'
import Book from './Book'

function Books() {
	const [books, setBooks] = useState(JSON.parse(sessionStorage.getItem('books')) || [])
	return <section class='books-container'>
    {books.map((book) => <Book book={book}/>)}
  </section>
}
export default Books