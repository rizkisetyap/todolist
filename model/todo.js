const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 512,
    required: true
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  due_date: {
    type: Date,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Todo', TodoSchema);