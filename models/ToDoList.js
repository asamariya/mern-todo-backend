const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const toDoListSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateAdded: { type: Date, required: true },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  tasks: [
    {
      type: String,
      isDone: Boolean,
    },
  ],
});

module.exports = mongoose.model('ToDoList', toDoListSchema);
