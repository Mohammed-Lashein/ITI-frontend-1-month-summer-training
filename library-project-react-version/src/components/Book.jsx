function Book({ book: {id, title, author, pagesNumber, isRead}, removeBook, toggleReadStatus}) {
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