import { BookFactory } from './book/BookFactory.js'
import { FormValidator } from './FormValidator.js'
import { modal } from './modal.js'
import { BookMapper } from './book/BookMapper.js';

const form = document.querySelector('.add-new-book-form-container')
const booksContainer = document.querySelector('.books-container')

form.addEventListener('submit', handleFormSubmission)

// event handlers
function handleFormSubmission(e) {
  e.preventDefault()
  let data = getBookFormData()
  let rules = {
    title: {
      required: true
    },
    author: {
      required: true
    },
    pagesNumber: {
      required: true,
      min: 1,
      max: 1000
    },
  }

let v = new FormValidator(data, rules)
// console.log('validation stuff!!!');
// console.log('passes?', v.passes());
// console.log('fails?', v.fails());

if(v.passes()) {
  BookMapper.addBook(BookFactory.createFromFormData(data))
  booksContainer.innerHTML = BookFactory.renderBooks()
  modal.classList.add('hidden')
  
  const {bookTitleElement, bookAuthorElement, bookNumberOfPagesElement, isReadCheckboxElement} = getBookFormElements()
  
  bookTitleElement.value = ''
  bookAuthorElement.value = ''
  bookNumberOfPagesElement.value = ''
  isReadCheckboxElement.value = false
}
}

function getBookFormData() {
  const {bookTitleElement, bookAuthorElement, bookNumberOfPagesElement, isReadCheckboxElement} = getBookFormElements()

  return {
    title: bookTitleElement.value,
    author: bookAuthorElement.value,
    pagesNumber: bookNumberOfPagesElement.value,
    isRead: isReadCheckboxElement.checked
  }
}

function getBookFormElements() {
  const bookTitle = document.querySelector("input[name='book_title']")
  const bookAuthor = document.querySelector("input[name='book_author']")
  const bookNumberOfPages = document.querySelector("input[name='book_pages_number']")
  const isReadCheckbox = document.querySelector("input[name='is_read']")
  return {
    bookTitleElement: bookTitle,
    bookAuthorElement: bookAuthor,
    bookNumberOfPagesElement: bookNumberOfPages,
    isReadCheckboxElement: isReadCheckbox,
  }
}
