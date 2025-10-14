const mongoose = require('mongoose');


// _id is automatically added by mongoose
const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photoUrl: String,
  description: String,
});

// homeSchema.pre('findOneAndDelete', async function(next) {
//   console.log('Came to pre hook while deleting a home');
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({houseId: homeId});
//   next();
// });

module.exports = mongoose.model('Home', homeSchema);
// mongoose.model('modelName', schemaName) is used to create a model based on a schema
// Home is the model name. Mongoose automatically creates a MongoDB collection with plural lowercase form of this name. Eg: Home -> homes
// mongoose.model('Home', homeSchema) will create a collection called homes in MongoDB.
// homeSchema Defines how a “Home” document should look