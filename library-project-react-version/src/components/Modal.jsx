function Modal() {
	return (
		<div class='modal hidden'>
			<form
				action=''
				class='add-new-book-form-container'
			>
				<header>Add new book</header>
				<div class='form-group'>
					<input
						type='text'
						name='book_title'
						placeholder='Title'
					/>
				</div>

				<div class='form-group'>
					<input
						type='text'
						name='book_author'
						placeholder='Author'
					/>
				</div>
				<div class='form-group'>
					<input
						type='number'
						name='book_pages_number'
						maxlength='1000'
						placeholder='Number of Pages'
					/>
				</div>
				<div class='form-group'>
					<label for='is_read'>Have you read it?</label>
					<input
						type='checkbox'
						name='is_read'
						id='is_read'
					/>
				</div>
				<input
					type='submit'
					value='Submit'
					class='btn btn-light-green'
				/>
			</form>
		</div>
	)
}
export default Modal
