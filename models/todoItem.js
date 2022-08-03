const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
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
  userEmail: {
    type: String,
  },
  typeTask: {
    type: String,
  },
});

module.exports = mongoose.model('TodoTask', todoTaskSchema);
