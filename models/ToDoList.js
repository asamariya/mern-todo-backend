const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const toDoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  // tasks: { type: Array, default: [] },
  tasks: [
    {
      title: { type: String, required: true },
      isDone: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model('ToDoList', toDoListSchema);
