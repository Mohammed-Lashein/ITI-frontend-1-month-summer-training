import { useState } from 'react'
import AddBookButton from './components/AddBookButton'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Navbar from './components/Navbar'

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	return (
		<div>
			<Navbar />
			<main>
				<div className='main-container'>
					<AddBookButton setIsModalOpen={setIsModalOpen} />
					<Modal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
					/>
					<Footer />
				</div>
			</main>
		</div>
	)
}

export default App
