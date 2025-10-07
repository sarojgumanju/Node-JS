const { getDB } = require("../utils/dataBase");

module.exports = class Home {
  constructor( id, houseName, description, price, location, rating, photoUrl) {
    this.id = id;
    this.houseName = houseName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    const db = getDB();
    // insert Many takes an array of an objects
    return db.collection("homes").insertOne(this).then((result) => {
      console.log(result);
    })
  }

  static fetchAll() {
    const db = getDB(); // Get database connection
    return db.collection('homes') // Accesses and return the collection named 'homes' in your database.
    .find() // The .find() method is used to query all documents in the 'homes' collection.
    .toArray() // Converts the cursor (stream of data) returned by .find() into a JavaScript array.
    .then((homes) => { // .then() runs after the database query successfully finishes.
      console.log(homes);
      return homes;
    }).catch((error) => {
      console.log("Error while fetching homes: ", error);
    });
  }

  static findById(homeId) {
  }

  static deleteById(id){
  }

};
