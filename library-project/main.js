import './modal.js'
import './form.js'
import { BookFactory } from './book/BookFactory.js'

function showBooks() {
  BookFactory.renderBooks()
}
window.addEventListener('DOMContentLoaded', showBooks)