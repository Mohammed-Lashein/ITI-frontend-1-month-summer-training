import { useRef, useState } from 'react'
import { bookIdGenerator } from '../utils'

function AddBookForm() {
	const [bookTitle, setBookTitle] = useState('')
	const [bookAuthor, setBookAuthor] = useState('')
	const [bookPagesNumber, setBookPagesNumber] = useState(0)
	const [isRead, setIsRead] = useState(false)

	const bookTitleRef = useRef(null)
	const bookAuthorRef = useRef(null)
	const bookPagesNumberRef = useRef(null)
	const isBookReadRef = useRef(null)
	function handleSubmission(e) {
		e.preventDefault()

		setBookTitle(bookTitleRef.current.value)
		setBookAuthor(bookAuthorRef.current.value)
		setBookPagesNumber(bookPagesNumberRef.current.value)
		setIsRead(isBookReadRef.current.checked)

		const aFieldIsEmpty = bookTitle === '' || bookAuthor === '' || bookPagesNumber === 0
		if (aFieldIsEmpty) {
			console.log('All fields are required') // the bookPagesNumber should be greater than zero, but let's
			// keep that for a later better validation approach
			return
		}

		console.log('end of fn reached!')

		// update data source with data
		const book = {
			id: bookIdGenerator(),
			title: bookTitle,
			author: bookAuthor,
			pagesNumber: bookPagesNumber,
			isRead: isRead,
		}
		updateDataSource(book)
		// update books state to trigger a re-render. Deferred till we lift the state up
	}
	function updateDataSource(book) {
		const books = JSON.parse(sessionStorage.getItem('books')) || []
		const updatedBooks = books.concat(book)
		sessionStorage.setItem('books', JSON.stringify(updatedBooks))
	}
	return (
		<form
			action=''
			className='add-new-book-form-container'
			onSubmit={handleSubmission}
		>
			<header>Add new book</header>
			<div className='form-group'>
				<input
					type='text'
					name='book_title'
					placeholder='Title'
					ref={bookTitleRef}
				/>
			</div>

			<div className='form-group'>
				<input
					type='text'
					name='book_author'
					placeholder='Author'
					ref={bookAuthorRef}
				/>
			</div>

			<div className='form-group'>
				<input
					type='number'
					name='book_pages_number'
					maxLength='1000'
					placeholder='Number of Pages'
					ref={bookPagesNumberRef}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='is_read'>Have you read it?</label>
				<input
					type='checkbox'
					name='is_read'
					id='is_read'
					ref={isBookReadRef}
				/>
			</div>

			<input
				type='submit'
				value='Submit'
				className='btn btn-light-green'
			/>
		</form>
	)
}
export default AddBookForm