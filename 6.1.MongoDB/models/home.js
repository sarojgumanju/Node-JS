const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/dataBase");

module.exports = class Home {
  constructor( id, houseName, description, price, location, rating, photoUrl) {
    if(id){
      this.id = id;
    }
    this.houseName = houseName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    const db = getDB();
    if(this.id){ // update
      const updateFields = {
        houseName: this.houseName,
        description: this.description,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl
      }
      return db.collection('homes')
      .updateOne(
        {_id: new ObjectId(String(this.id))},
        {$set: updateFields}
      )
    }else{ // insert
      // insert Many takes an array of an objects
      return db.collection("homes").insertOne(this);
    }
  }


  static fetchAll() {
    const db = getDB(); // Get database connection
    return db.collection('homes') // Accesses and return the collection named 'homes' in your database.
    .find() // The .find() method is used to query all documents in the 'homes' collection.
    .toArray() // Converts the cursor (stream of data) returned by .find() into a JavaScript array.
    .then((homes) => { // .then() runs after the database query successfully finishes.
      // console.log(homes);
      return homes;
    }).catch((error) => {
      console.log("Error while fetching homes: ", error);
    });
  }

  static findById(homeId) {
    // console.log(homeId);
    const db = getDB();
    return db.collection('homes')
    .find({_id: new ObjectId(String(homeId))})
    .next();
  }

  static deleteById(id){
    const db = getDB();
    return db.collection('homes')
    .deleteOne({_id: new ObjectId(String(id))});
  }

};
