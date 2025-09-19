function Modal({ isOpen, setIsOpen }) {
	return (
		<>
			{isOpen && (
				<div className='modal'>
					<form
						action=''
						className='add-new-book-form-container'
					>
						<header>Add new book</header>
						<div className='form-group'>
							<input
								type='text'
								name='book_title'
								placeholder='Title'
							/>
						</div>

						<div className='form-group'>
							<input
								type='text'
								name='book_author'
								placeholder='Author'
							/>
						</div>

						<div className='form-group'>
							<input
								type='number'
								name='book_pages_number'
								maxLength='1000'
								placeholder='Number of Pages'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='is_read'>Have you read it?</label>
							<input
								type='checkbox'
								name='is_read'
								id='is_read'
							/>
						</div>

						<input
							type='submit'
							value='Submit'
							className='btn btn-light-green'
						/>
					</form>
				</div>
			)}
		</>
	)
}
export default Modal
