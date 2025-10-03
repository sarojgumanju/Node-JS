const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

// fake database
let registeredHomes = [];

const filePath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      console.log("this is file path" + filePath);
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log("Error check: ");
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      // console.log("file read: ", err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback){
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);
    })
  }


};
