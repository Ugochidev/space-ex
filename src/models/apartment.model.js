const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema for an apartment
const apartmentSchema = new Schema({
  apartmentName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// converting the schema to a model
const Apartment = mongoose.model("Apartment", apartmentSchema);

// to make the mmodel accessible to other files
module.exports = Apartment;
