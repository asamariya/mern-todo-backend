const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  dateAdded: { type: Date },
  toDoList: {
    type: Schema.Types.ObjectId,
    ref: 'ToDoList',
    required: true,
  },
  isDone: { type: Boolean, require: true },
});

module.exports = mongoose.model('Task', taskSchema);
