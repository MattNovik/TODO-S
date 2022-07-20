import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';
import * as TodoTask from '../models/todoItem.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
console.log(process.env.DB_CONNECT);

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to db!');
  app.listen(3000, () => console.log('Server Up and running'));
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

/* app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); */

//POST METHOD
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content,
  });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});
