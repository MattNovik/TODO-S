const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
  idItem: {
    type: String,
    //required: true,
  },
  nameItem: {
    type: String,
    //required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  date: {
    type: Number,
    //required: true,
  },
  classChange: {
    type: String,
  },
});

module.exports = mongoose.model('TodoTask', todoTaskSchema);
