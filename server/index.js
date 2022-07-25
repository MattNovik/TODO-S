import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';
import TodoTask from '../models/todoItem.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
let routerExp = express.Router();
console.log(process.env.DB_CONNECT);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  const todoTask = new TodoTask({
    idItem: req.body.data.idItem,
    nameItem: req.body.data.nameItem,
    description: req.body.data.description,
    date: req.body.data.date,
    classChange: req.body.data.classChange,
  });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

//UPDATE
/* app
  .route('/edit/:id')
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
      res.render('todoEdit.ejs', { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
      if (err) return res.send(500, err);
      res.redirect('/');
    });
  }); */

//DELETE
app
  .route('/delete/:id')
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, (err) => {
      if (err) return res.send(500, err);
      res.redirect('/');
    });
  })
  .post((req, res) => {
    console.log('q');
    const todoTask = new TodoTask({
      idItem: req.body.data.idItem,
      nameItem: req.body.data.nameItem,
      description: req.body.data.description,
      date: req.body.data.date,
      classChange: req.body.data.classChange,
    });
  });
