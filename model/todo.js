const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  judul: {
    type: String,
    min: 3,
    max: 512,
    required: true
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Todo', TodoSchema);