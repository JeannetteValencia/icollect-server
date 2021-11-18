// models/Item.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const itemSchema = new Schema({
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
  
  collectionName: { type: Schema.Types.ObjectId, ref: 'Collection'}
});

module.exports = model('Item', itemSchema);