const User = require('../models/User');
const ToDoList = require('../models/ToDoList');

const addList = async (req, res) => {
  try {
    let users = [];
    const user = await User.findById(req.user);
    user && users.push(user);
    console.log('users before: ' + users);

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
    console.log('users after: ' + user.toDoLists);
    res.json(savedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
