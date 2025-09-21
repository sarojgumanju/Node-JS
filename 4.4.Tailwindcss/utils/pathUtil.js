// Core modules
const path = require('path');

// exporting the main home path so that the project start from root path
// file helper
// console.log(path.dirname(require.main.filename)); 
// output: /home/saroj-gumanju/Documents/Node_practice/Day1/4.3.Airbnb
module.exports = path.dirname(require.main.filename);