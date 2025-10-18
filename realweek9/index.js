// เลือกปุ่มที่อยู่ใน div
const submitButton = document.querySelector("div > button");

// เพิ่ม event listener ให้ปุ่ม
submitButton.addEventListener(
  "click",
  () => {
    console.log("Submit button was clicked!");
  },
  true // เปิดใช้ capture phase
);

// เลือก div
const divElement = document.querySelector("div");

// เพิ่ม event listener ให้ div
divElement.addEventListener(
  "click",
  () => {
    console.log("Div was clicked!");
  },
  true // เปิดใช้ capture phase เช่นกัน
);
