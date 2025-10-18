// ui.js
import { addQuote, updateQuote, deleteQuote, getAllQuotes } from './quote.js'

// DOM elements
const quoteList = document.getElementById('quote-list')
const form = document.getElementById('quoteForm')
const contentInput = document.getElementById('content')
const authorInput = document.getElementById('author')
const idInput = document.getElementById('quoteId')
const randomBtn = document.getElementById('randomBtn')
const randomDisplay = document.getElementById('randomQuoteDisplay')

// Render all quotes
function renderQuotes() {
  quoteList.innerHTML = ''
  const allQuotes = getAllQuotes()
  allQuotes.forEach(addQuoteToDOM)
}

// Create quote DOM element
function addQuoteToDOM(quote) {
  const div = document.createElement('div')
  div.dataset.id = quote.id

  const contentP = document.createElement('p')
  contentP.textContent = quote.content

  const authorP = document.createElement('p')
  authorP.textContent = quote.author

  const editBtn = document.createElement('button')
  editBtn.textContent = 'Edit'
  editBtn.classList.add('edit-btn')
  editBtn.dataset.id = quote.id

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Delete'
  deleteBtn.classList.add('delete-btn')
  deleteBtn.dataset.id = quote.id

  div.append(contentP, authorP, editBtn, deleteBtn)
  quoteList.appendChild(div)
}

// Update quote in DOM
function updateQuoteInDOM(quote) {
  const div = quoteList.querySelector(`div[data-id="${quote.id}"]`)
  if (div) {
    div.children[0].textContent = quote.content
    div.children[1].textContent = quote.author
  }
}

// Delete quote from DOM
function deleteQuoteFromDOM(id) {
  const div = quoteList.querySelector(`div[data-id="${id}"]`)
  if (div) {
    div.remove()
  }
}

// Show random quote
function showRandomQuote() {
  const allQuotes = getAllQuotes()
  if (allQuotes.length === 0) {
    randomDisplay.textContent = 'No quotes available.'
    return
  }
  const random = allQuotes[Math.floor(Math.random() * allQuotes.length)]
  randomDisplay.textContent = `"${random.content}" — ${random.author}`
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const id = parseInt(idInput.value)
  const content = contentInput.value
  const author = authorInput.value

  if (id) {
    const updated = updateQuote(id, content, author)
    updateQuoteInDOM(updated)
  } else {
    const newQuote = addQuote(content, author)
    addQuoteToDOM(newQuote)
  }

  form.reset()
})

// Edit and delete buttons
quoteList.addEventListener('click', (e) => {
  const id = parseInt(e.target.dataset.id)
  if (e.target.classList.contains('edit-btn')) {
    const quote = getAllQuotes().find((q) => q.id === id)
    if (quote) {
      contentInput.value = quote.content
      authorInput.value = quote.author
      idInput.value = quote.id
    }
  } else if (e.target.classList.contains('delete-btn')) {
    deleteQuote(id)
    deleteQuoteFromDOM(id)
  }
})

// Random quote button
randomBtn.addEventListener('click', showRandomQuote)

// Initial render
renderQuotes()
