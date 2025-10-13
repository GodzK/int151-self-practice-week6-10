// Step 1: Create an array to hold quote objects
const quotes = []
let nextId = 1

// Step 2: Select the DOM element where quotes will be rendered
const quoteList = document.getElementById('quote-list')

// Step 3: Define quote management functions
function addQuote(content, author) {
  const newQuote = { id: nextId++, content, author }
  quotes.push(newQuote)
  return newQuote
}

function updateQuote(id, content, author) {
  const quote = quotes.find((q) => q.id === id)
  if (quote) {
    quote.content = content
    quote.author = author
    return quote
  }
}

function deleteQuote(id) {
  const index = quotes.findIndex((q) => q.id === id)
  if (index !== -1) {
    quotes.splice(index, 1)
  }
  return index
}

function getAllQuotes() {
  return [...quotes]
}

// Step 4: Define a render function
function renderQuotes() {
  // Clear existing content
  quoteList.innerHTML = ''

  // Get current quotes
  const allQuotes = getAllQuotes()

  // Create and append <p> elements for each quote
  allQuotes.forEach((quote) => {
    const p = document.createElement('p')
    p.textContent = `"${quote.content}" — ${quote.author}`
    quoteList.appendChild(p)
  })
}

// Step 5: Add test quotes
addQuote('Stay hungry, stay foolish.', 'Steve Jobs')
addQuote('In the middle of difficulty lies opportunity.', 'Albert Einstein')

// Step 6: Render the quotes
renderQuotes()
