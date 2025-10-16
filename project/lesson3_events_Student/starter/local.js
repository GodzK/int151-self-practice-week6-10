let quotes = JSON.parse(localStorage.getItem('quotes')) || []
let nextId = quotes.length ? Math.max(...quotes.map(q => q.id)) + 1 : 1

function saveToLocalStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes))
}

function addQuote(content, author) {
  const newQuote = { id: nextId++, content, author }
  quotes.push(newQuote)
  saveToLocalStorage()
  return newQuote
}

function updateQuote(id, content, author) {
  const quote = quotes.find(q => q.id === id)
  if (quote) {
    quote.content = content
    quote.author = author
    saveToLocalStorage()
  }
  return quote
}

function deleteQuote(id) {
  const index = quotes.findIndex(q => q.id === id)
  if (index !== -1) {
    quotes.splice(index, 1)
    saveToLocalStorage()
  }
  return index
}

function getAllQuotes() {
  return [...quotes]
}

export { addQuote, deleteQuote, updateQuote, getAllQuotes }
