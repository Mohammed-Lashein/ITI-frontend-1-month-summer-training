import AddBookForm from './AddBookForm'

function Modal({ isOpen, setIsOpen, addBook }) {
  function closeModal(e) {
    if(e.target === e.currentTarget) {
      // e.target => The element that we clicked
      // e.currentTarget => The element that is assigned the *current* onClick handler
      setIsOpen(false)
    }
    }
  return (
    <>
      {isOpen && (
        <div className='modal' onClick={(e) => closeModal(e)}>
          <AddBookForm setIsModalOpen={setIsOpen} addBook={addBook}/>
        </div>
      )}
    </>
  )
}
export default Modal
