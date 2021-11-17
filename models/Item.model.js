// models/Item.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  title: String,
  description: String,
  collectionName: { type: Schema.Types.ObjectId, ref: 'Collection'}
});

module.exports = model('Item', itemSchema);