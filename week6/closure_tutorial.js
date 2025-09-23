// ==========================
// 📘 CLOSURE TUTORIAL & PRACTICE
// ==========================
//
// วิธีใช้: 
// - อ่านคำอธิบาย
// - ทำโจทย์ที่อยู่ในแต่ละข้อ
// - ค่อย ๆ ทำให้ผ่านทุกข้อ
//
// ✨ เป้าหมาย: หลังจากทำครบ คุณจะเข้าใจ closure 100%

// -----------------------------------------------------
// PART 1: พื้นฐานของ Closure
// -----------------------------------------------------
//
// Closure = ฟังก์ชันที่ "จำ" ตัวแปรที่อยู่นอก scope ของมันได้
//


// 🚩 Example 1:
function outerExample() {
  let message = "Hello from outer!";

  function innerExample() {
    console.log(message); // ใช้ตัวแปรจาก outer
  }

  return innerExample;
}

const myFunc = outerExample();
myFunc(); // ลองรันดู จะได้อะไร?

// -----------------------------------------------------
// 📝 Exercise 1:
// สร้างฟังก์ชัน makeGreeting ที่รับชื่อ (name)
// แล้ว return ฟังก์ชันที่เมื่อเรียก จะ console.log("Hello, <name>")

function makeGreeting(name) {
    function greet() {
        console.log("Hello, " + name);
    }
    return greet;
}

const greetA = makeGreeting("Alice");
greetA(); // 👉 ควรแสดง "Hello, Alice"

// -----------------------------------------------------
// PART 2: Closure + Counter
// -----------------------------------------------------
//
// Closure มักถูกใช้เพื่อ "เก็บ state"
// เช่นการทำ counter ที่เพิ่มค่าได้เรื่อย ๆ แม้ฟังก์ชัน outer จะจบไปแล้ว
//

// 🚩 Example 2:

// -----------------------------------------------------
// 📝 Exercise 2:
// เขียนฟังก์ชัน makeCounter ที่ return ฟังก์ชัน 2 ตัว
// - increment() เพิ่มค่า count
// - decrement() ลดค่า count
// และค่าของ count ต้อง "จำ" ได้ด้วย closure
//
// ตัวอย่าง:
// const counter = makeCounter();
// counter.increment(); // 1
// counter.increment(); // 2
// counter.decrement(); // 1


function makeCounter() {
  let value = 0;
  return function () {
    value ++
    return value;
  }
}
const dataKeeper = makeCounter();
console.log(dataKeeper());
console.log(dataKeeper());
console.log(dataKeeper());


// -----------------------------------------------------
// PART 3: Parameterized Closure
// -----------------------------------------------------
//
// Closure สามารถ "เก็บค่า parameter" ไว้ใช้ทีหลัง
//

// 🚩 Example 3:
function multiplier(factor) {
  return function (x) {
    return x * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
console.log(double(5)); // 10

// -----------------------------------------------------
// 📝 Exercise 3:
// เขียนฟังก์ชัน power(exponent) ที่ return ฟังก์ชัน
// เพื่อยกกำลังตัวเลข เช่น:
// const square = power(2);
// square(5) 👉 25
// const cube = power(3);
// cube(2) 👉 8

function power(exponent) {
  return function (power) {
    return Math.pow(power,exponent)
  };
}

const square = power(2);
console.log(square(5), "This is Power !!");


// -----------------------------------------------------
// PART 4: Practical Usage
// -----------------------------------------------------
//
// Closure ใช้บ่อยในการซ่อนข้อมูล (data privacy)
//

// 🚩 Example 4:
function bankAccountExample(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function (amount) {
      balance += amount;
      return balance;
    },
    withdraw: function (amount) {
      balance -= amount;
      return balance;
    },
    getBalance: function () {
      return balance;
    }
  };
}

const myAcc = bankAccountExample(100);
console.log(myAcc.deposit(50));   // 150
console.log(myAcc.withdraw(30));  // 120
console.log(myAcc.getBalance());  // 120


// -----------------------------------------------------
// 📝 Exercise 4 (Challenge):
// เขียนฟังก์ชัน createSecret(secret)
// ที่ return object 2 method:
// - getSecret(password) => ถ้ารหัสถูก ให้ return secret
// - changeSecret(password, newSecret) => เปลี่ยนค่า secret ได้ ถ้ารหัสถูก
//
// Hint: ใช้ closure เก็บ secret และ password

function createSecret(secret, password) {
  let psw = password
  let sec = secret
  return {
    getSecret : function (pass) {
      if (pass === psw) {
        return sec
      }
      else{
        return "Access Denied"
      }
    },
    changeSecret : function (pass,newSecret) {
        if (pass === psw) {
          sec = newSecret
        }
    } 
  }
}

const locker = createSecret("MyGold", "1234");
console.log(locker.getSecret("wrong")) // "Access Denied");
console.log(locker.getSecret("1234"))  // "MyGold");
locker.changeSecret("1234", "Diamond");
console.log(locker.getSecret("1234")); // "Diamond"



// -----------------------------------------------------
// 🎯 Final Boss Exercise (Super Challenge):
// เขียนฟังก์ชัน once(fn) ที่รับฟังก์ชัน fn เข้ามา
// แล้ว return ฟังก์ชันใหม่ที่สามารถถูกเรียกได้แค่ครั้งเดียว
// ถ้าเรียกครั้งที่ 2 จะไม่ทำงานแล้ว (return undefined)
//
// ตัวอย่าง:
// const helloOnce = once(() => console.log("Hello"));
// helloOnce(); // "Hello"
// helloOnce(); // (ไม่แสดงอะไร)

function once(fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      return fn()
    }
  }
}

const helloOnce = once(() => console.log("Hello"));
helloOnce(); // "Hello"
helloOnce(); // (ไม่แสดงอะไร)