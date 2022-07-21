import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';
//models
import TodoTask from '../models/todoItem.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
console.log(process.env.DB_CONNECT);

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to db!');
  app.listen(PORT, () => console.log('Server Up and running'));
});

/* app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
}); */

// GET METHOD
app.get('/api', (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.json({ tasks });
  });
});

//POST METHOD
app.post('/', async (req, res) => {
  console.log(req.body);
  const todoTask = new TodoTask({
    idItem: req.body.idItem,
    nameItem: req.body.name,
    description: req.body.description,
    date: req.body.date,
    classChange: req.body.classChange,
  });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});
