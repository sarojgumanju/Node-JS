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
    if(this.id){ // update
      return db.execute('UPDATE homes SET houseName=?, description=?, price=?, location=?, rating=?, photoUrl=? WHERE id=?',
      [this.houseName, this.description, this.price, this.location, this.rating, this.photoUrl, this.id]  
    )
    } else{ // insert
      return db.execute('INSERT INTO homes (houseName, description, price, location, rating, photoUrl) VALUES (?, ?, ?, ?, ?, ?)', 
      [this.houseName, this.description, this.price, this.location, this.rating, this.photoUrl]  
      );
    }
  }

  static fetchAll(callback) {
     return db.execute('SELECT * FROM homes');
  }

  static findById(homeId) {
     return db.execute('SELECT * FROM homes WHERE id=?', [homeId]);
  }

  static deleteById(id){
    return db.execute('DELETE FROM homes WHERE id=?', [id]);
  }

};
