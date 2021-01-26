const ToDoList = require('../models/ToDoList');

const addTask = async (req, res) => {
  try {
    const { title, listId } = req.body;
    const isDone = false;
    const list = await ToDoList.findById(listId);
    list.tasks.push({ title, isDone });
    await list.save();

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params.tid;
    const listId = req.params.id;
    const list = await ToDoList.findById(listId);

    const index = list.tasks.map((task) => task._id).indexOf(taskId);
    list.tasks.splice(index, 1);
    await list.save();

    res.json({ msg: `Deleted task` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  let list;
  const { title, isDone } = req.body;
  const updatedInfo = { title, isDone };
  const listId = req.params.id;
  const taskId = req.params.tid;

  try {
    list = await ToDoList.findById(listId);
  } catch (err) {
    res.json({ msg: err.message });
  }

  const index = list.tasks.map((task) => task._id).indexOf(taskId);
  list.tasks.set(index, updatedInfo);

  try {
    await list.save();
  } catch (err) {
    res.json({ msg: err.message });
  }

  res.status(200).json(list.tasks[index]);
};

const markAsDone = async (req, res) => {
  let list;
  const listId = req.params.id;
  const taskId = req.params.tid;

  try {
    list = await ToDoList.findById(listId);
  } catch (err) {
    res.json({ msg: err.message });
  }

  const index = list.tasks.map((task) => task._id).indexOf(taskId);
  const { title } = list.tasks[index];
  const isDone = true;
  list.tasks.set(index, { title, isDone });

  try {
    await list.save();
  } catch (err) {
    res.json({ msg: err.message });
  }

  res.status(200).json(list.tasks[index]);
};

const removeDoneTasks = async (req, res) => {
  const listId = req.params.id;
  let updatedList;

  try {
    updatedList = await ToDoList.findOneAndUpdate(
      { _id: listId },
      { $pull: { tasks: { isDone: true } } },
      { multi: true }
    );
  } catch (err) {
    res.json({ msg: err.message });
  }

  try {
    await updatedList.save();
  } catch (err) {
    res.json({ msg: err.message });
  }
  const newList = await ToDoList.findById(listId);
  res.json({ newList: newList });
};

exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
exports.addTask = addTask;
exports.markAsDone = markAsDone;
exports.removeDoneTasks = removeDoneTasks;
