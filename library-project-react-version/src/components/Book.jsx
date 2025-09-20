import { BookMapper } from '../utils/BookMapper';
function Book({setBooks, book: {id, title, author, pagesNumber, isRead}}) {
	function removeBook(id) {
		const books = BookMapper.getBooks()
		const updatedBooks = books.filter((book) => book.id !== id)
		setBooks(updatedBooks)
		BookMapper.updateBooks(updatedBooks)
	}
	function toggleReadStatus(bookId) {
		console.log('this is bookId', bookId)
		const books = BookMapper.getBooks() // You are creating new books! This is wrong in React. Stick to the state
		const updatedBooks = books.map((book) => {
			if(book.id === bookId) {
				return {
					...book,
					isRead: !book.isRead
				}
			}
			return book
		})
		setBooks(updatedBooks)
		BookMapper.updateBooks(updatedBooks)
	}
	return (
		<article className='book'>
			<p className='book__title'>{title}</p>
			<p className='book__author'>{author}</p>
			<p className='book__pages-number'>{pagesNumber}</p>
			<button className={`btn ${isRead ? 'btn-light-green' : 'btn-light-red'}`} onClick={() => toggleReadStatus(id)}>{isRead ? 'Read' : 'Not Read'}</button>
			<button className='btn' onClick={() => removeBook(id)}>Remove</button>
		</article>
	)
}
export default Book