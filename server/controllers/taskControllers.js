const Task = require("../model/taskModel");

// Controller for creating a new task

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const userID = req.body.userId;

    const userTasks = await Task.find({ userId: userID });
    console.log(userTasks);

    res.status(200).json(userTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const userID = req.body.userId;

  const taskdata = await Task.findOne({ _id: id });
  const userdataId = taskdata.userId;

  if (userdataId === userID) {
    try {
      await Task.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json(`${id} is updated`);
    } catch (error) {
      res.status(404).json("Task not found");
    }
  } else {
    res.status(403).json("Permission denied");
  }
};

// Controller for deleting a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userID = req.body.userId;

  const taskdata = await Task.findOne({ _id: id });
  const userdataId = taskdata.userId;

  if (userdataId === userID) {
    try {
      await Task.findByIdAndDelete({ _id: id });
      res.status(200).json(`${id} is deleted`);
    } catch (error) {
      res.status(404).json("Task not found");
    }
  } else {
    res.status(403).json("Permission denied");
  }
};
