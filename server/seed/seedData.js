const mongoose = require("mongoose");
const properties = require("../../data/properties.json");
const PropertyModel = require("../src/models/PropertyModel");
const _ = require("lodash");

const seedData = async () => {
  // mongoose does not support the "$oid" syntax in the JSON
  // so replace it with a mongoose ObjectId
  const propertiesWithObjectId = properties.map((property) => {
    return {
      ...property,
      _id: new mongoose.Types.ObjectId(property._id.$oid),
    };
  });

  if (!PropertyModel || !_.isEmpty(PropertyModel)) {
    await PropertyModel.collection.insertMany(propertiesWithObjectId);
  }
};

module.exports = { seedData };
