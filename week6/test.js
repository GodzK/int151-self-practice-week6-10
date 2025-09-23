function makeCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    }
}

const valueKeeper = makeCounter();

console.log(valueKeeper()); // 1
console.log(valueKeeper()); // 2
console.log(valueKeeper()); // 3
