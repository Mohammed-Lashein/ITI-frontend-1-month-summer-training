import { BookMapper } from '../utils/BookMapper';
function Book({book: {id, title, author, pagesNumber, isRead}}) {
	function removeBook(id) {
		const books = BookMapper.getBooks()
		const updatedBooks = books.filter((book) => book.id !== id)
		BookMapper.updateBooks(updatedBooks)
	}
	return (
		<article className='book'>
			<p className='book__title'>{title}</p>
			<p className='book__author'>{author}</p>
			<p className='book__pages-number'>{pagesNumber}</p>
			<button className={`btn ${isRead ? 'btn-light-green' : 'btn-light-red'}`}>{isRead ? 'Read' : 'Not Read'}</button>
			<button className='btn' onClick={() => removeBook(id)}>Remove</button>
		</article>
	)
}
export default Book