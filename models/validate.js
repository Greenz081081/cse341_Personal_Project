module.exports = (mongoose) => {
  const lyricSchema = mongoose.Schema({
    Author: {
      type: String
    },
    Album: {
      type: String
    },
    songTitle: {
      type: String
    },
    Lyrics: {
      type: String
    },
    Image: {
      type: String
    },
    productionYear: {
      type: String
    },
    Producer: {
      type: String
    }

  })

  return mongoose.model('validate', lyricSchema)
}
