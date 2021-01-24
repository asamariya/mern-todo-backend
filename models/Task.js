const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  dateAdded: { type: Date },
  toDoList: {
    type: Schema.Types.ObjectId,
    ref: 'ToDoList',
  },
  isDone: { type: Boolean, require: true },
});

module.exports = mongoose.model('Task', taskSchema);
