function AddBookButton({setIsModalOpen}) {
  return (
    <section className='add-book-container'>
      <button className='btn add-book' onClick={() => setIsModalOpen(true)}>+ Add book</button>
    </section>
  )
}
export default AddBookButton