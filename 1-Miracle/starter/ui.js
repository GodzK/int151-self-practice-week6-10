// Lesson 3 - Events Starter

// let quotes = []

// Select DOM elements
const quoteList = document.getElementById("quote-list")
const form =document.getElementById("quoteForm")
const contentInput = document.getElementById('content');
const authorInput = document.getElementById('author');
const idInput = document.getElementById('quoteId');
const randomBtn = document.getElementById('randomBtn');
const randomDisplay = document.getElementById('randomQuoteDisplay');


function createQuoteElement(quote) {
  const div = document.createElement("div")
  div.dataset.id = quote.id
  const content = document.createElement("p")
  content.textContent = quote.content
  const author = document.createElement("p")
  author.textContent = quote.author
  const editBtn = document.createElement("button")
  editBtn.textContent = "Edit"
  editBtn.className = "edit-btn"
  editBtn.dataset.id = quote.id
  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Delete"
  deleteBtn.className = "delete-btn"
  deleteBtn.dataset.id = quote.id
  div.append(content,author , editBtn , deleteBtn)
  return div
  // a quote element example
  //<section id="quote-list">
  //  <div data-id="1">
  //    <p>Confidence comes from discipline and training</p>
  //    <p>Robert</p>
  //    <button class="edit-btn" data-id="1">
  //      Edit
  //    </button>
  //    <button class="delete-btn" data-id="1">
  //      Delete
  //    </button>
  //  </div>
  // </section>
}

// Add, edit, delete quote functions

function addQuoteToDOM(quote) {
  const el = createQuoteElement(quote)
  quoteList.appendChild(el)
}
function updateQuoteInDOM(quote) {}
function deleteQuoteFromDOM(id) {}
function renderQuotes() {}
function showRandomQuote() {}
// Event listeners for form submission, edit, and delete clicks


form.addEventListener('submit', handleFormSubmit) 

// ต้องเขียนฟังก์ชันเพื่อจัดการการ Submit โดยเฉพาะ
function handleFormSubmit(event) {
    event.preventDefault(); // ป้องกันการรีโหลดหน้าจอ
    
    // ต้องดึงค่าจาก form inputs มาสร้าง quote object ก่อน
    const newQuote = { 
        id: Date.now(), // ใช้ ID ชั่วคราว หรือ import ID จากไฟล์ 2
        content: contentInput.value, 
        author: authorInput.value 
    };

    // เรียกฟังก์ชันเพิ่มเข้า DOM
    addQuoteToDOM(newQuote);
    
    // ต้องมีการเรียกใช้ฟังก์ชัน addQuote(content, author) จากไฟล์ 2 ด้วย
}