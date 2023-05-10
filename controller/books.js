const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
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
    .collection('books')
    .find({ _id: userId })
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists[0])
  })
}
const createBooks = async (req, res) => {
  try {
    if (!req.body.Author || !req.body.Language || !req.body.bookTitle || !req.body.Country || !req.body.Image || !req.body.publicationYear || !req.body.Pages) {
      res.status(400).send({ message: 'Content can not be empty!' })
      return
    }
    const books = {
      Author: req.body.Author,
      Language: req.body.Language,
      bookTitle: req.body.bookTitle,
      Country: req.body.Country,
      Image: req.body.Image,
      publicationYear: req.body.publicationYear,
      Pages: req.body.Pages
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .insertOne(books)
    if (response.acknowledged) {
      res.status(201).json(response)
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the books.')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
const updateBooks = async (req, res) => {
  try {
    if (!req.body.Author || !req.body.Language || !req.body.bookTitle || !req.body.Country || !req.body.Image || !req.body.publicationYear || !req.body.Pages) {
      res.status(400).send({ message: 'Content can not be empty!' })
      return
    }
    const userId = new ObjectId(req.params.id)
    // be aware of updateOne if you only want to update specific fields
    const books = {
      Author: req.body.Author,
      Language: req.body.Language,
      bookTitle: req.body.bookTitle,
      Country: req.body.Country,
      Image: req.body.Image,
      publicationYear: req.body.publicationYear,
      Pages: req.body.Pages
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .replaceOne({ _id: userId }, books)
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
const deleteBooks = async (req, res) => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDb()
    .db()
    .collection('books')
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
  createBooks,
  updateBooks,
  deleteBooks
}
