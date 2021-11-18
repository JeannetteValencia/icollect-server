// routes/items.routes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item= require('../models/Item.model');
const Collection = require('../models/Collection.model');

//GET to get all the items of the collections
router.get('/items', (req, res, next) => {
  Item.find()
    .then(allTheItems=> res.json(allTheItems))
    .catch(err => res.json(err));
});

//to display the items of an specific collection
router.get('/collections/:collectionId/items', (req, res, next) => {
  const {collectionId} = req.params;
  console.log("PARAMS>", req.params)
  Collection.findById(collectionId)
  .then((collectionfromDB) => {
    console.log("collectionDETAILS ID", collectionfromDB)
    return Item.find({collectionName: collectionfromDB})
  })
  .then((itemsfromDB)=>{
    console.log("ITEMS FROM DB>>>>", itemsfromDB)
    res.json(itemsfromDB)
  })
    .catch(error => res.json(error));
});

//POST route => to create a new item
router.post('/items', (req, res, next) => {
  const { title, description,  collectionID} = req.body;

  Item.create({
    title,
    description,
    collectionName: collectionID
  })
    
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// GET route => to retrieve a specific ITEM from the collection
router.get('/items/:itemId', (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .then(item => res.json(item))
    .catch(error => res.json(error));
});

// PUT route => to update a specific item
router.put('/items/:itemId', (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Item.findByIdAndUpdate(itemId, req.body)
    .then(() => res.json({ message: `Item with ${itemId} has been successfully updated!` }))
    .catch(err => res.json(err));
});

// DELETE route => to delete a specific item from the collection
router.delete('/items/:itemId', (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Item.findByIdAndRemove(itemId, req.body)
    .then(() => res.json({ message: `${itemId} item has been successfully removed from the collection!` }))
    .catch(err => res.json(err));
});

module.exports = router;
