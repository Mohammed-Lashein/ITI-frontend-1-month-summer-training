import { useState } from 'react'
import { BookMapper } from '../utils/BookMapper'
import { BookFactory } from '../utils/BookFactory'

export function useBooks() {
	const [books, setBooks] = useState(JSON.parse(sessionStorage.getItem('books')) || [])

	function addBook(data) {
		const book = BookFactory.createFromFormData(data) // to get a book instance that has a generated id
		BookMapper.addBook(book) // update data source

    /* 
      Yes it is weird that BookMapper.toStorage() prepares the data to be stored in the data source, 
    whereas here it is used to transform Book instance to a plain object that can be stored in the books
    state. 

    I could have changed the implementation of BookMapper.fromStorage() to return an object instead of a Book
    instance, but there is no need to change implementations especially that we are comparing the react 
    version with the vanilla js one.
    */
		const bookObj = BookMapper.toStorage(book) // get a book object not a Book instance
		setBooks((prev) => [...prev, bookObj])
	}
	return { books, addBook, setBooks }
}
