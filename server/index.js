import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';
import TodoTask from '../models/todoItem.js';
import TodoTaskAPI from './product.api.js';
import cors from 'cors';

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

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123',
  });
});

// GET METHOD
app.get('/api', (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.json(tasks);
  });
});

//POST METHOD
app.post('/', TodoTaskAPI.postTask);

app.delete('/:id', TodoTaskAPI.delete);
app.patch('/:id', TodoTaskAPI.update);
