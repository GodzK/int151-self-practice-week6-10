// 1. Create an empty array to hold the quotes
const quotes = [];

/*
  2. Function: addQuote
  - Accepts a quote object with id, content, and author
  - Adds it to the quotes array
*/
function addQuote(quote) {
  quotes.push(quote);
}

/*
  3. Function: deleteQuote
  - Accepts an id
  - Removes the quote with that id from the array
*/
function deleteQuote(id) {
  const index = quotes.findIndex(q => q.id === id);
  if (index !== -1) {
    quotes.splice(index, 1); // Remove 1 element at the found index
  }
}

/*
  4. Function: updateQuote
  - Accepts an id and an object with new content and/or author
  - Updates the quote with the given id
*/
function updateQuote(id, updatedQuote) {
  const quote = quotes.find(q => q.id === id);
  if (quote) {
    if (updatedQuote.content) quote.content = updatedQuote.content;
    if (updatedQuote.author) quote.author = updatedQuote.author;
  }
}

/*
  5. Function: getAllQuotes
  - Returns all quotes in the array
*/
function getAllQuotes() {
  return quotes;
}

// 6. Test your functions below

// Add 3 quotes
addQuote({ id: 1, content: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" });
addQuote({ id: 2, content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" });
addQuote({ id: 3, content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" });

console.log("Initial Quotes:", getAllQuotes());

// Delete quote with id 2
deleteQuote(2);
console.log("After Deleting Quote with id 2:", getAllQuotes());

// Update quote with id 1
updateQuote(1, { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" });
console.log("After Updating Quote with id 1:", getAllQuotes());
