// models/Collection.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const collectionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },

  description: {
    type: String,
    required: [true, "Description is required."],
  },

  imageURL: {
    type: String,
    required: [true, "An image is required."],
  },

  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Collection', collectionSchema);