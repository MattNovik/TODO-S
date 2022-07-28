import mongoose from 'mongoose';
import TodoTask from '../models/todoItem.js';

var TodoTaskAPI = {
  delete: (request, response) => {
    TodoTask.findByIdAndRemove(request.params.id, function (error, result) {
      if (error) {
        throw error;
      } else {
        response.status(200).json(result);
      }
    });
  },
  update: (request, response) => {
    TodoTask.findByIdAndUpdate(
      request.params.id,
      {
        nameItem: request.body.data.nameItem,
        description: request.body.data.description,
        date: request.body.data.date,
        classChange: request.body.data.classChange,
      },
      function (err, data) {
        if (err) {
          throw err;
        } else {
        }
      }
    );
  },
  postTask: async (req, res) => {
    const todoTask = new TodoTask({
      _id: req.body.data._id,
      idItem: req.body.data.idItem,
      nameItem: req.body.data.nameItem,
      description: req.body.data.description,
      date: req.body.data.date,
      classChange: req.body.data.classChange,
      userEmail: req.body.data.userEmail,
    });
    try {
      await todoTask.save();
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  },
  getListOfTasks: (req, res) => {
    TodoTask.find({}, (err, tasks) => {
      res.json(tasks);
    });
  },
};
export default TodoTaskAPI;
