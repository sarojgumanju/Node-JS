const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteFilePath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourite {
  static addToFavourties(homeId, callback){
    Favourite.getFavourites((favourites) => {
        if(favourites.includes(homeId)){
            callback("home is already marked favourite");
        } else{
            favourites.push(homeId); 
            fs.writeFile(favouriteFilePath, JSON.stringify(favourites), callback);
            console.log("home added to favourites: ", favourites)
        }
    })
  }

  static getFavourites(callback){
        fs.readFile(favouriteFilePath, (err, data) => {
            callback(!err ? JSON.parse(data) : [])
        });
  }

};
