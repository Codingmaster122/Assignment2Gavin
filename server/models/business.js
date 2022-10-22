let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let businessModel = mongoose.Schema(
  {
    phone: String,
    name: String,
    email: String
  },

  {
    collection: "business",
  }
);

//businesssmodel to create new business more powerful than just class
module.exports = mongoose.model("business", businessModel);
