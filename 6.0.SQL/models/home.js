const db = require("../utils/dataBase");

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
    console.log("Saving home:", this);
    return db.execute('INSERT INTO homes (houseName, description, price, location, rating, photoUrl) VALUES (?, ?, ?, ?, ?, ?)', 
    [this.houseName, this.description, this.price, this.location, this.rating, this.photoUrl]  
    );
  }

  static fetchAll(callback) {
     return db.execute('SELECT * FROM homes');
  }

  static findById(homeId, callback) {
  }

  static deleteById(homeId, callback){
  }

};
