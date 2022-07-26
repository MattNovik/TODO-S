var TodoTask = require('./models/todoItem.cjs');

const TodoTaskAPI = {
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
        index: request.body.data.index,
        nameItem: request.body.data.nameItem,
        description: request.body.data.description,
        date: request.body.data.date,
        classChange: request.body.data.classChange,
        typeTask: request.body.data.typeTask,
      },
      function (err, data) {
        if (err) {
          throw err;
        } else {
          response.status(200).json(data);
        }
      }
    );
  },
  postTask: async (request, response) => {
    const todoTask = new TodoTask({
      _id: request.body.data._id,
      index: request.body.data.index,
      idItem: request.body.data.idItem,
      nameItem: request.body.data.nameItem,
      description: request.body.data.description,
      date: request.body.data.date,
      classChange: request.body.data.classChange,
      userEmail: request.body.data.userEmail,
      typeTask: request.body.data.typeTask,
    });
    try {
      await todoTask.save();
      response.redirect('/');
    } catch (err) {
      console.log(err);
      response.redirect('/');
    }
  },
  getListOfTasks: (request, response) => {
    TodoTask.find({}, (err, tasks) => {
      response.json(tasks);
    });
  },
  postStatus: (request, userEmail) => {
    try {
      userEmail = request.body.userData.email;
      return userEmail;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = TodoTaskAPI;
