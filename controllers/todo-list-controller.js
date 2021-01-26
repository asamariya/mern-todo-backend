const User = require('../models/User');
const ToDoList = require('../models/ToDoList');

const addList = async (req, res) => {
  try {
    let users = [];
    const user = await User.findById(req.user);
    user && users.push(user);

    const { name } = req.body;
    const dateAdded = Date.now();

    // validation
    if (!name) {
      return res.status(400).json({ msg: 'No name entered.' });
    }

    const existingList = await ToDoList.findOne({ name: name });
    if (existingList) {
      return res
        .status(400)
        .json({ msg: 'A list with the same name already exists.' });
    }

    const newList = new ToDoList({
      users,
      name,
      dateAdded,
    });

    const savedList = await newList.save();
    user && user.toDoLists.push(savedList);
    await user.save();
    // console.log('users after: ' + user.toDoLists);
    res.json(savedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllLists = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const userLists = user.toDoLists;
    res.status(200).json(userLists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getList = async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await ToDoList.findById(listId);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedList = await ToDoList.findByIdAndDelete(id);
    res.status(200).json(deletedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const { taskId } = req.body;
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
  const { taskId, title, isDone } = req.body;
  const updatedInfo = { title, isDone };
  const listId = req.params.id;
  let oldTitle = req.body.oldTitle;

  list = await ToDoList.findById(listId);

  const index = list.tasks.map((task) => task._id).indexOf(taskId);
  list.tasks.set(index, updatedInfo);

  try {
    await list.save();
  } catch (err) {
    res.json({ msg: err.message });
  }

  res.status(200).json(list);
};

const deleteAll = async (req, res) => {
  try {
    await ToDoList.deleteMany({});
    res.json({ msg: 'All deleted' });
  } catch (err) {
    console.log(err.message);
  }
};

exports.addList = addList;
exports.deleteAll = deleteAll;
exports.getAllLists = getAllLists;
exports.addTask = addTask;
exports.getList = getList;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
exports.deleteList = deleteList;
