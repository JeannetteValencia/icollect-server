// routes/collection.routes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Collection = require('../models/Collection.model');
const Item = require('../models/Item.model');

//GET to get all collections

router.get('/collections', (req, res, next) => {
  Collection.find()
    //.populate('items')
    .then(allTheCollections => res.json(allTheCollections))
    .catch(err => res.json(err));
});


// POST route => to create a new collection
router.post('/collections', (req, res, next) => {
  const { title, description } = req.body;

  Collection.create({
    title,
    description,
    owner: req.user._id
  })

   .then(response => res.json(response))
    .catch(err => res.json(err));
});

// GET route => to get a specific collection
router.get('/collections/:collectionId', (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  let response = {};

  Collection.findById(collectionId)
  .then(collectionFromDB => {
    response = JSON.parse(JSON.stringify(collectionFromDB));
    return Item.find({collectionName: collectionId})
  })
  .then((itemsFromDB)=>{
    response.items = itemsFromDB
    res.json(response)
  })
  .catch(error => res.json(error));

  
});

// PUT route => to update a collection
router.put('/collections/:collectionId', (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Collection.findByIdAndUpdate(collectionId, req.body)
    .then(() => res.json({ message: `Collection with ${collectionId} has been successfully updated.` }))
    .catch(error => res.json(error));
});

// DELETE route => to delete a specific collection
router.delete('/collections/:collectionId', (req, res, next) => {
  const { collectionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Collection.findByIdAndRemove(collectionId)
    .then(() => res.json({ message: `Project with ${collectionId} was removed successfully.` }))
    .catch(error => res.json(error));
});


module.exports = router;
