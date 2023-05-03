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
const createContact = async (req, res) => {
  const contact = {
    Author: req.body.Author,
    Album: req.body.Album,
    songTitle: req.body.songTitle,
    Lyrics: req.body.Lyrics,
    Image: req.body.Image,
    productionYear: req.body.productionYear,
    Procucer: req.body.Procucer
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection('lyrics')
    .insertOne(contact)
  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the lyric.')
  }
}
module.exports = {
  getAll,
  getSingle,
  createContact
}
