import { useState } from 'react'
import { BookMapper } from '../utils/BookMapper'
import { BookFactory } from '../utils/BookFactory'

export function useBooks() {
	const [books, setBooks] = useState(JSON.parse(sessionStorage.getItem('books')) || [])

	function addBook(data) {
		const book = BookFactory.createFromFormData(data) // to get a book instance that has a generated id
		BookMapper.addBook(book) // update data source
    
		const bookObj = BookMapper.toStorage(book) // get a book object not a Book instance
		setBooks((prev) => [...prev, bookObj])
	}
	return { books, addBook }
}
