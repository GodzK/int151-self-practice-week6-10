let quotes = []
let id = 0
let editing = null
const quoteList = document.getElementById("quote-list")

const form = document.getElementById("quoteForm")

const inputContent = document.getElementById("content")

const inputAuthor = document.getElementById("author")


form.addEventListener("submit" , (event)=>{
  event.preventDefault(); 
  let content = inputContent.value
  let author = inputAuthor.value
  
  if (editing !== null) {
    editQuote(editing,content,author )
    editing = null
  }
  else{
    let quote = {id : id++ , author , content} 
    quotes.push(quote)
    inputContent.value = ""
    inputAuthor.value = ""
    fetchDom()
  }

})


function fetchDom() {
  quoteList.innerHTML = ""
  quotes.forEach((e) =>{
    const div = document.createElement("div")
    div.dataset.id = e.id
    const p = document.createElement('p')
    p.textContent = e.content
    const h2 = document.createElement("h2")
    h2.textContent = e.author
    const EditBtn = document.createElement("button")
    EditBtn.dataset.id = e.id
    EditBtn.textContent = "Edit Btn"
    EditBtn.addEventListener("click" ,()=>{
      inputContent.value = e.content
      inputAuthor.value = e.author
      editing = e.id
    })
    const RemoveBtn = document.createElement("button")
    RemoveBtn.dataset.id = e.id
    RemoveBtn.textContent = "Remove Btn"
    RemoveBtn.addEventListener("click" ,()=>{
      removeBtn(e.id)
    })
    div.append(h2,p,EditBtn , RemoveBtn)
    quoteList.appendChild(div)
  })
}


function editQuote(id , content , author ) {
    const quote = quotes.find(e => e.id == id)
    quote.content = content
    quote.author = author
    fetchDom()
}
function removeBtn(id) {
  quotes = quotes.filter(e => e.id !== id)
  fetchDom()
}
fetchDom()