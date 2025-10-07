// imports the official MongoDB Node.js driver
const mongodb = require("mongodb");

// extracts the MongoClient class from the mongodb module
const MongoClient = mongodb.MongoClient;
// MongoClient is what we use to connect to the MongoDB server.


// connection string for mongodb
const MONGO_URL = "mongodb://localhost:27017/airbnb";
// mongodb:// → use the MongoDB protocol
// localhost → MongoDB is running on your local machine
// 27017 → default port number
// /homes → the database you want to connect to. If homes doesn’t exist yet, MongoDB will automatically create it when you insert data.


let _db;

// You’re defining a function called mongoConnect.
// It takes a single parameter callback, which you can later use to run code after connecting to MongoDB.
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL) // Calls the connect() method on MongoClient to actually try connecting to the MongoDB server at your MONGO_URL.
    .then((client) => {
        callback();
        _db = client.db('airbnb');  
    })
    .catch((err) => {
      console.log("Error while connect to mongo: ", err);
    });
};


const getDB = () => {
    if(!_db){
        throw new Error('Mongo not connected.');
    }
    return _db;
}

module.exports = {mongoConnect, getDB};
