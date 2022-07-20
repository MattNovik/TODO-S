const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: 10,
  },
});
exports = mongoose.model('TodoTask', todoTaskSchema);
