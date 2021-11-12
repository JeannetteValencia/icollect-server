// models/Collection.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const collectionSchema = new Schema({
  title: String,
  description: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' } // <== !!!
});

module.exports = model('Collection', collectionSchema);