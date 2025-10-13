import { addQuote, updateQuote, deleteQuote, getAllQuotes } from './quote.js'
// Lesson 3 - Events Starter

let quotes = []

// Select DOM elements
const quoteList = document.getElementById('quote-list');
const form = document.getElementById('quoteForm');
const contentInput = document.getElementById('content');
const authorInput = document.getElementById('author');
const idInput = document.getElementById('quoteId');
const randomBtn = document.getElementById('randomBtn');
const randomDisplay = document.getElementById('randomQuoteDisplay');

function createQuoteElement(quote) {
  const div = document.createElement("div")
  div.dataset.id = quote.id
  
 const content = document.createElement('p');
  content.textContent = quote.content;

  const author = document.createElement('p');
  author.textContent = quote.author;

  const editBtn = document.createElement("button")
  editBtn.textContent = "Edit"
  editBtn.classList.add("edit-btn")
  editBtn.dataset.id = quote.id

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.dataset.id = quote.id;


   editBtn.addEventListener('click', () => {
    const { id, content, author } = quote;
    idInput.value = id;
    contentInput.value = content;
    authorInput.value = author;
  });

  deleteBtn.addEventListener('click', () => {
    deleteQuote(quote.id);
    deleteQuoteFromDOM(quote.id);
  });


  div.append(content,author,editBtn,deleteBtn);
  return div
}

// Add, edit, delete quote functions

function addQuoteToDOM(quote) {
  const el = createQuoteElement(quote)
  quoteList.appendChild(el)
}
function updateQuoteInDOM(quote) {
  const div = quoteList.querySelector(`[data-id='${quote.id}']`);
  if (div) {
    div.querySelector('p:nth-child(1)').textContent = quote.content;
    div.querySelector('p:nth-child(2)').textContent = quote.author;
  }
}
function deleteQuoteFromDOM(id) {
    const div = quoteList.querySelector(`[data-id='${id}']`);
  if (div) div.remove();

}
function renderQuotes() {
  quoteList.innerHTML = " "
  const allQuote = getAllQuotes();
  allQuote.forEach(addQuoteToDOM)
}
function showRandomQuote() {
  const allQuotes = getAllQuotes();
  if (allQuotes.length === 0) {
    randomDisplay.textContent = '-- No quotes to show --';
    return;
  }

  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  const randomQuote = allQuotes[randomIndex];

  randomDisplay.textContent = `"${randomQuote.content}" — ${randomQuote.author}`;
}
form.addEventListener('submit', (e) => {
  e.preventDefault(); // ป้องกัน reload หน้า

  const content = contentInput.value.trim();
  const author = authorInput.value.trim();
  const id = Number(idInput.value);

  if (content && author) {
    if (id) {
      // แก้ไข
      const updated = updateQuote(id, content, author);
      updateQuoteInDOM(updated);
    } else {
      // เพิ่มใหม่
      const newQuote = addQuote(content, author);
      addQuoteToDOM(newQuote);
    }

    form.reset();
    idInput.value = ''; // เคลียร์ hidden id
  }
});

// Event listeners for form submission, edit, and delete clicks
