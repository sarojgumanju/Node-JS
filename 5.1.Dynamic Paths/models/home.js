const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

// fake database
let registeredHomes = [];

const filePath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, description, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    
    Home.fetchAll((registeredHomes) => {
      if (this.id) { // edit home case
        registeredHomes = registeredHomes.map(home => {
          // if(home.id === this.id){
          //   return this;
          // }
          // return home;
          return home.id === this.id ? this : home;
        })
      } else { // add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      
      // console.log("this is file path" + filePath);
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log("Error check: ", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      // console.log("file read: ", err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }
};
