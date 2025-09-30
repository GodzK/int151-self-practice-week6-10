# DOM — บทเรียนเชิงปฏิบัติ (Hands‑On)

**ผู้สอน:** Asst.Prof. Dr. Umaporn Supasitthimethee (ผศ.ดร.อุมาพร สุภสิทธิเมธี)

**วัตถุประสงค์การเรียนรู้ (Learning Objectives)**

* เข้าใจโครงสร้างและหน้าที่ของ Document Object Model (DOM)
* ระบุและเข้าถึง HTML elements โดยใช้ JavaScript (เช่น `getElementById`, `querySelector`)
* แก้ไขคุณสมบัติ, attribute, และเนื้อหาแบบไดนามิกผ่าน JavaScript
* นำการจัดการ DOM มาสร้างองค์ประกอบที่ตอบสนอง (interactive) บนเว็บเพจ

---

## วิธีใช้เอกสารนี้

* แต่ละ Lab จะมีไฟล์ตัวอย่างที่สามารถ **คัดลอกไปเป็นไฟล์จริง** (`index.html`, `style.css`, `script.js`) แล้วเปิดด้วยเบราว์เซอร์ (หรือรันผ่าน Live Server ใน VS Code)
* แต่ละ Lab มี **คำสั่งปฏิบัติ (Task)** และ **เฉลย/คำอธิบาย** หากต้องการลองทำก่อนให้ข้ามเฉลย — แต่ถ้าต้องการตรวจงาน บอกผมได้เลย
* ใช้ Developer Tools (F12) → Console และ Elements เพื่อดูผลลัพธ์และแก้ไขแบบทดลองทันที

---

# สารบัญ

1. Overview + Setup
2. Lab 1 — Basic Setup & Selecting Elements
3. Lab 2 — Traversing Nodes
4. Lab 3 — Creating / Manipulating Nodes
5. Lab 4 — innerHTML / innerText / textContent และความปลอดภัย (XSS)
6. Lab 5 — Attributes, dataset, classList
7. Lab 6 — Events & Interactive Example (To‑Do App)
8. Lab 7 — Script loading, DOMContentLoaded, best practices
9. Cheatsheet (วิธีใช้งานสำคัญ)
10. แบบทดสอบสั้น + แบบฝึกหัดรวม

---

## 1) Overview + Setup

**ไฟล์เริ่มต้น (สร้าง 3 ไฟล์):** `index.html`, `style.css`, `script.js`

**index.html** (พื้นฐาน):

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DOM Lab Starter</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1 id="title">DOM Lab Starter</h1>
  </header>

  <main>
    <section id="demo">
      <p class="intro">นี่คือข้อความตัวอย่าง</p>
      <ul id="list">
        <li class="item">Item A</li>
        <li class="item">Item B</li>
        <li class="item">Item C</li>
      </ul>
      <button id="btn-add">เพิ่มรายการ</button>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

**style.css** (เล็ก ๆ น้อย ๆ เพื่อให้เห็นผล):

```css
body { font-family: system-ui, sans-serif; padding: 20px; }
.item { padding: 6px; }
.highlight { background: #fffa8a; }
.hidden { display: none; }
#title { color: #0b6; }
```

**script.js** (เริ่มต้น):

```js
console.log('script loaded');
```

**วิธีรัน:** บันทึกไฟล์ทั้งสามในโฟลเดอร์เดียว → เปิด `index.html` ในเบราว์เซอร์ → เปิด DevTools (F12) ดู Console

---

## Lab 1 — Selecting Elements (การเลือก element)

**เป้าหมาย:** ฝึกใช้งาน `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `querySelector`, `querySelectorAll` และสังเกต HTMLCollection vs NodeList

**ตัวอย่างโค้ด (วางใน `script.js` แทนโค้ดเริ่มต้น):**

```js
// เลือกโดย id
const title = document.getElementById('title');
console.log('by id:', title);

// เลือกตาม class (HTMLCollection - live)
const itemsByClass = document.getElementsByClassName('item');
console.log('getElementsByClassName (live):', itemsByClass);

// เลือกตาม tag
const allLi = document.getElementsByTagName('li');
console.log('getElementsByTagName (live):', allLi);

// querySelector -> ตัวแรก
const firstItem = document.querySelector('.item');
console.log('querySelector:', firstItem);

// querySelectorAll -> NodeList (static)
const nodeList = document.querySelectorAll('.item');
console.log('querySelectorAll (static):', nodeList);

// แก้ไขข้อความ
title.textContent = 'DOM — Lab 1: Selecting Elements';

// เปลี่ยน style ของ element ที่เลือก
firstItem.style.fontWeight = 'bold';

// ตรวจสอบความต่างของ live vs static
const newLi = document.createElement('li');
newLi.textContent = 'Item D (added)';
newLi.className = 'item';
const list = document.getElementById('list');
list.appendChild(newLi);
console.log('after append: itemsByClass.length (live) =', itemsByClass.length);
console.log('after append: nodeList.length (static) =', nodeList.length);
```

**Task (ทำเอง):**

1. เปลี่ยนข้อความ `<p class="intro">` ให้เป็นข้อความของคุณเอง
2. ใช้ `querySelectorAll` เพื่อนับจำนวน `.item` แล้วแสดงใน `console.log`
3. เพิ่ม `<li>` ใหม่ แล้วสังเกตความต่างของ `HTMLCollection` และ `NodeList`

**เฉลย / คำอธิบายสั้น ๆ:**

* `getElementsByClassName` และ `getElementsByTagName` จะเป็น **live** collection — เมื่อ DOM เปลี่ยน ค่าจะอัพเดตทันที
* `querySelectorAll` คืนค่าเป็น `NodeList` ที่มักจะเป็น **static** (ไม่เปลี่ยนอัตโนมัติ)

---

## Lab 2 — Traversing Nodes (การเดินดูต้นไม้ DOM)

**เป้าหมาย:** เข้าใจ `childNodes`, `children`, `firstChild`, `firstElementChild`, `nextSibling`, `nextElementSibling`, `parentNode`, `parentElement`

**ตัวอย่าง (ต่อใน `script.js`):**

```js
// สมมติเรายังมีตัวแปร list จาก Lab1
console.log('childNodes (รวม text nodes):', list.childNodes);
console.log('children (elements เท่านั้น):', list.children);

console.log('firstChild:', list.firstChild);
console.log('firstElementChild:', list.firstElementChild);

let current = list.firstElementChild;
while (current) {
  console.log('li text:', current.textContent.trim());
  current = current.nextElementSibling;
}

// parent relationship
console.log('list.parentElement:', list.parentElement);
```

**Task:**

* เขียนโค้ดเพื่อไปยัง `firstElementChild` ของ `#list` แล้วเปลี่ยน class ของมันเป็น `highlight`
* ใช้ loop แบบ `while` เพื่อแสดงข้อความของทุกรายการใน `console`

**เฉลย:**

* `firstElementChild` ข้าม text nodes และคืนเฉพาะ element
* `childNodes` มีทุกประเภท node รวม text node (ช่องว่าง, newline ก็เป็น text)

---

## Lab 3 — Creating / Manipulating Nodes

**เป้าหมาย:** สร้าง element ใหม่, ข้อความ, ใส่ attribute, แทรก, แทนที่, และลบ node

**ตัวอย่าง:**

```js
// create element และ append
const li = document.createElement('li');
li.textContent = 'Item E - created by JS';
li.className = 'item';
list.appendChild(li);

// insertBefore
const firstLi = list.firstElementChild;
const liBefore = document.createElement('li');
liBefore.textContent = 'Inserted First';
liBefore.className = 'item';
list.insertBefore(liBefore, firstLi);

// replaceChild (แทนที่ node ที่มีอยู่)
const newSecond = document.createElement('li');
newSecond.textContent = 'Replaced Second';
newSecond.className = 'item';
list.replaceChild(newSecond, list.children[1]);

// removeChild
list.removeChild(list.lastElementChild);
```

**Task:**

* เพิ่ม 3 รายการใหม่โดยใช้ `createElement` และ `appendChild`
* แทรกรายการหนึ่งไว้หน้าแรกโดยใช้ `insertBefore`
* แทนที่รายการที่สองด้วยข้อความใหม่โดยใช้ `replaceChild`
* ลบรายการสุดท้าย

**เฉลย / เคล็ดลับ:**

* `createTextNode` มักไม่จำเป็นเมื่อใช้ `textContent` แต่เข้าใจไว้ก็มีประโยชน์
* `setAttribute`, `getAttribute`, `removeAttribute` ใช้กับ attributes เช่น `data-*`, `id`, `title`

---

## Lab 4 — innerHTML / innerText / textContent และความปลอดภัย (XSS)

**เป้าหมาย:** เข้าใจความแตกต่างระหว่าง `innerHTML`, `innerText`, `textContent` และปัญหา XSS

**ตัวอย่าง:**

```html
<!-- สมมติมี div ต่อไปนี้ใน index.html -->
<div id="demoHtml">
  <b>Hello</b> <span style="display:none">hidden</span> world
</div>
```

```js
const demo = document.getElementById('demoHtml');
console.log('innerHTML:', demo.innerHTML);
console.log('innerText:', demo.innerText);
console.log('textContent:', demo.textContent);

// ตัวอย่าง XSS (ห้ามทำบน input ที่มาจากผู้ใช้)
const userInput = '<img src=x onerror="alert(\'XSS\')">';
// BAD: demo.innerHTML = userInput; // จะรันโค้ดจาก user
// SAFE:
demo.textContent = userInput; // แสดงเป็นข้อความธรรมดา ไม่รัน
```

**Task:**

* ลองเปลี่ยน `demo.innerHTML` ด้วย string ที่มี `<strong>Test</strong>` แล้วสังเกตผล
* ลองใช้ `textContent` กับ same string แล้วดูความต่าง

**เฉลย:**

* `innerHTML` จะ parse HTML และ render จริง → อันตรายถ้าใช้กับ input จากผู้ใช้
* `innerText` จะคืนค่าเฉพาะข้อความที่มองเห็น (คำนึงถึง CSS เช่น `display:none`)
* `textContent` คืนข้อความทั้งหมดรวม hidden

---

## Lab 5 — Attributes, dataset, classList

**เป้าหมาย:** จัดการ attribute, ใช้ `dataset` กับ `data-*`, และจัดการ class ด้วย `classList`

**ตัวอย่าง:**

```html
<!-- ตัวอย่าง HTML -->
<button id="modal-button" data-modal-id="modal1" data-user-status="active">Open</button>
```

```js
const btn = document.getElementById('modal-button');
console.log('data attributes via dataset:', btn.dataset);
console.log('modal id via dataset.modalId:', btn.dataset.modalId);

// เปลี่ยนค่า dataset
btn.dataset.userStatus = 'inactive';

// classList
btn.classList.add('btn', 'btn-primary');
btn.classList.toggle('hidden');
if (btn.classList.contains('btn-primary')) {
  console.log('มี class btn-primary');
}

// attributes
console.log('getAttribute id:', btn.getAttribute('id'));
btn.setAttribute('title', 'Open modal');
btn.removeAttribute('data-modal-id');
```

**Task:**

* สร้างปุ่มใหม่ที่มี `data-action="save"` แล้วอ่านผ่าน `dataset`
* ทำปุ่มให้สลับ class `hidden` เมื่อคลิก

**เฉลย:**

* `dataset` ช่วยแปลง `data-*` เป็น `camelCase` ใน JavaScript เช่น `data-user-status` → `dataset.userStatus`
* `classList` มีเมธอด `add`, `remove`, `toggle`, `contains`, `replace`

---

## Lab 6 — Events & Interactive Example (To‑Do App)

**เป้าหมาย:** เข้าใจการใช้งาน `addEventListener`, event object, event delegation, การจัดการฟอร์ม

**ไฟล์ตัวอย่าง (ToDo App):**

**index.html** (เฉพาะส่วน `main`):

```html
<main>
  <h2>To‑Do App (Lab 6)</h2>
  <form id="todo-form">
    <input id="todo-input" placeholder="พิมพ์งานที่ต้องทำ" required />
    <button type="submit">เพิ่ม</button>
  </form>
  <ul id="todo-list"></ul>
</main>
```

**script.js (ToDo logic):**

```js
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // หยุดการส่งฟอร์มแบบปกติ
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;
  li.dataset.id = Date.now();

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'ลบ';
  removeBtn.type = 'button';
  removeBtn.className = 'remove-btn';
  li.appendChild(document.createTextNode(' '));
  li.appendChild(removeBtn);

  todoList.appendChild(li);
  input.value = '';
});

// Event delegation สำหรับปุ่มลบ
todoList.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.remove-btn')) {
    const li = e.target.closest('li');
    if (li) li.remove();
  }
});
```

**Task:**

* เพิ่มฟังก์ชันให้คลิกบน `li` แล้วเปลี่ยนสถานะเป็น `done` โดยใช้ `classList.toggle('done')`
* ทำให้รายการเก็บใน `localStorage` เพื่อโหลดซ้ำเมื่อ refresh

**เฉลย (แนวทาง):**

* ใช้ `li.classList.toggle('done')` เมื่อคลิก
* เก็บ array ของรายการลง `localStorage` (JSON.stringify) และเมื่อโหลดหน้า ใช้ JSON.parse เพื่อ render อีกครั้ง

---

## Lab 7 — Script loading, DOMContentLoaded, best practices

**เนื้อหา:**

* ถ้าใส่ `<script src="script.js"></script>` ใน `<head>` *โดยไม่มี* `defer` หรือ `async` เบราว์เซอร์จะดาวน์โหลดและรันก่อนที่ DOM จะถูก parsed → อาจเจอ `null` เมื่อเลือก element
* วิธีแก้: ใส่ `<script src="script.js" defer></script>` หรือวาง `<script>` ที่ท้าย `<body>` หรือ ใช้ `document.addEventListener('DOMContentLoaded', ...)`

**ตัวอย่าง:**

```js
// วิธีใช้ DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // โค้ดที่ต้องการ element ที่อยู่ใน DOM
  console.log('DOM พร้อมแล้ว');
});
```

**ข้อแนะนำ:**

* ใช้ `defer` สำหรับสคริปต์ที่ต้องการเข้าถึง DOM
* หลีกเลี่ยงการใช้งาน synchronous dialog (alert/confirm/prompt) บ่อย ๆ ใน production

---

## Cheatsheet — เมธอดและ property ที่ใช้บ่อย

* `document.getElementById(id)` → Element หรือ `null`
* `document.querySelector(css)` → Element ตัวแรก หรือ `null`
* `document.querySelectorAll(css)` → NodeList (static)
* `element.textContent` / `element.innerText` / `element.innerHTML`
* `element.classList.add/remove/toggle/contains/replace`
* `document.createElement(tag)` / `document.createTextNode(text)`
* `parent.appendChild(child)` / `parent.insertBefore(newNode, referenceNode)`
* `element.setAttribute(name, value)` / `getAttribute(name)` / `removeAttribute(name)`
* `element.dataset` → เข้าถึง `data-*` attributes
* `element.addEventListener(event, handler)`

---

## แบบทดสอบสั้น (ลองทำ):

1. อะไรคือความต่างหลักระหว่าง `innerText` และ `textContent`?
2. ถ้าต้องการโค้ดที่ทำงานหลังจาก DOM ทั้งหมดโหลดเสร็จ ควรใช้วิธีใด?
3. อธิบายความหมายของ "live collection" (HTMLCollection) และยกตัวอย่างฟังก์ชันที่คืนค่า live collection


