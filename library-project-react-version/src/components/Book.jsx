function Book({title, author, pagesNumber, isRead}) {
	return (
		<article class='book'>
			<p class='book__title'>{title}</p>
			<p class='book__author'>{author}</p>
			<p class='book__pages-number'>{pagesNumber}</p>
			<button class={`btn ${isRead ? 'btn-light-green' : 'btn-light-red'}`}>{isRead ? 'Read' : 'Not Read'}</button>
			<button class='btn'>Remove</button>
		</article>
	)
}
export default Book