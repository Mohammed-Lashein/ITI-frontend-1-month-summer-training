function Book({title, author, pagesNumber, isRead}) {
	return (
		<article className='book'>
			<p className='book__title'>{title}</p>
			<p className='book__author'>{author}</p>
			<p className='book__pages-number'>{pagesNumber}</p>
			<button className={`btn ${isRead ? 'btn-light-green' : 'btn-light-red'}`}>{isRead ? 'Read' : 'Not Read'}</button>
			<button className='btn'>Remove</button>
		</article>
	)
}
export default Book