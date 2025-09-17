function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const c1 = counter();
console.log(c1());
console.log(c1());
console.log(c1());


function secretHolder(secret) {
  return function() {
    return secret;
  };
}

const getSecret = secretHolder("hidden");
console.log(getSecret());



function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(10));



function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const init = once(() => "initialized");
console.log(init());
console.log(init());



function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = multiplier(2);
console.log(double(4));


function createCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    reset: function() {
      count = 0;
      return count;
    }
  };
}

const myCounter = createCounter();
console.log(myCounter.increment());
console.log(myCounter.increment());
console.log(myCounter.decrement());
console.log(myCounter.reset());




for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, j * 100);
  })(i);
}



function memoSquare() {
  const cache = {};
  return function(x) {
    if (cache[x]) return cache[x];
    const result = x * x;
    cache[x] = result;
    return result;
  };
}

const square = memoSquare();
console.log(square(4));
console.log(square(4));




function createTimer() {
  let time = 0;
  let interval;
  return {
    start: function() {
      interval = setInterval(() => {
        time++;
      }, 1000);
    },
    stop: function() {
      clearInterval(interval);
      return time;
    }
  };
}

const timer = createTimer();
timer.start();
setTimeout(() => {
  console.log(timer.stop());
}, 3100);



function createLogger() {
  let count = 0;
  return {
    log: function(msg) {
      count++;
      console.log(count + ": " + msg);
    }
  };
}

const logger = createLogger();
logger.log("Hello");
logger.log("World");
