const fs = require("fs");

console.log("1. Start of script.");

// synchronous (blocking) operation
console.log("2. Reading file synchronously.");
const dataSync = fs.readFileSync('user-details.txt', 'utf-8');
console.log("3. Synchrounous read complete.");

// Asynchrounous (non-blocking) operation
console.log("4. Reading file asychrounously.");
fs.readFile('user-details.txt', 'utf-8', (err, dataAsync) => {
    if(err) throw err;
    console.log("5. Asynchronous read complete.");
});

console.log("6. End of script.");