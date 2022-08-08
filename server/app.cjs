var express = require('express');
//import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
var mongoose = require('mongoose');
var TodoTaskAPI = require('./product.api.cjs');
var cors = require('cors');

//dotenv.config();

const PORT = /* process.env.PORT || */ 3001;
const app = express();
let routerExp = express.Router();
console.log(
  'mongodb+srv://lockdur:eIrTDAUBzWOJAY4o@cluster0.zprdb.mongodb.net/?retryWrites=true&w=majority'
);

let userEmail;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
/* app.use('/login', (req, res) => {
  res.send({
    token: 'test123',
  });
}); */

//connection to db
mongoose.connect(
  'mongodb+srv://lockdur:eIrTDAUBzWOJAY4o@cluster0.zprdb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  () => {
    console.log('Connected to db!');
    app.listen(PORT, () => console.log('Server Up and running'));
  }
);

// GET METHOD
app.get('/api', TodoTaskAPI.getListOfTasks);

//POST METHODS
app.post('/', TodoTaskAPI.postTask);
app.post('/status', (req, res) => {
  try {
    userEmail = req.body.userData.email;
  } catch (err) {
    console.log(err);
  }
});

// DELETE METHOD
app.delete('/:id', TodoTaskAPI.delete);

//UPDATE METHOD
app.patch('/:id', TodoTaskAPI.update);
