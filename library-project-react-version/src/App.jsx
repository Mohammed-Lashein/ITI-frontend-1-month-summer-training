import { useState } from 'react'
import AddBookButton from './components/AddBookButton'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Books from './components/Books'
import { useBooks } from './hooks/useBooks'

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {books, addBook, setBooks} = useBooks()
	return (
		<div>
			<Navbar />
			<main>
				<div className='main-container'>
					<AddBookButton setIsModalOpen={setIsModalOpen} />
					<Modal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						addBook={addBook}
					/>
					<Books books={books} setBooks={setBooks}/>
					<Footer />
				</div>
			</main>
		</div>
	)
}

export default App
