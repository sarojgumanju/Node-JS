console.log("1. Start of the script.");

// Microtask queue (Promise) // this is async
Promise.resolve().then(() => console.log("2. Microtask 1"));

// Timer queue // this is async
setTimeout(() => console.log("3. Timer 1"), 0);

// I/O queue // this is async
const fs = require("fs");
fs.readFile('user-details.txt', () => console.log("4. I/O operation"));

// check queue // this is async
setImmediate(() => console.log("5. Immediate 1"));

// close queue
process.on("exit", () => {
    console.log("6. Exit event.");
});

// end of script
console.log("7. End of script.");