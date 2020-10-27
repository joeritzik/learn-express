const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: String,
  content: String,
  vote: Number,
})

module.exports = mongoose.model('Post', schema);