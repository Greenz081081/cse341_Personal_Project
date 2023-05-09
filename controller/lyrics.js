const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('lyrics')
    .find()
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists)
  })
}

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id)
  const result = await mongodb
    .getDb()
    .db()
    .collection('lyrics')
    .find({ _id: userId })
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists[0])
  })
}
const createLyrics = async (req, res) => {
  try {
    if (!req.body.Author || !req.body.Album || !req.body.songTitle || !req.body.Lyrics || !req.body.Image || !req.body.productionYear || !req.body.Producer) {
      res.status(400).send({ message: 'Content can not be empty!' })
      return
    }
    const lyrics = {
      Author: req.body.Author,
      Album: req.body.Album,
      songTitle: req.body.songTitle,
      Lyrics: req.body.Lyrics,
      Image: req.body.Image,
      productionYear: req.body.productionYear,
      Producer: req.body.Producer
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection('lyrics')
      .insertOne(lyrics)
    if (response.acknowledged) {
      res.status(201).json(response)
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the lyrics.')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
const updateLyrics = async (req, res) => {
  try {
    if (!req.body.Author || !req.body.Album || !req.body.songTitle || !req.body.Lyrics || !req.body.Image || !req.body.productionYear || !req.body.Producer) {
      res.status(400).send({ message: 'Content can not be empty!' })
      return
    }
    const userId = new ObjectId(req.params.id)
    // be aware of updateOne if you only want to update specific fields
    const lyrics = {
      Author: req.body.Author,
      Album: req.body.Album,
      songTitle: req.body.songTitle,
      Lyrics: req.body.Lyrics,
      Image: req.body.Image,
      productionYear: req.body.productionYear,
      Producer: req.body.Producer
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection('lyrics')
      .replaceOne({ _id: userId }, lyrics)
    console.log(response)
    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the lyrics.')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
const deleteLyrics = async (req, res) => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDb()
    .db()
    .collection('lyrics')
    .deleteOne({ _id: userId }, true)
  console.log(response)
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the lyrics.')
  }
}

module.exports = {
  getAll,
  getSingle,
  createLyrics,
  updateLyrics,
  deleteLyrics
}
