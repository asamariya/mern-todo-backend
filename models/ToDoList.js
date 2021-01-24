const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  dateAdded: { type: Date },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('ToDoList', toDoListSchema);
