function generateBookId() {
  let count = 0;
  return function() {
    return count++;
  } 
}
const bookIdGenerator = generateBookId()
export class Book {
  #id;
  constructor(id, title, author, pagesNumber, isRead) {
    this.#id = id ?? bookIdGenerator()
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isRead = isRead
  }
  get id() {
    return this.#id;
  }
  render() {
    return `
          <article class="book">
            <p class="book__title">"${this.title}"</p>
            <p class="book__description">${this.author}</p>
            <p class="book__pages-count">${this.pagesNumber} pages</p>
            <button class="btn ${this.isRead ? 'btn-light-green' : 'btn-light-red'} read">${this.isRead ? 'Read' : 'Not read'}</p>
            <button class="btn">Remove</button>
        </article>

    `
  }
}
