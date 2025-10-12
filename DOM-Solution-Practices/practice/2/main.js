// Solution 1 : 

// const box = document.getElementById('box')

// const redBtn = document.querySelector('[data-color="red"]')
// const blueBtn = document.querySelector('[data-color="blue"]')
// const greenBtn = document.querySelector('[data-color="green"]')

// redBtn.addEventListener("click" , ()=>{
//   box.style.background = "red"
// })
// blueBtn.addEventListener("click" , ()=>{
//   box.style.background = "blue"
// })
// greenBtn.addEventListener("click" , ()=>{
//   box.style.background = "green"
// })



// Solution 2 : 
const box = document.getElementById('box')

const button = document.querySelectorAll("button")

button.forEach(btn =>{
  btn.addEventListener("click" , ()=>{
    const color = btn.dataset.color
    box.style.background = color
  })
})
