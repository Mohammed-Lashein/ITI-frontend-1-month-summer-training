import { useRef } from 'react'

function AddBookForm({setIsModalOpen, addBook}) {

  const bookTitleRef = useRef(null)
  const bookAuthorRef = useRef(null)
  const bookPagesNumberRef = useRef(null)
  const isBookReadRef = useRef(null)
  
  function handleSubmission(e) {
    e.preventDefault()

    // since state values will reflect in the next UI print, manually checking them is wrong.
    /* 
      I noticed so when I submit the form for the 1st time, I get the message saying 
      "All fields are required". I need to click a 2nd time in order for the updated state to take effect
    */
    const aFieldIsEmpty = bookTitleRef.current.value === '' || bookAuthorRef.current.value === '' || bookPagesNumberRef.current.value === 0
    if (aFieldIsEmpty) {
      console.log('All fields are required') // the bookPagesNumber should be greater than zero, but let's
      // keep that for a later better validation approach
      return
    }

    console.log('end of fn reached!')

    // update data source with data
    const formElementsValues = {
      title: bookTitleRef.current.value,
      author: bookAuthorRef.current.value,
      pagesNumber: bookPagesNumberRef.current.value,
      isRead: isBookReadRef.current.checked,
    }
    // update books state to trigger a re-render. Deferred till we lift the state up

    addBook(formElementsValues)
    setIsModalOpen(false)

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