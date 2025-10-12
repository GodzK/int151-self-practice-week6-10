const allItems = document.querySelectorAll("li");

allItems.forEach(item => {
  if (item.textContent.toLowerCase().includes("soup")) {
    console.log("Found soup item:", item.textContent);
  }
});