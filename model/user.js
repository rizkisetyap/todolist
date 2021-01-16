const mongoose = require('mongoose');
const user_schema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  todo_list: [{type: mongoose.Schema.ObjectId, ref: 'Todo'}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', user_schema);