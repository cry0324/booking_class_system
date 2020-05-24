var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  fullname: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: '../public/img/avater.jpg'
  },
  telephone_number: {
    type: String,
    default: ''
  },
  date_of_birth: {
    type: Date
  },
  status: {
    type: Number,
    // 0 student
    // 1 teacher
    // 2 staff
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
