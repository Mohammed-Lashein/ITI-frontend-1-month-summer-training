export const modal = document.querySelector(".modal")
const addBookBtn = document.querySelector("button.add-book")

function showModal() {
  modal.classList.remove('hidden')
}
function hideModal(e) {
  // prevents modal closure on interacting with add book form
  const isModalClicked = e.target === modal
  if(isModalClicked) {
    modal.classList.add('hidden')
  }
}
modal.addEventListener('click', hideModal)
addBookBtn.addEventListener('click', showModal)
