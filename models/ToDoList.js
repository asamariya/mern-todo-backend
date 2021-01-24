const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateAdded: { type: Date },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
