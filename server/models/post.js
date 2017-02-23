const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PostSchema = new Schema({
  name: {
    type: String,
    minlength: [2, '标题至少2个字符'],
    maxlength: [25, '标题太长了, 超过25个字符了']
  },
  content: {
    type: String,
    minlength: [10, '多写点东西嘛']
  },
  cover: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', PostSchema);