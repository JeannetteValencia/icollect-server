// models/Collection.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const collectionSchema = new Schema({
  title: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Collection', collectionSchema);